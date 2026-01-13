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

### Phase 0: Pre-Flight Checks (CRITICAL)

**Rule**: Code must compile before it can be reviewed. Stop immediately if compilation fails.

1. **Compilation Check**:
   ```bash
   # TypeScript/JavaScript
   npx tsc --noEmit
   npm run lint
   
   # Python
   python3 -m py_compile <files>
   ```

2. **If compilation fails**: Fix syntax/import errors immediately before proceeding.

### Phase 1: Static Analysis

1. Read all relevant source files (scope based on usage)
2. Analyze code structure and dependencies
3. Check for patterns from the review checklist
4. Identify issues and categorize by severity

### Phase 2: Issue Prioritization

| Severity | Criteria | Action |
|----------|----------|--------|
| **Critical** | Code doesn't compile, runtime crashes, data loss risk | Fix immediately |
| **High** | Bugs that break functionality, security issues | Fix automatically if high confidence |
| **Medium** | Logic errors, missing error handling, performance issues | Fix automatically if straightforward |
| **Low** | Code quality, best practices, optimizations | Report and suggest fixes |

### Phase 3: Automated Fixes

**Auto-Fix Rules**:

✅ **Fix Automatically** (High Confidence):
- Syntax errors
- Missing null checks (`obj.property` → `obj?.property`)
- Missing `await` on async calls
- Missing error handling (add try-catch)
- Missing `key` props in React lists
- Unused imports/variables
- Missing TypeScript types (simple cases)
- Missing dependencies in `useEffect`
- Direct state mutations (React)
- Missing `.catch()` on promises

⚠️ **Report Only** (Requires Context):
- Business logic changes
- Architectural decisions
- API endpoint changes
- Database schema changes
- Changes affecting multiple files
- Performance optimizations requiring testing

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

### Phase 5: Verification

After fixes:
1. Re-run compilation checks
2. Verify fixes don't break existing functionality
3. Check for new issues introduced by fixes
4. Run tests if available
5. Verify PM UAT readiness checklist (Phase 4)

---

## Output Format

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
⚠️ Tests: 2 tests failing (unrelated to fixes)
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

1. **Compile First**: Code must compile before review
2. **Fix Confidently**: Auto-fix high-confidence issues immediately
3. **Report Uncertainties**: Flag issues requiring human judgment
4. **Verify Fixes**: Re-check compilation and tests after fixes
5. **Preserve Intent**: Don't change functionality, only fix bugs
6. **Trace Issues**: Document what was wrong and why it was fixed

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

All fixes verified. Compilation passes.
```

---

**Version**: v1.1 (2026-01-27)  
**Changes**: Added expert-level code review checks (PM UAT readiness), Composer-only policy  
**Purpose**: Automated code review and fix for code written by other LLMs/agents, ensuring production readiness
