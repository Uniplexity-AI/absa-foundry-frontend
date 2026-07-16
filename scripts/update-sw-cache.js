import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate cache version based on timestamp
const cacheVersion = `v${Date.now()}`;

console.log(`🔄 Updating Service Worker cache version to: ${cacheVersion}`);

// Path to Service Worker file
const swPath = path.join(__dirname, '..', 'src', 'sw.js');

// Read the Service Worker file
let swContent = fs.readFileSync(swPath, 'utf8');

// Replace cache names with versioned names
swContent = swContent
    .replace(/cacheName: 'api-cache'/g, `cacheName: 'api-cache-${cacheVersion}'`)
    .replace(/cacheName: 'static-assets-v2'/g, `cacheName: 'static-assets-${cacheVersion}'`)
    .replace(/cacheName: 'fonts-v2'/g, `cacheName: 'fonts-${cacheVersion}'`)
    .replace(/cacheName: 'images-v2'/g, `cacheName: 'images-${cacheVersion}'`)
    .replace(
        /const currentCaches = \['static-assets-v2', 'fonts-v2', 'images-v2', 'api-cache'\];/g,
        `const currentCaches = ['static-assets-${cacheVersion}', 'fonts-${cacheVersion}', 'images-${cacheVersion}', 'api-cache-${cacheVersion}'];`
    );

// Write the updated content back
fs.writeFileSync(swPath, swContent, 'utf8');

console.log(`✅ Service Worker cache updated successfully`);
console.log(`📦 Cache version: ${cacheVersion}`);
