# GitSync — Push Local Changes to GitHub

> **Autonomous git sync workflow for any LLM interface in Cursor (Composer, Chat, inline edits)**
> 
> **For:** Solo builders, indie developers, personal projects

---

## 🚨 CRITICAL: Verify Your GitHub Account

Before any push, verify the remote matches YOUR account:

```bash
git remote -v
# Should show: origin git@github.com:<YOUR_USERNAME>/<repo>.git
```

**If you have multiple GitHub accounts** (work + personal), ensure you're pushing to the correct one for this workspace.

---

## Quick Setup (One-Time)

Replace these placeholders with your values:

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `<WORKSPACE_PATH>` | Full path to your workspace | `/Users/jane/Projects` |
| `<YOUR_USERNAME>` | Your GitHub username | `janedoe` |
| `<YOUR_EMAIL>` | Your GitHub email | `jane@example.com` |

---

## AI Agent Instructions

**Invocation:** User says "Sync my local changes to GitHub" or references this file

**Context:**
- Workspace: `<WORKSPACE_PATH>`
- GitHub Account: `github.com/<YOUR_USERNAME>`
- Folder names = repo names (case insensitive)

**Execution Steps:**
1. Identify folders with uncommitted changes
2. For each folder:
   - Verify remote: `git remote -v` must show `git@github.com:<YOUR_USERNAME>/<folder>.git`
   - If no remote, add: `git remote add origin git@github.com:<YOUR_USERNAME>/<folder>.git`
   - Stage changes: `git add -A`
   - Commit: `git commit -m "chore: sync local changes"`
   - Push: `git push origin main`
3. Use `run_terminal_cmd` tool to execute commands autonomously
4. Report: List synced folders and any errors

**Critical Rules:**
- ❌ NEVER push if remote doesn't match expected account
- ✅ Direct push to main is AUTHORIZED for solo projects
- ✅ Use PR workflow only if user explicitly requests it

**This applies to ALL LLM interfaces:** Composer, Chat, inline edits, any AI agent in Cursor

---

## Default Workflow (Direct Push - FASTEST)

### Step 1: Identify Folders with Changes

```bash
cd "<WORKSPACE_PATH>"
for dir in */; do
  if [ -d "$dir/.git" ]; then
    cd "$dir"
    if [ -n "$(git status --porcelain)" ]; then
      echo "📁 $dir has uncommitted changes"
    fi
    cd ..
  fi
done
```

### Step 2: Verify Remote

Before ANY push, verify the remote:

```bash
cd "<folder>"
git remote -v
# MUST show: origin git@github.com:<YOUR_USERNAME>/<folder>.git
# If wrong or missing, fix it:
git remote remove origin 2>/dev/null
git remote add origin git@github.com:<YOUR_USERNAME>/<folder>.git
```

### Step 3: Push Directly to Main

```bash
cd "<folder>"
git add -A
git commit -m "chore: sync local changes"
git push origin main
```

**That's it!** ✅ No branch creation, no PR, no manual merge.

**Why direct push?** For solo projects, the PR workflow adds overhead without benefit. Save PRs for collaborative repos.

---

## Quick Sync (Single Folder)

**AI Agent Action:** When user specifies single folder to sync

**Command:**
```bash
cd "<FolderName>" && git add -A && git commit -m "chore: sync" && git push origin main
```

**Execution:**
- Replace `<FolderName>` with actual folder path
- Run via `run_terminal_cmd` tool
- Report result: "✅ <FolderName> synced to GitHub"

---

## Batch Sync (All Folders)

**AI Agent Action:** When user says "sync all" or "batch sync"

**Command:**
```bash
cd "<WORKSPACE_PATH>"
for dir in */; do
  if [ -d "$dir/.git" ]; then
    cd "$dir"
    if [ -n "$(git status --porcelain)" ]; then
      echo "📁 Syncing $dir..."
      git add -A
      git commit -m "chore: sync local changes"
      git push origin main && echo "✅ $dir synced" || echo "❌ $dir failed"
    fi
    cd "<WORKSPACE_PATH>"
  fi
done
```

**Execution:**
- Run entire command via `run_terminal_cmd` tool (one approval, syncs all folders)
- Report summary: List synced folders and any errors

---

## Alternative Workflow (PR for Collaboration)

**AI Agent Action:** Only use when user explicitly requests PR workflow

**When to Use:**
- User says "create PR" or "use PR workflow"
- Repository has multiple contributors
- Change requires review before merge

**Step 1 - Create Branch and Push:**
```bash
cd "<folder>"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
git checkout -b "sync-$TIMESTAMP"
git add -A
git commit -m "chore: sync local changes"
git push -u origin "sync-$TIMESTAMP"
```

**Step 2 - Create and Auto-Merge PR:**
```bash
gh pr create --title "Sync: local changes" --body "Auto-sync from local" --base main
gh pr merge --merge --delete-branch --auto
```

**Note:** Default workflow (direct push) is preferred for solo work.

---

## Verification After Sync

```bash
cd "<WORKSPACE_PATH>"
for dir in */; do
  if [ -d "$dir/.git" ]; then
    cd "$dir"
    STATUS=$(git status --porcelain)
    if [ -z "$STATUS" ]; then
      echo "✅ $dir - clean"
    else
      echo "⚠️  $dir - has changes"
    fi
    cd ..
  fi
done
```

---

## Error Handling

| Error | Resolution |
|-------|------------|
| Remote doesn't match expected account | **STOP** — Fix remote to correct account |
| Auth failure (permission denied) | Check SSH keys or GitHub credentials |
| Push rejected (non-fast-forward) | Pull first: `git pull origin main --rebase` |
| Commit fails (wrong email) | Run: `git config user.email "<YOUR_EMAIL>"` |
| Branch already exists | Delete old branch: `git branch -D <branch>` |

---

## Safety Checks (Built-in)

1. **Before every push:** Verify `git remote -v` shows expected account
2. **Never force push:** Always use `git push` (not `git push -f`)
3. **Direct push to main is ALLOWED:** Solo projects, no PR overhead needed
4. **Verify git identity:** Commits should use your email

---

## Git Identity Setup

Verify git identity is configured:

```bash
git config user.email  # Should show your email
git config user.name   # Should show your username
```

**Fix if wrong:**
```bash
git config user.email "<YOUR_EMAIL>"
git config user.name "<YOUR_USERNAME>"
```

**Set globally (applies to all repos):**
```bash
git config --global user.email "<YOUR_EMAIL>"
git config --global user.name "<YOUR_USERNAME>"
```

---

## Multiple GitHub Accounts

If you have multiple GitHub accounts (work + personal), you may need to switch contexts:

**Check current gh CLI account:**
```bash
gh auth status
```

**Switch accounts:**
```bash
gh auth switch --user <USERNAME>
```

**Add new account:**
```bash
gh auth login
```

---

## When to Use Direct Push vs PR

| Scenario | Recommended |
|----------|-------------|
| Solo project, only contributor | ✅ Direct push |
| Personal portfolio/hobby project | ✅ Direct push |
| Documentation updates | ✅ Direct push |
| Shared repo with team | ⚠️ PR workflow |
| Open source with contributors | ⚠️ PR workflow |
| Production deployments | ⚠️ PR workflow |

---

## Summary

**Streamlined for autonomous execution with minimal intervention:**
- ✅ Default: Push directly to main (~5 seconds per folder)
- ✅ Alternative: PR workflow for collaboration (optional)
- ✅ Batch sync: One command syncs all folders
- ✅ Works with any LLM interface in Cursor

**Philosophy:** For solo builders, speed matters. Direct push eliminates unnecessary overhead while maintaining safety checks.

---

**Last Updated:** 2026-01-07  
**For:** Solo builders, indie developers, personal projects
