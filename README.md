# Helpful Prompts

Reusable, generic prompts for AI-assisted development and documentation. These are **personal/shareable prompts**—work-specific patterns from Adobe are internal, but I'm happy to discuss patterns and share what I've learned.

**Fast path:** Jump to [Prompts](#prompts) or check out [my other repos](https://github.com/mostly-coherent).

---

## Prompts

### 🐛 Development & Debugging
- **[Debug.md](Debug.md)** — Full project audit (bugs, performance, accessibility)
- **[Format.md](Format.md)** — Markdown style normalization
- **[OptimizeDoc.md](OptimizeDoc.md)** — Lossless distillation for clarity
- **[ReviseDoc.md](ReviseDoc.md)** — Light-touch refinement

### 📝 Requirements & Planning
- **[Requirement_Agent.md](Requirement_Agent.md)** — Create or update PRDs and Builder Briefs
- **[Critique_Agent.md](Critique_Agent.md)** — Structured feedback on requirements
- **[Builder_Template.md](Builder_Template.md)** — Lightweight prototype-driven briefs
- **[PRD_Template.md](PRD_Template.md)** — Comprehensive requirements template
- **[BusinessGuide.md](BusinessGuide.md)** — Technical → business-friendly translation

### 📄 Documentation
- **[README-project-template.md](README-project-template.md)** — Generic project README
- **[README-project-refine-prompt.md](README-project-refine-prompt.md)** — Polish existing READMEs
- **[ListQuestions.md](ListQuestions.md)** — Extract open questions from docs
- **[ListConflicts.md](ListConflicts.md)** — Extract conflicting facts

### 🔒 Security & Privacy
- **[Workspace_Privacy_Optimization.md](Workspace_Privacy_Optimization.md)** — Prep workspace for GitHub sharing
- **[GitSync.md](GitSync.md)** — Safe git sync workflow

---

## Quick Start

```bash
# In Cursor or any AI assistant
@Debug.md — Run full debug audit on this project
@Requirement_Agent.md — Create a new Builder Brief
@OptimizeDoc.md — Clean up this documentation
```

**Customization:** Replace placeholders (`<WORKSPACE_PATH>`, `<WORK_USER>`, `{{PLATFORM_NAME}}`) with your values.

---

## Usage Patterns

| Need | Prompts | Flow |
|------|---------|------|
| **New project** | README-project-template.md → README-project-refine-prompt.md | Scaffold → polish |
| **Requirements** | Requirement_Agent.md → Critique_Agent.md | Create → review |
| **Doc cleanup** | OptimizeDoc.md → ReviseDoc.md → Format.md | Restructure → refine → format |
| **Code quality** | Debug.md | Audit → fix high-confidence → review rest |

---

## About These Prompts

**What they are:** Generic, reusable templates anyone can customize. No personal paths, no hardcoded accounts, no secrets.

**What they're not:** Work-specific patterns from Adobe (those are internal). But I'm always happy to discuss patterns, share learnings, or collaborate on interesting problems.

**Philosophy:** Fast time to value. Straight to the files, minimal writeup, clear examples.

---

## Safety Notes

- ✅ Review auto-fix outputs before committing
- ✅ Test on small scope first (single file/folder)
- ✅ Verify git remotes before pushing
- ❌ Never commit secrets or personal info

---

**Last Updated:** 2025-12-21  
**Prompt Count:** 15  
**Other Projects:** [github.com/mostly-coherent](https://github.com/mostly-coherent)
