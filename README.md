# Helpful Agents

> Reusable AI agents for development and documentation—use them directly in Cursor with `@agent-name.md` syntax. No copy-pasting needed.

![Type](https://img.shields.io/badge/Type-AI%20Agents-purple)
![Status](https://img.shields.io/badge/Status-Active-green)
![Stack](https://img.shields.io/badge/Stack-Cursor%20%7C%20Claude-blue)

## 🚀 Quick Start

**These are Cursor agents—use them with `@` syntax:**

```bash
# In Cursor chat, reference the agent file directly:
@Debug.md on this project
@Cleanup-folder.md on Inspiration/
@Requirement_Agent.md create a Builder Brief for [project name]
```

**That's it.** Cursor loads the agent instructions automatically. You don't need to copy-paste anything.

### First-Time Setup

1. **Clone or download** this repo
2. **In Cursor**, reference agents by their file path:
   - `@Helpful Agents/Debug.md` (if outside the folder)
   - `@Debug.md` (if you're already in the Helpful Agents folder)
3. **Add context** after the agent name:
   - `@Debug.md on ./my-project`
   - `@Cleanup-folder.md on ./Inspiration`

**Example workflow:**
```
You: @Debug.md on ./Allegro
Cursor: [Runs full debug audit using agent instructions]
```

---

<details>
<summary>✨ Available Agents</summary>

### 🐛 Code & Development
- **[Debug.md](Debug.md)** — Full project audit (bugs, performance, accessibility)
- **[ReArchitecture.md](ReArchitecture.md)** — Architecture refactoring and redesign

### 📄 Documentation
- **[README-project-template.md](README-project-template.md)** — Generic project README template
- **[README-project-refine-prompt.md](README-project-refine-prompt.md)** — Polish existing READMEs
- **[Format.md](Format.md)** — Markdown style normalization
- **[OptimizeDoc.md](OptimizeDoc.md)** — Lossless distillation for clarity
- **[ReviseDoc.md](ReviseDoc.md)** — Light-touch refinement
- **[Cleanup-folder.md](Cleanup-folder.md)** — Harmonize project docs to canonical structure
- **[BusinessGuide.md](BusinessGuide.md)** — Technical → business-friendly translation

### 📝 Requirements & Planning
- **[Requirement_Agent.md](Requirement_Agent.md)** — Create or update PRDs and Builder Briefs
- **[Critique_Agent.md](Critique_Agent.md)** — Structured feedback on requirements
- **[Builder_Template.md](Builder_Template.md)** — Lightweight prototype-driven briefs
- **[PRD_Template.md](PRD_Template.md)** — Comprehensive requirements template

- **[ListQuestions.md](ListQuestions.md)** — Extract open questions from docs
- **[ListConflicts.md](ListConflicts.md)** — Extract conflicting facts

### 🚀 DevOps & Infrastructure
- **[Server_Scripts/Generate-server-scripts.md](Server_Scripts/Generate-server-scripts.md)** — Generate start/stop/check scripts for multi-service projects
- **[GitSync.md](GitSync.md)** — Safe git sync workflow

### 🔒 Security & Privacy
- **[Workspace_Privacy_Optimization.md](Workspace_Privacy_Optimization.md)** — Prep workspace for GitHub sharing
- **[Privacy-Security.md](Privacy-Security.md)** — Privacy and security best practices

</details>

<details>
<summary>⚙️ How Cursor Agents Work</summary>

### The `@` Syntax

When you type `@filename.md` in Cursor chat, Cursor:
1. **Reads the file** and treats it as agent instructions
2. **Executes the agent** using those instructions
3. **Applies it** to whatever you specify after

### Why Not Copy-Paste?

**Don't do this:**
```
You: [Copy entire Debug.md content]
      Run this on my project
```

**Do this instead:**
```
You: @Debug.md on ./my-project
```

**Benefits:**
- ✅ Agent stays in sync (updates automatically)
- ✅ Less clutter in chat
- ✅ Cursor can reference the file directly
- ✅ Easier to discover and reuse agents

### Targeting Objects

After the agent name, specify what to act on:

```
@Debug.md on ./Allegro              # Run on a folder
@Cleanup-folder.md on Inspiration/  # Clean up a project
@Format.md on README.md              # Format a specific file
@Requirement_Agent.md create PRD for new feature  # Create something new
```

### Path Resolution

- **Relative paths:** `@Debug.md` (if in Helpful Agents folder)
- **Absolute paths:** `@Helpful Agents/Debug.md` (from anywhere)
- **File references:** `@./Debug.md` (explicit relative)

</details>

<details>
<summary>🔄 Common Workflows</summary>

| Need | Agent Sequence | Example |
|------|----------------|---------|
| **New project** | README template → Refine | `@README-project-template.md` then `@README-project-refine-prompt.md` |
| **Requirements** | Requirement → Critique | `@Requirement_Agent.md create Builder Brief` then `@Critique_Agent.md review` |
| **Doc cleanup** | Optimize → Revise → Format | `@OptimizeDoc.md` → `@ReviseDoc.md` → `@Format.md` |
| **Code quality** | Debug audit | `@Debug.md on ./project` |
| **Doc harmonization** | Cleanup folder | `@Cleanup-folder.md on ./project` |

</details>

<details>
<summary>📚 Writing Your Own Agents</summary>

### Agent Design Principles

1. **Single, clear purpose** — One agent = one job
2. **Well-scoped** — Clear inputs, outputs, and boundaries
3. **Self-contained** — All instructions in one file
4. **Action-oriented** — Tells the AI what to do, not just what to know

### Example Structure

```markdown
# Agent Name

> **Purpose:** [One sentence]
> **Usage:** @Agent-Name.md on [target]

## Step 1: [What to do]
[Clear instructions]

## Step 2: [What to do next]
[Clear instructions]

## Expected Output
[What success looks like]
```

### Testing Your Agent

1. Write the agent file
2. Test in Cursor: `@YourAgent.md on test-target`
3. Refine based on results
4. Share if it's reusable!

</details>

<details>
<summary>🛡️ Safety & Best Practices</summary>

- ✅ **Review outputs** before committing auto-fixes
- ✅ **Test on small scope** first (single file/folder)
- ✅ **Verify git remotes** before pushing
- ✅ **Check .gitignore** before creating files
- ❌ **Never commit secrets** or personal info
- ❌ **Don't run destructive agents** without backups

### Customization

Agents use placeholders you can customize:
- `<WORKSPACE_PATH>` — Your workspace root
- `<WORK_USER>` — Your username
- `{{PLATFORM_NAME}}` — Platform-specific values

Replace these with your actual values when using agents.

</details>

<details>
<summary>💡 About These Agents</summary>

**What they are:** Generic, reusable AI agents anyone can customize. No personal paths, no hardcoded accounts, no secrets.

**What they're not:** Work-specific patterns from Adobe (those are internal). But I'm always happy to discuss patterns, share learnings, or collaborate on interesting problems.

**Philosophy:** Fast time to value. Straight to execution, minimal ceremony, clear examples.

**Contributing:** Found a bug? Have a better agent? Open an issue or PR!

</details>

---

**Last Updated:** 2025-01-30  
**Agent Count:** 19  
**Other Projects:** [github.com/mostly-coherent](https://github.com/mostly-coherent)
