# Debug — Comprehensive Project Audit & Auto-Fix

> **Prompt for Cursor AI to thoroughly audit a project for bugs, optimizations, and accessibility issues**

---

## Prompt

```
Perform a comprehensive debug audit of this project.

## Scope

Analyze the ENTIRE codebase to identify:

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
- Poor color contrast (text vs background) — WCAG AA minimum 4.5:1
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
| **File** | Path to the affected file |
| **Line(s)** | Line number(s) |
| **Category** | Bug / Optimization / Accessibility |
| **Severity** | Critical / High / Medium / Low |
| **Issue** | Clear description of the problem |
| **Confidence** | High / Medium / Low (your confidence in the fix) |
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

## Execution Order

1. Read all source files (src/, app/, components/, lib/, pages/)
2. Check configuration files (package.json, tsconfig, eslint, tailwind)
3. Analyze styles for accessibility (CSS, Tailwind classes)
4. Review API routes and data fetching
5. Check test coverage gaps (if tests exist)
6. Generate report and apply high-confidence fixes
```

---

## Quick Usage

### Full Project Audit
```
@debug.md — Run full audit on this project
```

### Targeted Audit
```
@debug.md — Focus on accessibility issues only
```

```
@debug.md — Focus on performance optimizations only
```

```
@debug.md — Audit only the /src/components folder
```

---

## Category Deep-Dives

### Accessibility Checklist (WCAG 2.1 AA)

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

### Common Bug Patterns

| Pattern | Example |
|---------|---------|
| **Unhandled Promise** | `fetch()` without `.catch()` |
| **Optional Chaining Missing** | `user.profile.name` → `user?.profile?.name` |
| **State Mutation** | `array.push()` in React state |
| **useEffect Deps** | Missing dependencies in array |
| **Key Prop Missing** | Lists without unique `key` |
| **Event Handler Binding** | Arrow function in render causing re-renders |

### Performance Red Flags

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

---

## Integration with Other Prompts

- After `@debug.md`, run tests to verify fixes
- Pair with `@Critique_Agent.md` for code quality review
- Use `@OptimizeDoc.md` for documentation gaps found

---

**Last Updated:** 2025-12-13

