#!/usr/bin/env node
/**
 * Temporary diagnostic (safe to delete).
 *
 * A missing named export makes the whole module graph fail at evaluation time
 * (Vite: "does not provide an export named 'X'"), which blanks the app. This
 * scans every file under src/ and reports named imports whose target module
 * does not actually export that name.
 *
 * Usage:  node scripts/_check_exports.mjs
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';

const SRC = resolve(process.cwd(), 'src');

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(js|mjs|vue)$/.test(entry)) out.push(p);
  }
  return out;
}

function exportsOf(file) {
  const src = readFileSync(file, 'utf8');
  const names = new Set(['default']);
  for (const m of src.matchAll(/^\s*export\s+(?:async\s+)?(?:const|let|var|function|class)\s+([A-Za-z_$][\w$]*)/gm)) names.add(m[1]);
  // Any `export { ... }` block (with or without `from`) declares those names.
  for (const m of src.matchAll(/export\s*\{([^}]*)\}/g)) {
    for (const part of m[1].split(',')) {
      const t = part.trim();
      if (!t) continue;
      const alias = t.split(/\s+as\s+/);
      names.add((alias[1] || alias[0]).trim());
    }
  }
  if (/^\s*export\s+\*\s+from/m.test(src)) names.add('*');
  return names;
}

function resolveFile(spec, fromFile) {
  let base;
  if (spec.startsWith('@/')) base = join(SRC, spec.slice(2));
  else if (spec.startsWith('.')) base = resolve(dirname(fromFile), spec);
  else return null; // bare package specifier
  for (const c of [base, base + '.js', base + '.mjs', base + '.vue', join(base, 'index.js'), join(base, 'index.mjs')]) {
    if (existsSync(c) && statSync(c).isFile()) return c;
  }
  return 'UNRESOLVED';
}

/** Drop comments so commented-out imports are not reported. */
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:'"\\])\/\/[^\n]*/g, '$1');
}

const files = walk(SRC);
const missing = [];
const unresolved = new Set();

for (const file of files) {
  const raw = stripComments(readFileSync(file, 'utf8'));
  const rel = file.replace(SRC, 'src');
  // Named imports: verify every name is actually exported by the target module.
  for (const m of raw.matchAll(/import\s+(?:[\w$]+\s*,?\s*)?\{([^}]*)\}\s*from\s*['"]([^'"]+)['"]/g)) {
    const spec = m[2];
    const target = resolveFile(spec, file);
    if (target === null) continue;
    if (target === 'UNRESOLVED') { unresolved.add(`${rel} -> ${spec}`); continue; }
    const exported = exportsOf(target);
    if (exported.has('*')) continue;
    for (const part of m[1].split(',')) {
      const t = part.trim();
      if (!t) continue;
      const name = t.split(/\s+as\s+/)[0].trim();
      if (name && !exported.has(name)) {
        missing.push(`${rel}\n      imports '${name}' from '${spec}' — not exported by ${target.replace(SRC, 'src')}`);
      }
    }
  }
  // Default / namespace / side-effect imports: the module only has to exist.
  for (const m of raw.matchAll(/import\s+(?:[\w$*\s{},]*?\sfrom\s*)?['"]([^'"]+)['"]/g)) {
    const spec = m[1];
    if (!spec.startsWith('.') && !spec.startsWith('@/')) continue;
    if (resolveFile(spec, file) === 'UNRESOLVED') unresolved.add(`${rel} -> ${spec}`);
  }
}

console.log(`scanned ${files.length} files under src/`);
if (missing.length) {
  console.log(`\nMISSING NAMED EXPORTS (${missing.length}):`);
  for (const p of missing) console.log('  • ' + p);
} else {
  console.log('\n✔ no missing named exports');
}
if (unresolved.size) {
  console.log(`\nUNRESOLVED MODULE IMPORTS (${unresolved.size}):`);
  for (const p of [...unresolved].slice(0, 40)) console.log('  • ' + p);
} else {
  console.log('✔ every relative/aliased import resolves');
}
