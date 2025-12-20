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

Best for: Cloned projects, multi-service dev setups, bootstrapping local dev quickly.

```
@Generate-server-scripts.md @valetudo-ai
```

You get:
- One-command startup with health checks
- Graceful stop with force-kill fallback
- Status check with color-coded output
- Works across stacks (React, Flask, Next.js, Django, etc.)

See [Server_Scripts/README.md](Server_Scripts/README.md) for full documentation.

### GitSync.md
**Push local changes to GitHub with PR workflow.**

Automates: verify remote → create branch → commit → push → create PR → merge.

### Debug.md
**Systematic debugging prompt for when things break.**

Works through: reproduce → isolate → hypothesize → test → fix.

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

Most "prompt engineering" content is either too abstract or too specific to someone else's workflow. These prompts evolved from real projects—debugging sessions, multi-service setups, git workflows that actually work. Sharing them exactly as I use them, warts and all.

## 🔮 What's Next

Adding prompts for: structured code reviews, PR descriptions, project scaffolding, and README refinement (meta!). The goal is a complete toolkit for shipping solo projects faster.

---

**Status:** Active  
**Repo:** `github.com/mostly-coherent/Helpful-Prompts`
