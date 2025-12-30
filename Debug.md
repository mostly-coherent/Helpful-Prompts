# Debug — Comprehensive Project Audit

> **Automated debugging audit for bugs, performance, and accessibility issues**

---

## Prompt

```
Perform a comprehensive debug audit of this project.

## Scope

Analyze the codebase to identify:

### 1. Bugs & Issues (Critical Priority)
- Runtime errors and unhandled exceptions
- Logic errors and incorrect conditional flows
- Null/undefined reference risks
- Race conditions and async issues
- Memory leaks
- Broken imports or missing dependencies
- Type mismatches (TypeScript projects)
- API contract violations

### 2. Optimization Opportunities (High Priority)
- Performance bottlenecks (N+1 queries, unnecessary re-renders)
- Inefficient algorithms or data structures
- Redundant code or dead code paths
- Missing memoization where beneficial
- Unoptimized database queries
- Bundle size bloat (unused imports, large dependencies)
- Missing lazy loading for heavy components

### 3. Accessibility Issues (High Priority)
- Poor color contrast (WCAG AA minimum 4.5:1 for text, 3:1 for UI)
- Missing alt text on images
- Missing ARIA labels on interactive elements
- Keyboard navigation gaps
- Focus indicator issues
- Missing semantic HTML (using div instead of button, etc.)
- Form inputs without labels
- Missing skip links for screen readers

## Output Format

For each issue found, provide:

| Field | Description |
|-------|-------------|
| **File** | Path to affected file |
| **Line(s)** | Line number(s) |
| **Category** | Bug / Optimization / Accessibility |
| **Severity** | Critical / High / Medium / Low |
| **Issue** | Clear description of the problem |
| **Confidence** | High / Medium / Low (confidence in the fix) |
| **Fix** | Proposed solution |

## Action Rules

### ✅ AUTO-FIX (Confidence: High)
Apply fixes immediately when:
- The fix is straightforward and well-understood
- No risk of breaking existing functionality
- The issue is clearly a bug (not a design decision)
- Examples: typos, missing null checks, obvious type errors, missing alt text

### ⚠️ REPORT ONLY (Confidence: Medium/Low)
Do NOT auto-fix when:
- The change could affect business logic
- Multiple valid solutions exist
- Requires understanding of user intent
- Could break dependent code elsewhere
- Involves architectural decisions

## Deliverables

1. **Summary Table** — All issues found, grouped by category
2. **Auto-Fixed** — List of changes already applied (with file paths)
3. **Pending Review** — Issues requiring human decision
4. **Recommendations** — Suggested improvements beyond scope
5. **Unused Files Deleted** — List of unused files removed (excluding documentation)

## Execution Order

1. Read all source files (src/, app/, components/, lib/, pages/)
2. Check configuration files (package.json, tsconfig, eslint, tailwind)
3. Analyze styles for accessibility (CSS, Tailwind classes)
4. Review API routes and data fetching
5. Check test coverage gaps (if tests exist)
6. Generate report and apply high-confidence fixes
7. **Identify and delete unused files** (exclude documentation - handled by cleanup-folder.md)
```

---

## Quick Usage

### Full Project Audit
```
Run full debug audit on this project
```

### Targeted Audit
```
Focus on accessibility issues only
```

```
Focus on performance optimizations only
```

```
Audit only the /src/components folder
```

---

## Accessibility Checklist (WCAG 2.1 AA)

| Check | Requirement |
|-------|-------------|
| **Color Contrast** | Text: 4.5:1 minimum; Large text: 3:1; UI components: 3:1 |
| **Focus Visible** | All interactive elements must show focus state |
| **Keyboard Access** | All functionality available via keyboard |
| **Alt Text** | All informative images have descriptive alt text |
| **Form Labels** | Every input has associated label |
| **Error Messages** | Form errors are announced to screen readers |
| **Heading Hierarchy** | Logical h1→h2→h3 structure |
| **Link Purpose** | Link text describes destination (no "click here") |

---

## Common Bug Patterns

| Pattern | Example |
|---------|---------|
| **Unhandled Promise** | `fetch()` without `.catch()` |
| **Optional Chaining Missing** | `user.profile.name` → `user?.profile?.name` |
| **State Mutation** | `array.push()` in React state |
| **useEffect Deps** | Missing dependencies in array |
| **Key Prop Missing** | Lists without unique `key` |
| **Event Handler Binding** | Arrow function in render causing re-renders |

---

## Performance Red Flags

| Issue | Detection |
|-------|-----------|
| **N+1 Queries** | Database call inside a loop |
| **Large Bundle** | Importing entire library (`import _ from 'lodash'`) |
| **Missing Memoization** | Expensive computation in render without useMemo |
| **Unnecessary Re-renders** | Object/array literals in props |
| **Blocking Operations** | Sync operations on main thread |

---

## Confidence Calibration

### High Confidence (Auto-Fix)
- Syntax errors
- Missing null checks on obviously nullable values
- Unused imports/variables
- Missing TypeScript types for simple cases
- Missing alt="" on decorative images
- Obvious typos in user-facing strings

### Medium Confidence (Report + Suggest)
- Performance optimizations that change behavior
- Refactoring suggestions
- Accessibility improvements requiring design input
- Error handling strategies

### Low Confidence (Report Only)
- Architectural changes
- Business logic modifications
- Changes requiring external context
- Trade-offs between competing concerns

---

## Unused Files Cleanup

### Scope

After fixing bugs and applying optimizations, identify and delete unused files **excluding documentation** (documentation cleanup is handled by `cleanup-folder.md`).

### Files to Identify for Deletion

| Category | Examples | Action |
|----------|----------|--------|
| **Unused Code Files** | Unused components, utilities, deprecated modules | Delete if not imported anywhere |
| **Backup Files** | `*.backup`, `*.bak`, `*_backup.*`, `*.old` | Delete if content preserved in git history |
| **Temporary Files** | `temp_*`, `tmp_*`, `*.tmp`, test output files | Delete |
| **Build Artifacts** | `*.log`, `*.cache`, build output files (if not in .gitignore) | Delete |
| **Duplicate Files** | Files with `_copy`, `_old`, `_v1`, `_v2` suffixes | Delete if superseded |
| **Unused Config** | Unused config files, empty directories | Delete if not referenced |
| **Legacy Code** | Deprecated modules marked for removal | Delete if migration complete |

### Files to Exclude from Deletion

| Category | Examples | Reason |
|----------|----------|--------|
| **Documentation** | All `.md` files | Handled by cleanup-folder.md agent |
| **Git Files** | `.git/`, `.gitignore`, `.gitattributes` | Required for version control |
| **Config Files** | `package.json`, `tsconfig.json`, `.env.example` | Required for project setup |
| **Test Files** | `*.spec.ts`, `*.test.ts`, `e2e/` | Required for testing |
| **Build Config** | `next.config.ts`, `tailwind.config.ts`, `playwright.config.ts` | Required for builds |
| **Dependencies** | `node_modules/`, `package-lock.json` | Required for dependencies |

### Verification Before Deletion

Before deleting any file:

1. **Check imports/references**: Search codebase for imports or references to the file
2. **Check git history**: Verify file content is preserved in git if it's a backup
3. **Check documentation**: Ensure file isn't referenced in docs or comments
4. **Check build/test**: Verify deletion won't break builds or tests
5. **High confidence only**: Only delete files with high confidence they're unused

### Execution Steps

1. **Scan for unused files**:
   - Search for backup patterns (`*.backup`, `*_backup.*`, etc.)
   - Search for temporary patterns (`temp_*`, `tmp_*`, `*.tmp`)
   - Search for duplicate patterns (`*_copy.*`, `*_old.*`, `*_v1.*`)
   - Check for unused imports/exports in codebase

2. **Verify each file**:
   - Search codebase for references
   - Check git history for content preservation
   - Verify not referenced in documentation

3. **Delete with logging**:
   - Log each deleted file with reason
   - Include in "Unused Files Deleted" section of report
   - Only delete files with high confidence

4. **Report summary**:
   - List all deleted files
   - Include reason for each deletion
   - Note any files that were reviewed but kept

---

## Example Output

### Summary

| # | File | Category | Severity | Issue | Status |
|---|------|----------|----------|-------|--------|
| 1 | `src/components/Button.tsx` | Accessibility | High | Button missing aria-label | ✅ Fixed |
| 2 | `src/lib/api.ts` | Bug | Critical | Unhandled fetch rejection | ✅ Fixed |
| 3 | `src/pages/index.tsx` | Optimization | Medium | Large component not memoized | ⚠️ Review |
| 4 | `src/styles/globals.css` | Accessibility | High | Text contrast ratio 2.1:1 (below 4.5:1) | ⚠️ Review |

### Auto-Fixed Changes

```
✅ src/components/Button.tsx:15 — Added aria-label="Submit form"
✅ src/lib/api.ts:23 — Added .catch() handler for fetch
✅ src/components/Card.tsx:8 — Added missing key prop to list items
```

### Pending Human Review

```
⚠️ src/pages/index.tsx:45
   Issue: HeroSection component re-renders on every parent render
   Suggestion: Wrap with React.memo()
   Reason for review: May affect intentional re-render behavior

⚠️ src/styles/globals.css:12
   Issue: .text-gray-400 on .bg-white has 2.1:1 contrast ratio
   Suggestion: Change to .text-gray-600 (4.6:1 ratio)
   Reason for review: May require design approval
```

### Unused Files Deleted

```
🗑️ src/components/OldButton.tsx — Unused component (replaced by Button.tsx)
🗑️ src/lib/deprecated.ts — Unused utility file
🗑️ data/config.json.backup — Backup file (content preserved in git history)
🗑️ temp_test_output.json — Temporary test file
```

**Note:** Documentation files (`.md` files) are excluded from deletion as they are handled by the cleanup-folder.md agent.

---

**Last Updated:** 2025-12-29
