# CodeFix — Automated Code Review & Fix

> **Comprehensive code review and automated fix for bugs, syntax errors, race conditions, missing integrations, and code quality issues**

---

## Purpose

**CodeFix** performs thorough code review on code written by other LLMs or coding agents, identifies issues, and automatically fixes them when confidence is high. This prompt is specifically designed for **Composer-1 only** to review and fix code from other AI agents.

**🚨 CRITICAL: Composer-Only Policy**
- **This prompt MUST be run by Composer (Composer-1), NOT Chat or other agents**
- Composer has the context and tool access needed for comprehensive code review
- Chat agents should redirect users to use Composer when CodeFix.md is invoked
- See User Rules for enforcement policy

**Key Principle**: CodeFix assumes code may have been written by another agent and may contain subtle bugs, race conditions, missing error handling, or integration gaps that weren't caught initially. As an expert code reviewer, CodeFix ensures code is ready for PM UAT by checking not just correctness, but completeness, user experience, test coverage, and production readiness.

---

## Usage

### Basic Usage
```
@CodeFix.md
```

Review all code in the current project and fix issues automatically.

### Targeted Review
```
@CodeFix.md on [file path or directory]
```

Review specific file(s) or directory.

### Focused Review
```
@CodeFix.md — focus on [race conditions | async/await | error handling | type safety | integrations]
```

Review specific category of issues.

---

## Review Checklist

### 1. Syntax & Compilation Errors (CRITICAL - Fix Immediately)

| Check | Examples |
|-------|----------|
| **Syntax Errors** | Missing brackets, semicolons, typos in keywords |
| **Type Errors** | TypeScript type mismatches, missing types |
| **Import Errors** | Missing imports, circular dependencies, wrong paths |
| **Compilation Failures** | Code that doesn't compile/build |

**Action**: Fix immediately before any other analysis.

### 2. Logic Bugs & Edge Cases

| Check | Examples |
|-------|----------|
| **Null/Undefined Access** | `obj.property` without null check → `obj?.property` |
| **Array Bounds** | Accessing `array[index]` without length check |
| **Division by Zero** | `value / divisor` without checking divisor |
| **Off-by-One Errors** | Loop boundaries, array indexing |
| **Incorrect Conditionals** | Wrong comparison operators (`=` vs `===`), inverted logic |
| **Missing Default Cases** | Switch statements without default, missing else clauses |
| **Uninitialized Variables** | Using variables before assignment |

### 3. Race Conditions & Async Issues

| Check | Examples |
|-------|----------|
| **Unhandled Promises** | `fetch()` without `.catch()` or `await` |
| **Race Conditions** | Multiple async operations modifying shared state |
| **Missing Await** | Forgetting `await` on async function calls |
| **Promise Chains** | `.then()` chains without error handling |
| **State Updates After Unmount** | React state updates after component unmounts |
| **Stale Closures** | Using old values in async callbacks |
| **Concurrent Modifications** | Multiple operations modifying same resource without locks |

### 4. Error Handling & Resilience

| Check | Examples |
|-------|----------|
| **Missing Try-Catch** | Operations that can throw without error handling |
| **Silent Failures** | Errors caught but not logged or handled |
| **Generic Error Messages** | Unhelpful error messages without context |
| **Missing Validation** | User input not validated before processing |
| **API Error Handling** | API calls without error handling or retry logic |
| **Resource Cleanup** | File handles, connections not closed in finally blocks |

### 5. Integration & API Issues

| Check | Examples |
|-------|----------|
| **Missing API Calls** | Features that require API calls but don't make them |
| **Wrong Endpoints** | Incorrect API URLs or paths |
| **Missing Headers** | API calls without required auth headers |
| **Response Parsing** | Not parsing JSON responses, assuming response format |
| **Missing Error Responses** | Not handling API error status codes (4xx, 5xx) |
| **Database Queries** | SQL/ORM queries without error handling |
| **Missing Transactions** | Multi-step operations without transaction handling |

### 6. React/Next.js Specific Issues

| Check | Examples |
|-------|----------|
| **Missing Dependencies** | `useEffect` dependencies array incomplete |
| **State Mutation** | Direct mutation of state (`array.push()` instead of new array) |
| **Missing Keys** | Lists without unique `key` prop |
| **Infinite Loops** | `useEffect` causing infinite re-renders |
| **Server/Client Mismatch** | Using browser APIs in Server Components |
| **Hydration Errors** | Mismatch between server and client rendering |
| **Missing Loading States** | Async operations without loading indicators |
| **Memory Leaks** | Event listeners, subscriptions not cleaned up |

### 7. Type Safety & TypeScript Issues

| Check | Examples |
|-------|----------|
| **Missing Types** | `any` types, untyped function parameters |
| **Type Assertions** | Unsafe `as` casts without validation |
| **Interface Mismatches** | Objects not matching declared interfaces |
| **Generic Constraints** | Missing constraints on generic types |
| **Optional Chaining** | Not using `?.` for potentially undefined properties |

### 8. Performance Issues

| Check | Examples |
|-------|----------|
| **N+1 Queries** | Database queries inside loops |
| **Unnecessary Re-renders** | Object/array literals in props causing re-renders |
| **Missing Memoization** | Expensive computations without `useMemo`/`useCallback` |
| **Large Bundle Imports** | Importing entire libraries instead of specific functions |
| **Blocking Operations** | Synchronous operations blocking main thread |

### 9. Security Issues

| Check | Examples |
|-------|----------|
| **XSS Vulnerabilities** | Rendering user input without sanitization |
| **SQL Injection** | Raw SQL queries with user input |
| **Exposed Secrets** | API keys, tokens in client-side code |
| **Missing CSRF Protection** | Forms without CSRF tokens |
| **Insecure Dependencies** | Using packages with known vulnerabilities |

### 10. Code Quality & Best Practices

| Check | Examples |
|-------|----------|
| **Dead Code** | Unused functions, variables, imports |
| **Code Duplication** | Repeated logic that should be extracted |
| **Magic Numbers** | Hardcoded values without constants |
| **Long Functions** | Functions exceeding reasonable length |
| **Poor Naming** | Unclear variable/function names |
| **Missing Comments** | Complex logic without explanation |

### 11. Test Coverage & UAT Readiness (EXPERT LEVEL)

| Check | Examples |
|-------|----------|
| **Missing Tests** | No tests for new functionality |
| **Happy Path Only** | Tests only cover success scenarios |
| **Missing Edge Cases** | No tests for empty data, null values, boundary conditions |
| **Missing Error Path Tests** | No tests for error scenarios, API failures |
| **Incomplete Coverage** | Critical paths not tested |
| **Test Quality** | Tests that don't actually verify behavior |

**PM UAT Readiness Checklist:**
- ✅ Happy path works (basic functionality)
- ✅ Error states handled gracefully (user-friendly messages)
- ✅ Loading states present (users know something is happening)
- ✅ Empty states handled (no data scenarios)
- ✅ Success feedback provided (confirmation of actions)
- ✅ Edge cases tested (boundary conditions, null values)
- ✅ Validation works (invalid input rejected with clear messages)

### 12. User Experience Completeness (EXPERT LEVEL)

| Check | Examples |
|-------|----------|
| **Missing Loading States** | Async operations without loading indicators |
| **Missing Error States** | Errors shown as blank screens or console errors |
| **Missing Empty States** | No data scenarios show broken UI |
| **Missing Success Feedback** | Actions complete silently without confirmation |
| **Poor Error Messages** | Technical error messages shown to users |
| **Missing Validation Feedback** | Invalid input not clearly marked |
| **Accessibility Gaps** | Missing ARIA labels, keyboard navigation issues |

**UX Checklist:**
- ✅ Loading: Spinner, skeleton, or progress indicator
- ✅ Error: User-friendly message with actionable next steps
- ✅ Empty: Helpful message explaining why (no data, filtered out, etc.)
- ✅ Success: Confirmation toast, success message, or visual feedback
- ✅ Validation: Inline errors, clear field highlighting, helpful hints

### 13. Edge Cases & Boundary Conditions (EXPERT LEVEL)

| Check | Examples |
|-------|----------|
| **Zero/Length Checks** | Empty arrays, empty strings, zero values |
| **Null/Undefined Handling** | Missing data, optional fields |
| **Boundary Values** | Min/max values, array limits, pagination edges |
| **Concurrent Actions** | Multiple rapid clicks, double submissions |
| **Network Failures** | Offline scenarios, timeout handling |
| **Large Data Sets** | Performance with 1000+ items |
| **Special Characters** | Unicode, emojis, SQL injection attempts |
| **Date/Time Edge Cases** | Timezone issues, leap years, DST transitions |

### 14. Data Validation & Sanitization (EXPERT LEVEL)

| Check | Examples |
|-------|----------|
| **Missing Input Validation** | User input not validated before processing |
| **Client-Only Validation** | No server-side validation (can be bypassed) |
| **Insufficient Validation** | Only checking format, not business rules |
| **Missing Sanitization** | User input rendered without escaping |
| **Type Validation** | Not checking data types (string vs number) |
| **Range Validation** | Not checking min/max values |
| **Format Validation** | Email, phone, date formats not validated |

### 15. Observability & Debugging (EXPERT LEVEL)

| Check | Examples |
|-------|----------|
| **Missing Logging** | No logs for critical operations |
| **Poor Log Quality** | Logs without context, timestamps, or request IDs |
| **Missing Error Tracking** | Errors not sent to error tracking service |
| **Missing Metrics** | No performance or business metrics |
| **Missing Request Tracing** | Can't trace requests across services |
| **Sensitive Data in Logs** | Passwords, tokens, PII logged |

**Observability Checklist:**
- ✅ Critical operations logged (with context)
- ✅ Errors tracked (with stack traces and context)
- ✅ Performance metrics (response times, query times)
- ✅ User actions tracked (for debugging user issues)
- ✅ Request IDs for tracing (correlate logs across services)

### 16. Backward Compatibility & Migration Safety (EXPERT LEVEL)

| Check | Examples |
|-------|----------|
| **Breaking Changes** | API changes breaking existing clients |
| **Data Migration Issues** | Database migrations without rollback plan |
| **Missing Versioning** | API changes without versioning |
| **Schema Changes** | Database schema changes breaking existing data |
| **Config Changes** | Environment variable changes breaking deployments |
| **Dependency Updates** | Package updates with breaking changes |

### 17. Feature Flags & Rollback Readiness (EXPERT LEVEL)

| Check | Examples |
|-------|----------|
| **Risky Changes Without Flags** | Major changes not behind feature flags |
| **Missing Rollback Plan** | No way to disable feature if issues arise |
| **Hardcoded Feature State** | Can't toggle features without code changes |
| **Missing Gradual Rollout** | All-or-nothing deployments |

**For Risky Changes:**
- ✅ Feature flag to enable/disable
- ✅ Gradual rollout (percentage of users)
- ✅ Easy rollback (disable flag, revert code)
- ✅ Monitoring before full rollout

### 18. Documentation & Code Comments (EXPERT LEVEL)

| Check | Examples |
|-------|----------|
| **Missing Code Comments** | Complex logic without explanation |
| **Missing API Documentation** | New endpoints not documented |
| **Missing Changelog** | Changes not logged for PM/release notes |
| **Outdated Comments** | Comments don't match code |
| **Missing README Updates** | New features not documented in README |
| **Missing Type Documentation** | Complex types without JSDoc/TSDoc |

### 19. Integration Completeness (EXPERT LEVEL)

| Check | Examples |
|-------|----------|
| **Incomplete Integrations** | Partial API integration (missing endpoints) |
| **Missing Webhooks** | Events not propagated to external systems |
| **Missing Sync Logic** | Data not synced between systems |
| **Missing Retry Logic** | Failed API calls not retried |
| **Missing Circuit Breakers** | No protection against cascading failures |
| **Missing Rate Limiting** | No protection against API abuse |

### 20. State Management & Data Consistency (EXPERT LEVEL)

| Check | Examples |
|-------|----------|
| **Stale State** | UI showing outdated data |
| **State Synchronization** | Multiple sources of truth |
| **Missing Cache Invalidation** | Cached data not invalidated on updates |
| **Race Conditions in State** | Concurrent updates causing inconsistencies |
| **Missing Optimistic Updates** | UI not updated optimistically |
| **Transaction Safety** | Multi-step operations not atomic |

### 21. Performance Under Load (EXPERT LEVEL)

| Check | Examples |
|-------|----------|
| **Missing Pagination** | Loading all data at once |
| **Missing Debouncing** | Rapid user input causing excessive API calls |
| **Missing Caching** | Repeated expensive operations not cached |
| **Missing Lazy Loading** | Loading unnecessary data upfront |
| **Missing Compression** | Large payloads not compressed |
| **Missing CDN** | Static assets not served from CDN |
| **Missing Database Indexes** | Slow queries without indexes |

### 22. Security Hardening (EXPERT LEVEL)

| Check | Examples |
|-------|----------|
| **Missing Authorization Checks** | Not verifying user permissions |
| **Missing Rate Limiting** | No protection against abuse |
| **Missing Input Sanitization** | XSS vulnerabilities |
| **Missing CSRF Protection** | Forms vulnerable to CSRF attacks |
| **Missing HTTPS** | Sensitive data over HTTP |
| **Missing Secure Headers** | Missing security headers (CSP, HSTS, etc.) |
| **Exposed Sensitive Data** | API keys, tokens in client code |

---

## Execution Flow

### Phase 0: Pre-Flight Checks (CRITICAL - MANDATORY SAFETY GATES)

**🚨 CRITICAL: All safety gates must pass before proceeding. If any gate fails, stop immediately.**

#### Gate 1: Project Context Loading
1. **Load project configuration**:
   - Read `.cursorrules` for project conventions (if exists)
   - Read `CLAUDE.md` for tech stack choices (if exists)
   - Read `package.json` for dependencies and scripts
   - Read `tsconfig.json` for TypeScript config (if TypeScript project)
   - Read `.eslintrc` or `eslint.config.*` for linting rules (if exists)
2. **Respect project rules**: Don't suggest patterns incompatible with project conventions
3. **Follow style guide**: Use project linting rules and code style

#### Gate 2: Compilation Check
**Rule**: Code must compile before it can be reviewed. Stop immediately if compilation fails.

1. **Compilation Check**:
   ```bash
   # TypeScript/JavaScript
   npx tsc --noEmit
   npm run lint
   
   # Python
   python3 -m py_compile <files>
   ```

2. **If compilation fails**: Fix syntax/import errors immediately before proceeding. Do NOT proceed to fixes until compilation passes.

#### Gate 3: Scope Definition
1. **Determine review scope** (based on usage):
   - If `@CodeFix.md` → Review entire project
   - If `@CodeFix.md on [path]` → Review specific file/directory
   - If `@CodeFix.md — focus on [category]` → Review specific category
2. **List files to review**: Show all files that will be analyzed
3. **Confirm scope**: User can approve or adjust scope before fixes

### Phase 1: Static Analysis + Impact Analysis

1. **Read all relevant source files** (scope based on Phase 0 Gate 5)
2. **Build dependency graph**:
   - For each file to be fixed, find what imports/uses it: `grep -r "import.*FixedFile" src/` or `grep -r "from.*FixedFile" src/`
   - List dependent files that might be affected by fixes
   - Check for circular dependencies
3. **Analyze code structure and dependencies**:
   - Understand how files relate to each other
   - Identify shared utilities, hooks, components
   - Map data flow and state management
4. **Check for patterns from the review checklist**:
   - Go through all 22 categories systematically
   - Use context-aware detection (see Pattern Detection section)
5. **Identify issues and categorize by severity**:
   - Critical: Compilation errors, runtime crashes, data loss
   - High: Bugs breaking functionality, security issues
   - Medium: Logic errors, missing error handling, performance
   - Low: Code quality, best practices, optimizations
6. **Impact scope analysis**:
   - For each issue, list files that might be affected
   - Estimate risk level (low/medium/high) based on dependency graph
   - Flag cross-file issues that require coordinated fixes

### Phase 2: Issue Prioritization

| Severity | Criteria | Action |
|----------|----------|--------|
| **Critical** | Code doesn't compile, runtime crashes, data loss risk | Fix immediately |
| **High** | Bugs that break functionality, security issues | Fix automatically if high confidence |
| **Medium** | Logic errors, missing error handling, performance issues | Fix automatically if straightforward |
| **Low** | Code quality, best practices, optimizations | Report and suggest fixes |

### Phase 3: Automated Fixes (INCREMENTAL WITH VERIFICATION)

**🚨 CRITICAL: Apply fixes incrementally, verify after each fix. Stop immediately if verification fails.**

#### Auto-Fix Rules (REVISED - CONSERVATIVE APPROACH)

✅ **Always Auto-Fix** (Truly Safe - No Verification Needed):
- Syntax errors (missing brackets, typos, semicolons)
- Unused imports/variables (dead code removal)
- Missing `key` props in React lists (obvious bug)
- TypeScript type errors (if fix is obvious: missing import, wrong type name)

⚠️ **Auto-Fix with Verification** (Requires Test Pass After Each Fix):
- Missing null checks (`obj.property` → `obj?.property`) — **ONLY if no null guard exists in parent scope**
- Missing `await` on async calls — **ONLY if function is actually async**
- Missing error handling (add try-catch) — **ONLY if operation can actually throw**
- Missing dependencies in `useEffect` — **ONLY if safe (won't cause infinite loop)**
- Direct state mutations (React) — **ONLY if clearly a mutation bug**
- Missing `.catch()` on promises — **ONLY if promise can reject**

❌ **Never Auto-Fix** (Report Only - Requires Human Judgment):
- Business logic changes
- Architectural decisions
- API endpoint changes
- Database schema changes
- Changes affecting multiple files (coordinate manually)
- Performance optimizations requiring testing
- Missing tests (report, don't create tests automatically)
- Complex refactoring

#### Context-Aware Pattern Detection (BEFORE FIXING)

**Before fixing "missing null check":**
1. Check parent scope for null guard: `if (obj) { obj.property }` → Skip (already guarded)
2. Check for early return: `if (!obj) return; obj.property` → Skip (already guarded)
3. Check for intentional pattern: `// Intentional: allow null` comment → Skip
4. If no guard exists → Fix with verification

**Before fixing "missing await":**
1. Check if function is async: `async function fetchData()` → Fix if should be awaited
2. Check if intentional fire-and-forget: `fireAnalyticsEvent()` (no return value, no error handling needed) → Skip (intentional)
3. Check for comment: `// Fire and forget` → Skip
4. If async and should be awaited → Fix with verification

**Before fixing "missing dependencies in useEffect":**
1. Check if adding dependency causes infinite loop risk:
   - If dependency is object/array literal → Report only (might cause loop)
   - If dependency is stable value (primitive, memoized) → Fix with verification
2. Check for intentional empty deps: `// eslint-disable-next-line react-hooks/exhaustive-deps` → Skip
3. If safe dependency missing → Fix with verification

**Before fixing "missing error handling":**
1. Check if operation can actually throw:
   - `JSON.parse()` → Can throw → Fix with verification
   - `array.map()` → Won't throw → Skip
2. Check if error is handled upstream → Skip
3. If operation can throw and no handler → Fix with verification

#### Incremental Fix Application Process

**For each fix (one at a time):**

1. **Apply single fix** to one file/issue
2. **Immediate verification**:
   ```bash
   # Compilation check
   npx tsc --noEmit && npm run lint
   ```
   - ✅ If passes → Continue to step 3
   - ❌ If fails → **ROLLBACK IMMEDIATELY**, report failure, stop

3. **Test verification** (if tests exist):
   ```bash
   npm test
   ```
   - ✅ If passes → Continue to next fix
   - ❌ If fails → Report failure, stop (don't proceed with more fixes)

4. **Record fix**: Log what was fixed, why, and verification result

5. **Repeat** for next fix

**Benefits:**
- Isolate which fix broke code (if any)
- Easier debugging
- Can stop early if critical failure
- Preserves working state

**Note:** If you committed before running CodeFix, you can rollback manually if needed:
```bash
git reset --hard HEAD  # Rollback to last commit
git clean -fd  # Remove untracked files
```

#### Fix Provenance Tracking

**For each fix, record:**
- File and line number
- Original code
- Fixed code
- Reason for fix
- Confidence level (High/Medium/Low)
- Verification result (Passed/Failed)
- Impact scope (files affected)

### Phase 4: Expert-Level Review (PM UAT Readiness)

**As an expert code reviewer approving PRs for PM UAT, verify:**

1. **Test Coverage**:
   - ✅ Happy path tested
   - ✅ Edge cases tested (empty data, null values, boundaries)
   - ✅ Error scenarios tested
   - ✅ Critical user flows covered

2. **User Experience Completeness**:
   - ✅ Loading states present
   - ✅ Error states user-friendly
   - ✅ Empty states handled
   - ✅ Success feedback provided
   - ✅ Validation feedback clear

3. **Production Readiness**:
   - ✅ Error handling comprehensive
   - ✅ Logging/observability in place
   - ✅ Performance acceptable (no obvious bottlenecks)
   - ✅ Security checks passed
   - ✅ Backward compatibility maintained (if applicable)
   - ✅ Rollback plan exists (for risky changes)

4. **Integration Completeness**:
   - ✅ All API endpoints integrated
   - ✅ Error responses handled
   - ✅ Retry logic in place (if needed)
   - ✅ Data consistency maintained

### Phase 5: Verification (MANDATORY STEPS - ALL MUST PASS)

**🚨 CRITICAL: All verification steps must pass. If any step fails, rollback immediately.**

**Note:** Incremental verification happens during Phase 3 (after each fix). This phase is final verification after all fixes are applied.

#### Step 1: Compilation Verification (MANDATORY)
```bash
npx tsc --noEmit
npm run lint
```
- ✅ **Must pass** (no new errors)
- ❌ **If fails**: Rollback immediately, report failure

#### Step 2: Test Execution Verification (IF TESTS EXIST)
```bash
npm test
```
- ✅ **Must pass** (tests should pass after fixes)
- ✅ **If no tests exist**: Skip test verification
- ❌ **If tests fail**: Report failure (tests don't pass after fixes)

#### Step 3: Runtime Check (RECOMMENDED)
```bash
# Start dev server in background
npm run dev &
# Wait for server to start
sleep 5
# Check for console errors (manual or automated)
# Stop server
pkill -f "next dev" || pkill -f "vite" || echo "Server stopped"
```
- ✅ **No console errors**: Check browser console (if accessible) or logs
- ⚠️ **If errors found**: Report but don't rollback (may be pre-existing)
- ✅ **If dev server fails to start**: Rollback, report failure

#### Step 4: Smoke Test (IF E2E TESTS EXIST)
```bash
# Run critical user flows only
npm run test:e2e -- --grep "critical|happy path" || echo "No E2E tests or grep pattern"
```
- ✅ **If E2E tests exist**: Critical flows must pass
- ✅ **If no E2E tests**: Skip (not mandatory)

#### Step 5: Cross-File Verification
1. **Check dependent files**: Verify files that import/use fixed code still work
2. **Check for new issues**: Look for issues introduced by fixes
3. **Verify no regressions**: Ensure existing functionality still works

#### Step 6: PM UAT Readiness Verification
Verify Phase 4 checklist:
- ✅ Test Coverage: Happy path + edge cases tested
- ✅ User Experience: Loading/error/empty/success states present
- ✅ Error Handling: All errors handled gracefully
- ✅ Performance: No obvious bottlenecks
- ✅ Security: Input validation + sanitization
- ✅ Observability: Logging/error tracking in place

#### Rollback Procedure (IF ANY VERIFICATION FAILS)

**If verification fails at any step:**

1. **Report failure**:
   - Which step failed
   - What broke
   - Why it broke
   - What was attempted
   - **Note**: If you committed before running CodeFix, you can rollback with `git reset --hard HEAD`

2. **Do NOT proceed**: Stop immediately, require manual review

**⚠️ Manual Rollback (if needed):**
If you committed before running CodeFix and need to rollback:
```bash
git reset --hard HEAD  # Rollback to last commit
git clean -fd  # Remove untracked files
```

#### Final Verification Summary

**After all fixes and verification:**

```
✅ Compilation: PASSED
✅ Type Check: PASSED
✅ Linting: PASSED
✅ Tests: PASSED (or equal baseline)
✅ Runtime: PASSED (no console errors)
✅ Smoke Test: PASSED (if E2E exists)
✅ Cross-File: PASSED (dependent files work)
✅ PM UAT Readiness: [Status per Phase 4 checklist]
```

**If all pass**: Mark fixes as complete, show summary
**If any fail**: Rollback, report, stop

---

## Output Format

**🚨 IMPORTANT: Output Format is for Response Only**
- **DO NOT create .md files or documentation artifacts** unless explicitly requested by user
- Present all results in the chat/composer response using the format below
- The "Output Format" section specifies HOW to format the response, not what files to create
- Focus on fixing code, not creating documentation overhead

### Summary Table

| # | File | Line(s) | Category | Severity | Issue | Status |
|---|------|---------|----------|----------|-------|--------|
| 1 | `src/api.ts` | 23 | Race Condition | High | Unhandled promise rejection | ✅ Fixed |
| 2 | `src/components/List.tsx` | 15 | React | Medium | Missing key prop | ✅ Fixed |
| 3 | `src/utils.ts` | 45 | Logic Bug | High | Null access without check | ✅ Fixed |

### Auto-Fixed Issues

```
✅ src/api.ts:23 — Added .catch() handler for fetch promise
✅ src/components/List.tsx:15 — Added key={item.id} to list items
✅ src/utils.ts:45 — Added null check: user?.profile?.name
✅ src/hooks/useData.ts:12 — Added missing dependency to useEffect array
✅ src/components/Form.tsx:8 — Fixed state mutation: setItems([...items, newItem])
```

### Issues Requiring Review

```
⚠️ src/api/users.ts:45
   Issue: API endpoint hardcoded, should use environment variable
   Suggestion: Replace with process.env.NEXT_PUBLIC_API_URL
   Reason: May be intentional for development

⚠️ src/lib/db.ts:78
   Issue: Database query without transaction for multi-step operation
   Suggestion: Wrap in transaction
   Reason: Requires understanding of data consistency requirements
```

### Verification Results

```
✅ Compilation: PASSED
✅ Type Check: PASSED
✅ Linting: PASSED
✅ Tests: PASSED (if tests exist)
✅ Runtime: PASSED (no console errors)
✅ Smoke Test: PASSED (critical flows work)
✅ Cross-File: PASSED (dependent files verified)
```

**If tests fail:**
```
❌ Tests: FAILED
   Failure Details: [describe what broke]
   Note: Fixes stopped after this failure
```

### PM UAT Readiness Assessment

| Category | Status | Notes |
|----------|--------|-------|
| **Test Coverage** | ✅ Ready | Happy path + edge cases tested |
| **User Experience** | ⚠️ Needs Work | Missing empty state for user list |
| **Error Handling** | ✅ Ready | All errors handled with user-friendly messages |
| **Performance** | ✅ Ready | Pagination implemented, queries optimized |
| **Security** | ✅ Ready | Input validation + sanitization in place |
| **Observability** | ⚠️ Needs Work | Missing error tracking integration |
| **Documentation** | ✅ Ready | README updated, API documented |

**Overall UAT Readiness**: ⚠️ **Conditional Approval** — Address empty state and error tracking before PM UAT

---

## Common Pitfalls to Avoid

### 🚨 Critical Pitfalls (Will Break Code)

#### Pitfall 1: Adding `await` to Non-Async Functions
**❌ Wrong:**
```typescript
// Function is not async
const result = await syncFunction(); // ❌ BREAKS: syncFunction is not async
```

**✅ Correct:**
```typescript
// Check if function is async first
const result = syncFunction(); // ✅ Correct, no await needed
```

**Detection Rule:** Always check function signature before adding `await`.

#### Pitfall 2: Adding `await` in useEffect (Cannot Be Async)
**❌ Wrong:**
```typescript
useEffect(() => {
  await fetchData(); // ❌ BREAKS: useEffect callback cannot be async
}, []);
```

**✅ Correct:**
```typescript
useEffect(() => {
  fetchData().then(data => {
    // Handle data
  });
}, []);
// OR
useEffect(() => {
  (async () => {
    const data = await fetchData();
    // Handle data
  })();
}, []);
```

**Detection Rule:** Never add `await` directly in useEffect callback.

#### Pitfall 3: Adding Dependencies That Cause Infinite Loops
**❌ Wrong:**
```typescript
useEffect(() => {
  fetchData({ filter: 'active' }); // Object literal recreated every render
}, [{ filter: 'active' }]); // ❌ INFINITE LOOP: new object every render
```

**✅ Correct:**
```typescript
// Use stable value or memoize
const filter = useMemo(() => ({ filter: 'active' }), []);
useEffect(() => {
  fetchData(filter);
}, [filter]); // ✅ Safe: filter is memoized
```

**Detection Rule:** Check if dependency is object/array literal before adding to deps.

#### Pitfall 4: Masking Real Bugs with Generic Error Handling
**❌ Wrong:**
```typescript
// Generic catch hides the real issue
try {
  const user = users.find(u => u.id === userId);
  const name = user.name; // ❌ user might be undefined
} catch (error) {
  console.error('Error'); // ❌ Masks the real bug
}
```

**✅ Correct:**
```typescript
// Fix the root cause, not mask it
const user = users.find(u => u.id === userId);
if (!user) {
  throw new Error(`User ${userId} not found`);
}
const name = user.name; // ✅ Safe: user is guaranteed to exist
```

**Detection Rule:** Don't add generic try-catch that masks real bugs. Fix root cause.

#### Pitfall 5: Breaking Intentional Patterns
**❌ Wrong:**
```typescript
// Code has intentional comment - don't "fix" it
// Fire and forget - allow null
fireAnalyticsEvent(user?.id); // ✅ Intentional, skip fix
// CodeFix incorrectly "fixes" to: await fireAnalyticsEvent(user?.id);
```

**✅ Correct:**
```typescript
// Respect intentional patterns
// Fire and forget - allow null
fireAnalyticsEvent(user?.id); // ✅ Skip fix, pattern is intentional
```

**Detection Rule:** Check for comments explaining intentional patterns before fixing.

### ⚠️ Medium-Risk Pitfalls (May Break Code)

#### Pitfall 6: Changing Function Signatures
**❌ Wrong:**
```typescript
// Fixing "missing error handling" changes return type
function fetchUser(id: string) {
  return fetch(`/api/users/${id}`).then(r => r.json());
}
// CodeFix adds try-catch, but changes return type to Promise<User | null>
```

**✅ Correct:**
```typescript
// Preserve return type, handle errors appropriately
async function fetchUser(id: string): Promise<User> {
  try {
    const res = await fetch(`/api/users/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch user: ${res.status}`);
    return await res.json();
  } catch (error) {
    // Handle error without changing return type
    throw error; // Or return default value if function signature allows
  }
}
```

**Detection Rule:** Don't change function signatures when adding error handling.

#### Pitfall 7: Over-Optimizing with Optional Chaining
**❌ Wrong:**
```typescript
// Already safe, don't add unnecessary optional chaining
if (user && user.profile) {
  const name = user?.profile?.name; // ❌ Redundant, already guarded
}
```

**✅ Correct:**
```typescript
// Keep existing guard, don't add redundant optional chaining
if (user && user.profile) {
  const name = user.profile.name; // ✅ Safe, guard already exists
}
```

**Detection Rule:** Check for existing guards before adding optional chaining.

### 📋 Best Practices to Follow

1. **Always verify context** before fixing (check parent scope, comments, function signatures)
2. **Preserve function signatures** when adding error handling
3. **Respect intentional patterns** (check for comments explaining why code is written a certain way)
4. **Test after each fix** (incremental verification prevents cascading failures)
5. **Rollback immediately** if verification fails (don't try to fix the fix)
6. **Document why** each fix was made (provenance tracking helps debugging)

---

## Common Patterns to Detect

### Pattern 1: Missing Error Handling

**Before**:
```typescript
const data = await fetch('/api/users');
const users = await data.json();
```

**After**:
```typescript
try {
  const data = await fetch('/api/users');
  if (!data.ok) throw new Error(`API error: ${data.status}`);
  const users = await data.json();
} catch (error) {
  console.error('Failed to fetch users:', error);
  // Handle error appropriately
}
```

### Pattern 2: Race Condition

**Before**:
```typescript
const [count, setCount] = useState(0);
useEffect(() => {
  fetchData().then(data => setCount(data.length));
}, []);
```

**After**:
```typescript
const [count, setCount] = useState(0);
useEffect(() => {
  let cancelled = false;
  fetchData().then(data => {
    if (!cancelled) setCount(data.length);
  });
  return () => { cancelled = true; };
}, []);
```

### Pattern 3: Missing Integration

**Before**:
```typescript
// Component expects API call but doesn't make it
function UserList() {
  const [users, setUsers] = useState([]);
  // Missing: fetch users from API
  return <div>{users.map(...)}</div>;
}
```

**After**:
```typescript
function UserList() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers)
      .catch(err => console.error('Failed to fetch users:', err));
  }, []);
  
  return <div>{users.map(...)}</div>;
}
```

### Pattern 4: State Mutation

**Before**:
```typescript
const [items, setItems] = useState([]);
const addItem = (item) => {
  items.push(item); // ❌ Direct mutation
  setItems(items);
};
```

**After**:
```typescript
const [items, setItems] = useState([]);
const addItem = (item) => {
  setItems([...items, item]); // ✅ New array
};
```

### Pattern 5: Context-Aware Null Check (AVOID FALSE POSITIVES)

**❌ False Positive (Don't Fix)**:
```typescript
// Already guarded - don't add optional chaining
if (user) {
  const name = user.profile.name; // ✅ Safe, already checked
}

// Early return guard - don't fix
if (!user) return;
const name = user.profile.name; // ✅ Safe, early return protects this

// Intentional pattern - don't fix
// Fire and forget - allow null
fireAnalyticsEvent(user?.id); // ✅ Intentional, skip fix
```

**✅ True Positive (Fix with Verification)**:
```typescript
// No guard - fix this
const name = user.profile.name; // ❌ Unsafe, fix to:
const name = user?.profile?.name; // ✅ Safe
```

### Pattern 6: Context-Aware Async/Await (AVOID FALSE POSITIVES)

**❌ False Positive (Don't Fix)**:
```typescript
// Fire and forget - intentional
useEffect(() => {
  fireAnalyticsEvent(); // ✅ Intentional, no await needed
}, []);

// Non-async function - don't add await
const result = syncFunction(); // ✅ Not async, skip fix
```

**✅ True Positive (Fix with Verification)**:
```typescript
// Missing await on async function
const data = fetchData(); // ❌ Should be awaited, fix to:
const data = await fetchData(); // ✅ Correct
```

### Pattern 7: Context-Aware useEffect Dependencies (AVOID INFINITE LOOPS)

**❌ False Positive (Don't Fix)**:
```typescript
// Intentional empty deps - don't fix
useEffect(() => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  fetchData(); // ✅ Intentional, skip fix
}, []);

// Object literal - might cause loop, report only
useEffect(() => {
  fetchData({ filter: 'active' }); // ⚠️ Report only, don't auto-fix
}, []); // Adding { filter: 'active' } would cause infinite loop
```

**✅ True Positive (Fix with Verification)**:
```typescript
// Safe primitive dependency - fix this
const [userId, setUserId] = useState(0);
useEffect(() => {
  fetchUser(userId); // ✅ Safe to add userId to deps
}, []); // ❌ Missing userId, fix to: }, [userId]);
```

---

## Confidence Levels

### High Confidence (Auto-Fix)

- **Syntax errors**: Obvious typos, missing brackets
- **Missing null checks**: `obj.property` → `obj?.property`
- **Missing await**: `fetch()` → `await fetch()`
- **Missing error handling**: Add try-catch around risky operations
- **React patterns**: Missing keys, state mutations, useEffect deps
- **Unused code**: Dead imports, unused variables

### Medium Confidence (Fix with Caution)

- **Logic fixes**: May require understanding business rules
- **Performance optimizations**: Need to verify doesn't break behavior
- **API changes**: May require backend coordination
- **Type improvements**: Complex type fixes may need validation

### Low Confidence (Report Only)

- **Architectural changes**: Refactoring, restructuring
- **Business logic**: Changes to core functionality
- **API design**: Endpoint changes, request/response format
- **Database changes**: Schema modifications, migrations

---

## Key Principles

1. **Safety First**: All safety gates must pass before proceeding
2. **Compile First**: Code must compile before review
3. **Test Baseline**: Record test baseline before fixes (mandatory)
4. **Git Checkpoint**: Create checkpoint before fixes (mandatory)
5. **Fix Conservatively**: Only auto-fix truly safe issues; verify risky fixes
6. **Incremental Fixes**: Apply one fix at a time, verify after each
7. **Context-Aware**: Check if "bug" is intentional before fixing
8. **Verify Everything**: Re-check compilation and tests after each fix
9. **Rollback on Failure**: If verification fails, rollback immediately
10. **Preserve Intent**: Don't change functionality, only fix bugs
11. **Trace Issues**: Document what was wrong and why it was fixed (in response, not files)
12. **Respect Project Rules**: Follow project conventions and style guide
13. **No Documentation Overhead**: Present results in response format only; DO NOT create .md files unless explicitly requested

---

## Example Session

```
User: @CodeFix.md on src/components/

CodeFix: Reviewing src/components/...

Found 8 issues:
1. ✅ FIXED: Button.tsx:12 — Missing aria-label
2. ✅ FIXED: List.tsx:8 — Missing key prop
3. ✅ FIXED: Form.tsx:23 — Unhandled promise rejection
4. ⚠️ REVIEW: Modal.tsx:45 — Complex state logic, may need refactor
5. ✅ FIXED: Card.tsx:15 — Direct state mutation
6. ⚠️ REVIEW: UserList.tsx — Missing empty state (shows broken UI when no users)
7. ✅ FIXED: api.ts:45 — Missing error handling for 404 responses
8. ⚠️ REVIEW: hooks/useData.ts — Missing loading state indicator

PM UAT Readiness:
✅ Test Coverage: Happy path + error cases tested
⚠️ User Experience: Missing empty state (blocker for UAT)
✅ Error Handling: All API errors handled gracefully
✅ Performance: Pagination implemented

Overall: ⚠️ Conditional Approval — Add empty state before PM UAT

**Verification Summary:**
✅ All fixes verified incrementally
✅ Compilation passes
✅ Tests pass (if tests exist)
✅ Runtime check passes
✅ No regressions detected
```

---

---

## Safety Mechanisms Summary

**CodeFix includes these safety mechanisms:**

- ✅ **Incremental Fixes**: One fix at a time with verification
- ✅ **Context-Aware Detection**: Avoids false positives
- ✅ **Conservative Auto-Fix**: Only truly safe fixes auto-applied
- ✅ **Verification After Each Fix**: Compilation + tests (if tests exist)
- ✅ **Project Rules**: Respects project conventions and style

**If verification fails, CodeFix stops immediately and reports the issue.**

---

**Version**: v2.2 (2026-01-27)  
**Changes**: 
- Removed test baseline gate (simplified, faster)
- Removed git checkpoint gate (user can commit manually if needed)
- Made auto-fix rules more conservative (context-aware detection)
- Added incremental fix application with verification after each fix
- Enhanced verification steps with concrete checks
- Added change impact analysis and dependency graph building
- Added project-specific rule loading
- Added fix provenance tracking
- Previous: Expert-level code review checks (PM UAT readiness), Composer-only policy  
**Purpose**: Automated code review and fix for code written by other LLMs/agents, ensuring production readiness with safety mechanisms
