# Configuration Alignment Agent

> **Purpose:** Maintain consistency between `.cursorrules`, `CLAUDE.md`, and `create-project.sh`
> - Track all sync points across the three files
> - Provide update checklists when changes are made
> - Ensure new projects inherit correct defaults

## 🎯 Scope

This agent ensures alignment between:
1. **`.cursorrules`** - Cursor IDE rules (enforcement, policies)
2. **`CLAUDE.md`** - Workspace context for AI assistants (technical details, commands)
3. **`create-project.sh`** - Project scaffolding script (templates, defaults)

## 📋 Sync Points Matrix

| Area | .cursorrules | CLAUDE.md | create-project.sh | Notes |
|------|--------------|-----------|-------------------|-------|
| **Account Scope** | ✅ Lines 3-7 | ✅ Lines 9-14 | ✅ Lines 6-9, 688-689 | CRITICAL: Must match exactly |
| **Core Policy** | ✅ Lines 9-16 | ⚠️ Implied | ✅ Lines 217-259 (.gitignore) | Secrets, .env, gitignore rules |
| **Four Canonical Files** | ✅ Lines 28-64 | ✅ Lines 105-179 | ✅ Lines 501-678 | Templates must match |
| **Testing Policy** | ✅ Lines 71-99 | ✅ Lines 181-222 | ✅ Lines 316-327, 477-486 | Autonomous testing rules |
| **Tech Stack Defaults** | ⚠️ Implied | ✅ Lines 66-98 | ✅ Lines 262-498 (CLAUDE.md templates) | Next.js, TS, Tailwind, Supabase |
| **Git Workflow** | ✅ Line 68 | ✅ Lines 30-40 | ⚠️ Implied | GitHub = source of truth |
| **Environment Variables** | ✅ Lines 11-12 | ✅ Lines 51-58 | ✅ Lines 185-215 | Root vs project .env |
| **Documentation Modes** | ✅ Lines 18-64 | ✅ Lines 100-179 | ✅ Lines 501-678 | Mode A vs Mode B |

**Legend:** ✅ Explicit | ⚠️ Implied/Referenced

## 🔄 Update Workflow

When updating any configuration, follow this process:

### Step 1: Identify Change Type

**A. Account/Scope Change** (CRITICAL)
- Affects: `.cursorrules` → `CLAUDE.md` → `create-project.sh`
- Examples: GitHub org, Vercel account, email addresses

**B. Policy Change**
- Affects: `.cursorrules` → `CLAUDE.md` → `create-project.sh` (if templates change)
- Examples: Git workflow, testing rules, documentation requirements

**C. Tech Stack Change**
- Affects: `CLAUDE.md` → `create-project.sh` (CLAUDE.md templates)
- Examples: Framework version, new dependencies, tool choices

**D. Template Change**
- Affects: `CLAUDE.md` → `create-project.sh` (file templates)
- Examples: PLAN.md structure, BUILD_LOG.md format, .gitignore entries

### Step 2: Update Checklist

For each change type, verify:

#### Account/Scope Changes
- [ ] `.cursorrules` lines 3-7 (Account Scope section)
- [ ] `CLAUDE.md` lines 9-14 (Account Scope & MCP section)
- [ ] `create-project.sh` lines 6-9 (header comment)
- [ ] `create-project.sh` lines 688-689 (GitHub reminder)
- [ ] `create-project.sh` line 713 (remote URL format)

#### Policy Changes
- [ ] `.cursorrules` Core Policy section (lines 9-16)
- [ ] `CLAUDE.md` Workspace Structure (lines 16-20) if folder structure changes
- [ ] `create-project.sh` .gitignore template (lines 217-259) if ignore rules change
- [ ] `create-project.sh` .env.example templates (lines 185-215) if env vars change

#### Four Canonical Files
- [ ] `.cursorrules` lines 28-64 (file definitions and enforcement)
- [ ] `CLAUDE.md` lines 105-179 (templates section)
- [ ] `create-project.sh` PLAN.md template (lines 501-556)
- [ ] `create-project.sh` BUILD_LOG.md template (lines 558-586)
- [ ] `create-project.sh` PIVOTS.md template (lines 588-619)
- [ ] `create-project.sh` ARCHITECTURE.md template (lines 621-678)

#### Testing Policy
- [ ] `.cursorrules` lines 71-99 (Autonomous Testing section)
- [ ] `CLAUDE.md` lines 181-222 (Autonomous Testing Policy section)
- [ ] `create-project.sh` Testing sections in CLAUDE.md templates:
  - [ ] Basic mode (lines 316-327)
  - [ ] AI mode (lines 477-486)

#### Tech Stack Defaults
- [ ] `CLAUDE.md` Tech Stack Defaults section (lines 66-98)
- [ ] `create-project.sh` CLAUDE.md templates:
  - [ ] Basic mode tech stack (lines 272-275)
  - [ ] AI mode tech stack (lines 353-362)
- [ ] `create-project.sh` .env.example templates (lines 185-215) if dependencies change

## 🔍 Detailed Sync Points

### 1. Account Scope

**Current Values:**
- GitHub: `github.com/mostly-coherent/*` ✅
- Vercel: `vercel.com/jmbeh` ✅
- Git Email: `behjianming@gmail.com` ✅
- NEVER: `github.com/beh_adobe/*` or `vercel.com/aup-commerce` ✅

**Files to Update:**
```bash
# .cursorrules (lines 3-7)
## 🚨 CRITICAL: Account Scope
- ✅ `github.com/mostly-coherent/*` + `vercel.com/jmbeh` (Personal only)
- ❌ `github.com/beh_adobe/*` + `vercel.com/aup-commerce` (Adobe - NEVER)
- **Git:** `behjianming@gmail.com` | Public GitHub MCP only
- **Deploy:** Only push when explicitly requested (auto-deploys to Vercel)

# CLAUDE.md (lines 9-14)
## 🚨 CRITICAL: Account Scope & MCP
- **Use:** `github.com/mostly-coherent/*` + `vercel.com/jmbeh` (Personal) | Public GitHub MCP
- **NEVER:** `github.com/beh_adobe/*` + `vercel.com/aup-commerce` (Adobe workspace)
- **Deploy:** Push only when requested (auto-deploys to Vercel)
- **MCP Issues:** Too many servers enabled → Disable unused ones in Cursor settings
- **Git:** `behjianming@gmail.com` | Format: `git@github.com:mostly-coherent/{project}.git`

# create-project.sh (lines 6-9, 688-689, 713)
# 🚨 CRITICAL: This is for PERSONAL PROJECTS only
# - Syncs to: github.com/mostly-coherent (Personal portfolio account)
# - Use Public GitHub MCP or standard git commands
# - NEVER use Adobe GitHub (github.com/beh_adobe) or Corp_GitHub MCP
```

### 2. Four Canonical Files

**Current Structure:**
- PLAN.md (Blueprint - WHAT)
- BUILD_LOG.md (Journal - WHEN)
- PIVOTS.md (Decisions - WHY)
- ARCHITECTURE.md (System Architecture - HOW)

**Files to Update:**
- `.cursorrules` lines 28-64: Definitions and enforcement rules
- `CLAUDE.md` lines 105-179: Template examples
- `create-project.sh` lines 501-678: Actual templates generated

**Verification:**
```bash
# Check that all three files reference the same 4 files
grep -n "PLAN.md\|BUILD_LOG.md\|PIVOTS.md\|ARCHITECTURE.md" .cursorrules CLAUDE.md create-project.sh
```

### 3. Testing Policy

**Current Rules:**
- Autonomous testing authorized (no approval required)
- E2E: Playwright via terminal (`npm test`)
- Browser MCP: Ad-hoc only
- Test after every feature

**Files to Update:**
- `.cursorrules` lines 71-99
- `CLAUDE.md` lines 181-222
- `create-project.sh` Testing sections (basic: 316-327, AI: 477-486)

**Verification:**
```bash
# Check that testing commands match
grep -n "npm test\|npm run test" .cursorrules CLAUDE.md create-project.sh
```

### 4. Tech Stack Defaults

**Current Stack:**
- Framework: Next.js 14+ (App Router)
- Language: TypeScript (strict mode)
- Styling: TailwindCSS
- Database: Supabase (PostgreSQL + pgvector)
- Deploy: Vercel
- LLM: Anthropic Claude (primary), OpenAI (fallback)
- Observability: Langfuse

**Files to Update:**
- `CLAUDE.md` lines 66-98 (Tech Stack Defaults section)
- `create-project.sh` CLAUDE.md templates:
  - Basic mode: lines 272-275
  - AI mode: lines 353-362

**Verification:**
```bash
# Check framework version consistency
grep -n "Next.js\|TypeScript\|Tailwind" CLAUDE.md create-project.sh
```

### 5. Environment Variables

**Current Structure:**
- Root `.env`: Workspace tools only (MCP servers, Vercel CLI)
- Project `.env.local`: Project-specific secrets

**Files to Update:**
- `.cursorrules` lines 11-12
- `CLAUDE.md` lines 51-58
- `create-project.sh` .env.example templates (lines 185-215)

**Verification:**
```bash
# Check env var naming consistency
grep -n "NEXT_PUBLIC_\|ANTHROPIC_\|OPENAI_\|SUPABASE_" CLAUDE.md create-project.sh
```

## 🛠️ Maintenance Commands

### Verify Alignment

```bash
# Check account scope consistency
grep -n "mostly-coherent\|beh_adobe\|jmbeh\|aup-commerce" .cursorrules CLAUDE.md create-project.sh

# Check canonical files consistency
grep -n "PLAN.md\|BUILD_LOG.md\|PIVOTS.md\|ARCHITECTURE.md" .cursorrules CLAUDE.md create-project.sh | sort

# Check testing policy consistency
grep -n "npm test\|Autonomous Testing\|NO APPROVAL" .cursorrules CLAUDE.md create-project.sh

# Check tech stack consistency
grep -n "Next.js 14\|TypeScript.*strict\|TailwindCSS\|Supabase" CLAUDE.md create-project.sh
```

### Update All Three Files

When making changes, use this workflow:

```bash
# 1. Make change to source file (usually .cursorrules or CLAUDE.md)
# 2. Update corresponding sections in other files
# 3. Verify with grep commands above
# 4. Test create-project.sh generates correct templates
./create-project.sh test-alignment --skip-github
cd test-alignment
cat PLAN.md BUILD_LOG.md PIVOTS.md ARCHITECTURE.md CLAUDE.md | grep -i "test\|next.js\|typescript"
cd ..
rm -rf test-alignment
```

## 📝 Change Log Template

When updating configuration, document changes:

```markdown
## Change: [Description] - YYYY-MM-DD

**Type:** [Account/Policy/Tech Stack/Template]

**Files Updated:**
- `.cursorrules`: [line numbers, what changed]
- `CLAUDE.md`: [line numbers, what changed]
- `create-project.sh`: [line numbers, what changed]

**Rationale:** [Why this change was made]

**Impact:** [What projects/processes are affected]

**Verification:** [How to verify the change]
```

## 🚨 Critical Sync Points (Never Miss)

1. **Account Scope** - Wrong values = wrong repos deployed
2. **Four Canonical Files** - Template mismatch = inconsistent docs
3. **Testing Policy** - Command mismatch = broken test instructions
4. **.gitignore Rules** - Missing entries = secrets committed

## ✅ Pre-Commit Checklist

Before committing changes to these files:

- [ ] All three files updated for the change type
- [ ] Account scope matches exactly (if changed)
- [ ] Canonical file templates match (if changed)
- [ ] Testing commands match (if changed)
- [ ] Tech stack versions match (if changed)
- [ ] Tested `create-project.sh` generates correct templates
- [ ] Verified grep commands show consistency

## 🔗 Related Files

- `Helpful Agents/GitSync.md` - Git workflow details
- `env_setup_template.md` - Environment variable reference
- Root `.gitignore` - Workspace-level ignore rules

---

**Last Updated:** 2025-01-30  
**Maintained By:** Configuration Alignment Agent  
**Review Frequency:** Before any changes to `.cursorrules`, `CLAUDE.md`, or `create-project.sh`

