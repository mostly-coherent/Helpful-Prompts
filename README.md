# 📝 Helpful Prompts

**The actual system prompts and workflows I use to code agentically.** I decided to build in public to show exactly how I partner with AI to move fast.

---

## 🚀 Quick Start

In Cursor Chat, reference any prompt with `@`:

```
@Generate-server-scripts.md @your-project-folder
```

Or open the `.md` file and copy the prompt directly.

---

## 📂 What's Inside

### Server_Scripts/
**Auto-generate `start-servers.sh`, `stop-servers.sh`, and `check-servers.sh` for any project.**

**The problem it solves:** You clone someone's project or switch between multiple local projects. You waste 15 minutes figuring out what ports they use, which terminal has what running, whether you need to start Postgres first or the backend will crash. Or you return to a project after weeks away and have no idea what the startup sequence is.

**When to use it:**
- You're working on 3+ projects and context-switching constantly
- You cloned a project without clear setup docs
- You have multi-service architecture (frontend + backend + database)
- You forgot what you had running and ports are conflicting

**When NOT to use it:**
- Single-service Next.js app where `npm run dev` is enough
- You already have docker-compose (use that instead)
- The project has mature scripts already (don't replace working systems)

**Real impact:** Turns "What ports does this use? Is the backend already running? Why won't this start?" into `./start-servers.sh` and you're coding in 30 seconds.

See [Server_Scripts/README.md](Server_Scripts/README.md) for full documentation.

### GitSync.md
**Push local changes to GitHub with PR workflow.**

**The problem it solves:** You're working solo but want to maintain PR hygiene (for portfolio, for practice, or because you'll have teammates later). The manual workflow is: create branch, stage, commit, push, open GitHub, create PR, click merge, delete branch, switch back to main, pull, delete local branch. For 6 files changed. Every time. You start skipping PRs and pushing to main because it's tedious.

**When to use it:**
- Solo projects where you want PR discipline without the busywork
- Syncing multiple project folders in your workspace at once
- You're building in public and want clean git history

**When NOT to use it:**
- Complex branch strategies with multiple long-lived branches
- Team projects where PR descriptions need context and review is real
- You need to carefully craft commit messages (this generates generic ones)

**Real impact:** Maintains the habit of PR-based development without the friction that makes you abandon it.

### Debug.md
**Systematic debugging prompt for when things break.**

**The problem it solves:** You're stuck. The bug makes no sense. You've been staring at the same 20 lines for an hour, making random changes hoping something works. You're in the "debugging by intuition and prayer" phase. You need to slow down and be methodical but your brain won't cooperate.

**When to use it:**
- You've been debugging for >30 minutes with no progress
- The issue is intermittent and you can't nail down reproduction steps
- You're working in an unfamiliar codebase or stack
- You need accessibility/performance audit across the whole project

**When NOT to use it:**
- Simple typos or obvious syntax errors (just fix them)
- You already know the root cause and just need to implement the fix
- First debugging attempt (try manual debugging first, build your intuition)

**Real impact:** Forces systematic thinking when you're spiraling. The structured format breaks you out of "change random things" mode. Also catches accessibility issues you'd never spot manually (color contrast ratios, missing ARIA labels).

### Privacy-Security.md
**Prepare your workspace for public GitHub sharing.**

**The problem it solves:** You built a project in private with your personal file paths, email addresses, API keys, and private notes scattered everywhere. Now you want to share it publicly or add it to your portfolio. You need to audit everything but manually searching is error-prone—you'll miss something and it'll be embarrassing or worse.

**When to use it:**
- One-time cleanup before open-sourcing a private project
- Setting up privacy patterns for a new workspace
- You're about to add collaborators and need to ensure no secrets are committed

**When NOT to use it:**
- Project was built to be public from day 1 (already following best practices)
- You're working in a fully isolated environment with no personal info
- It's a throwaway prototype you'll never share

**Real impact:** Prevents the "oh no I committed my API key" post-mortem. One audit catches personal file paths, hardcoded credentials, and email addresses you forgot were in config files.

---

## 🧭 How to Choose

**"I just cloned a project and don't know how to start it."**  
→ `@Server_Scripts/Generate-server-scripts.md` + the project folder

**"I have changes to push but the PR workflow is tedious."**  
→ `@GitSync.md` (after customizing with your GitHub account)

**"Something's broken and I've been stuck for 30+ minutes."**  
→ `@Debug.md` + describe what's broken

**"I want to open-source this private project."**  
→ `@Privacy-Security.md` to audit for personal info and secrets

**"None of these match my problem."**  
→ These prompts solve specific friction points. If you're not feeling the pain, you don't need them. Build your own prompt when you hit the same annoying issue 3+ times.

---

## 🎯 Usage Pattern

1. **Find the prompt** you need in this folder
2. **Reference it** in Cursor Chat with `@filename.md`
3. **Add context** by also referencing your project folder: `@your-project`
4. **Customize** the generated output as needed

Most prompts are designed to be self-contained—just reference and run.

---

## 📝 Adding New Prompts

Keep prompts:
- **Single-purpose** — One clear task per file
- **Self-documenting** — Include usage examples in the prompt
- **Copy/paste safe** — Clean command blocks, no inline comments

---

## 💭 Why Build in Public?

Most "prompt engineering" content is either too abstract ("here's a theory about AI prompting") or too specific to someone else's workflow ("here's my 47-step morning routine with AI"). These prompts evolved from actual friction points—cloning a project and wasting 20 minutes figuring out how to start it, wanting PR discipline but hating the busywork, debugging for an hour with no progress and needing to slow down.

I'm sharing them exactly as I use them because the value is in the **specificity**. Not "here's how to think about prompts" but "copy this, attach your project, get scripts that actually work."

## 🎯 Philosophy

**Solve real friction, not hypothetical problems.** Every prompt here exists because I hit the same annoying issue 3+ times and decided to systematize the solution. If you're not feeling the pain it solves, you don't need it.

**Trade-offs over silver bullets.** Server scripts add complexity. GitSync generates generic commit messages. Debug audits can be overwhelming. I use them anyway because the trade-off is worth it for my workflow. Might not be for yours—that's fine.

**Steal and modify.** These work for solo development on 3-6 simultaneous projects with multi-service architecture. Your context is different. Adapt them. The format matters less than the underlying automation pattern.

## 🔮 What's Next

Adding prompts as real problems arise: structured code reviews when I'm reviewing my own code and missing obvious issues, PR descriptions when I want better commit history without manual effort, project scaffolding when I'm tired of copy-pasting the same Next.js + Supabase setup.

The goal isn't a comprehensive library. It's a toolkit for **my** most frequent friction points, shared in case they're yours too.

**Note:** I have more prompts I use at Adobe (synthesis workflows, repository mapping, architecture decision records), but they're workspace-specific and wouldn't make sense out of context. Happy to discuss the patterns behind them if you want to build something similar for your workflow.

---

**Status:** Active  
**Repo:** `github.com/mostly-coherent/Helpful-Prompts`
