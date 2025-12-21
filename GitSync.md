# GitSync — Push Local Changes to GitHub

> **Prompt for AI to sync local changes to your GitHub account**

---

## 🚨 CRITICAL: GitHub Account Rules

| Account | URL | Usage |
|---------|-----|-------|
| ✅ **Work Account** | `github.com/<WORK_USER>` | ALL pushes from work workspace |
| ❌ **Personal Account** | `github.com/<PERSONAL_USER>` | NEVER push here from work workspace |

**If in doubt, STOP and verify the remote before any push operation.**

---

## Setup (One-Time)

Before using this prompt, replace these placeholders with your values:

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `<WORKSPACE_PATH>` | Full path to your workspace | `/Users/jane/Projects` |
| `<WORK_USER>` | Your work GitHub username | `jane_corp` |
| `<PERSONAL_USER>` | Your personal GitHub (to avoid) | `janedoe` |

---

## Prompt

```
Sync my local changes to GitHub.

Context:
- Workspace: <WORKSPACE_PATH>
- GitHub Account: github.com/<WORK_USER> (work ONLY)
- Folder names = repo names (case insensitive)

Instructions:
1. For each folder with uncommitted changes:
   a. Verify remote is git@github.com:<WORK_USER>/<folder>.git
   b. If no remote, add it: git remote add origin git@github.com:<WORK_USER>/<folder>.git
   
2. Create branch and push:
   a. Create branch "sync-<timestamp>" from main
   b. Stage all changes
   c. Commit with message "chore: sync local changes"
   d. Push branch to origin

3. Create and merge PR:
   a. Create pull request
   b. Title: "Sync: <folder> local changes"
   c. Base: main, Head: sync-<timestamp>
   d. Auto-merge the PR immediately
   e. Delete the branch after merge

4. Repeat for all folders with changes

🚨 NEVER push to github.com/<PERSONAL_USER> (personal account)
```

---

## Detailed Workflow

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

### Step 2: Verify Remote (CRITICAL)

Before ANY push, verify the remote:

```bash
cd "<folder>"
git remote -v
# MUST show: origin git@github.com:<WORK_USER>/<folder>.git
# If wrong or missing, fix it:
git remote remove origin 2>/dev/null
git remote add origin git@github.com:<WORK_USER>/<folder>.git
```

### Step 3: Create Branch and Push

```bash
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BRANCH="sync-$TIMESTAMP"

git checkout -b "$BRANCH"
git add .
git commit -m "chore: sync local changes"
git push -u origin "$BRANCH"
```

### Step 4: Create PR

Use GitHub CLI or web interface:

```bash
gh pr create --title "Sync: <folder> local changes" --base main --head "$BRANCH" --body "Automated sync of local changes."
```

### Step 5: Merge PR

```bash
gh pr merge <pr-number> --merge --delete-branch
```

---

## Quick Sync Command

For a single folder:

```
Sync <FolderName> to GitHub:
1. Verify remote → <WORK_USER>/<FolderName>
2. Create branch sync-<timestamp>
3. Commit all changes
4. Push to origin
5. Create and merge PR
6. Delete branch
```

---

## Batch Sync All Folders

```
Sync ALL folders with changes to GitHub:

For each folder in <WORKSPACE_PATH>:
- Skip if no .git directory
- Skip if no uncommitted changes
- Skip docs repos if manual sync preferred
- Process all project folders

Report summary: which folders synced, which failed.
```

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

## Folder → Repo Mapping

| Local Folder | GitHub Repo |
|--------------|-------------|
| `<FolderA>/` | `<WORK_USER>/<FolderA>` |
| `<FolderB>/` | `<WORK_USER>/<FolderB>` |
| `<FolderC>/` | `<WORK_USER>/<FolderC>` |

> **Note:** Update this table with your actual folder names.

---

## Error Handling

| Error | Resolution |
|-------|------------|
| Remote points to personal account | **STOP** — Fix remote to work account |
| Branch already exists | Delete old branch, create new with unique timestamp |
| PR merge conflict | Alert user, do not auto-merge |
| Auth failure | Check GitHub credentials |

---

## Safety Checks (Built-in)

1. **Before every push:** Verify `git remote -v` shows work account
2. **Never force push:** Always use `git push` (not `git push -f`)
3. **Never push to main directly:** Always use PR workflow
4. **Alert on personal repo:** If remote contains personal account, abort immediately

---

**Last Updated:** 2025-12-21
