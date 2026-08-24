---
trigger: always_on
---
# High-Efficiency Vibe Coding & Context Budget Rules

### 1. Unified Diff / Patch Mode (No Full-File Rewrites)
- NEVER rewrite an entire file if fewer than 30 lines are changing.
- Output ONLY targeted, minimal diff patches or specific block replacements.
- Avoid repeating boilerplate, unchanged imports, or unmodified styles.

### 2. Output & Error Summarization (Terminal Boundary)
- DO NOT read full terminal logs or entire `npm run build` / `vite` outputs.
- Read ONLY the final stack trace or the specific error line (max 10-15 lines).
- When running tests, pass flags to isolate single failing test files rather than running full suites (e.g., `vitest run path/to/spec.ts`).

### 3. Incremental Edit Budget (One Task per Turn)
- Focus exclusively on the single requested feature or bug fix per interaction turn.
- Refrain from proactively "cleaning up," refactoring adjacent components, or adding unrequested helper utilities unless explicitly instructed.

### 4. Compact Response Style
- Omit conversational fluff, greetings, and lengthy architectural summaries when executing edits.
- State: (1) what file was changed, (2) the root cause, and (3) the patch lines.

### 5. Multi-Tool Call Grouping
- Execute related tool calls (e.g., reading a node, checking a diff, writing a patch) in a single parallel batch rather than taking separate turns for each tool.