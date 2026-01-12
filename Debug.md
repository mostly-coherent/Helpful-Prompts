# Debug — Comprehensive Project Audit

> **Automated debugging audit for bugs, performance, and accessibility issues**

---

## Prompt

```
Perform a comprehensive debug audit of this project.

## Path Scoping (CRITICAL)

**Always scope file operations to the explicitly specified project directory.**

When the user says "@Debug.md on Inspiration", audit ONLY files within:
- `<WORKSPACE_PATH>/Inspiration/` (or relative equivalent, e.g., `./Inspiration/`)

**Explicitly EXCLUDE:**
- `MyPrivateTools/` and all subdirectories (private tools, symlinks)
- `Production_Clones/` (cloned reference projects)
- `Docs_*/` folders (documentation only)
- Any path outside the target project directory

**Why:** Workspace may contain symlinks or duplicate directories (e.g., `MyPrivateTools/Inspiration/.next`) that create "ghost files" if not excluded. Always use absolute paths relative to the project root, not workspace root.

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

### Phase 0: Pre-Flight Compilation Checks (CRITICAL - Run First)

**Rule:** Code must compile before it can be analyzed. Stop immediately if compilation fails.

1. **Scope the audit to the target project directory only** — Use absolute paths and exclude:
   - `MyPrivateTools/` and all subdirectories (symlinks/private tools)
   - `Production_Clones/` (cloned reference projects)
   - `Docs_*` folders (documentation only)
   - Any path outside the explicitly specified project directory

2. **Verify all code compiles/executes** (within target project only):
   
   **TypeScript/JavaScript:**
   ```bash
   npx tsc --noEmit  # TypeScript compilation check
   npm run lint      # ESLint (if configured)
   ```
   
   **Python (if project uses Python backend):**
   ```bash
   # Syntax check all Python files
   find . -name "*.py" -not -path "./node_modules/*" -not -path "./.venv/*" -not -path "./__pycache__/*" \
     -exec python3 -m py_compile {} \;
   
   # Import check (critical modules)
   python3 -c "import sys; sys.path.insert(0, '.'); from engine.generate import *" 2>&1
   
   # Dry-run smoke test (if applicable)
   python3 engine/generate.py --dry-run 2>&1 | head -20
   ```
   
   **Why this matters:** E2E tests may pass even with syntax errors if:
   - Tests mock backend functionality
   - Tests don't exercise modified code paths
   - Syntax errors exist in unimported modules
   
   **If compilation fails:** Fix syntax/import errors before proceeding to Phase 1.

### Phase 1: Static Analysis

3. Read all source files (src/, app/, components/, lib/, pages/) **within the target project only**
4. Check configuration files (package.json, tsconfig, eslint, tailwind) **within the target project only**
5. Analyze styles for accessibility (CSS, Tailwind classes) **within the target project only**
6. Review API routes and data fetching **within the target project only**

### Phase 2: Test Validation

7. Check test coverage gaps (if tests exist) **within the target project only**
8. Run E2E tests (verify they exercise modified code paths)
9. Run unit tests (if they exist)

### Phase 3: Reporting

10. Generate report and apply high-confidence fixes
11. **Identify and delete unused files** (exclude documentation - handled by cleanup-folder.md) **within the target project only**

**Critical:** When scanning directories, always use the project root as the base path and explicitly exclude workspace-level folders like `MyPrivateTools/`, `Production_Clones/`, and `Docs_*/` to avoid "ghost files" from symlinks or duplicate directories.
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

## Test Coverage Reality Check

### What E2E Tests Don't Catch

| Test Type | What It Catches | What It Misses |
|-----------|-----------------|----------------|
| **E2E (Playwright)** | UI flows, integration paths, user journeys | Syntax errors in unexercised code paths, backend logic not called by tests |
| **Unit Tests** | Function-level logic, edge cases | Integration issues, UI bugs, end-to-end flows |
| **Linters** | Style issues, common patterns | Syntax errors (if not configured), logic errors, runtime issues |
| **TypeScript** | Type errors, interface mismatches | Runtime errors, business logic bugs, Python backend errors |

### The "Tests Passing" Trap

**Scenario:** Modified Python backend file → 26 Playwright tests pass → App crashes on first real use

**Why tests passed:**
- Tests mock backend responses OR
- Tests only exercise frontend OR  
- Modified code path not covered by tests OR
- Syntax error in module that tests don't import

**Solution:** Always run backend smoke tests independently of E2E tests.

### Smoke Test Checklist

For any backend changes (Python, Node.js API routes, etc.):
- [ ] Run syntax check: `python3 -m py_compile <modified_file>`
- [ ] Try importing the module: `python3 -c "from module import Class"`
- [ ] Run dry-run test if available: `python3 script.py --dry-run`
- [ ] Run unit tests for that module: `pytest tests/test_module.py`
- [ ] THEN run E2E tests

**Never assume "tests passing" means "code works"** without verifying the specific code path was exercised.

---

## Confidence Calibration

### Zero Tolerance (Must Fix Immediately - Before Any Analysis)
- **Syntax errors** (Python, TypeScript, JavaScript, etc.)
- **Import errors** (missing modules, circular imports)
- **Compilation failures** (TypeScript, build errors)

**Rule:** If code doesn't compile, stop audit and fix immediately. No other analysis matters.

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

## Key Principle

**"Code must compile before it can be analyzed."**

This is enforced via Phase 0 (Pre-Flight Compilation Checks). Multiple comprehensive audits that miss syntax errors aren't actually comprehensive.

**Testing Pyramid for Hybrid Apps:**
```
        /\
       /  \  E2E Tests (Playwright)
      /    \  User journeys, integration
     /------\
    / Unit   \  Backend unit tests
   / Tests    \ Function-level logic
  /           \
 /-------------\
/ Compilation  \ Syntax + Import checks
\   Checks    /  MUST PASS FIRST
 \-----------/
```

---

**Last Updated:** 2026-01-12
