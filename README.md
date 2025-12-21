# Helpful Prompts

A collection of reusable, generic prompts for AI-assisted development and documentation.

---

## 📁 Prompt Categories

### 🐛 Development & Debugging
- **`Debug.md`** — Comprehensive project audit for bugs, performance, and accessibility issues
- **`Format.md`** — Style normalization for markdown documents (heading hierarchy, spacing, tables)
- **`OptimizeDoc.md`** — Lossless distillation to maximize readability and clarity
- **`ReviseDoc.md`** — Light-touch refinement with minimal edits

### 📝 Requirements & Planning
- **`Critique_Agent.md`** — Critique existing product requirements documents with structured feedback
- **`Requirement_Agent.md`** — Create or update product requirements documents (Builder Briefs and PRDs)
- **`Builder_Template.md`** — Template for lightweight, prototype-driven product briefs
- **`PRD_Template.md`** — Template for comprehensive product requirement documents
- **`BusinessGuide.md`** — Convert technical documentation into business-friendly guides

### 📄 Documentation
- **`README-project-template.md`** — Generic project README template
- **`README-project-refine-prompt.md`** — Refine existing README for best practices
- **`ListQuestions.md`** — Extract all open questions from a document
- **`ListConflicts.md`** — Extract all conflicting facts from a document

### 🔒 Security & Privacy
- **`Workspace_Privacy_Optimization.md`** — Prepare workspace for GitHub sharing while protecting private content
- **`GitSync.md`** — Sync local changes to GitHub with safety checks

---

## 🚀 Quick Start

### Using a Prompt
1. Open the prompt file you need
2. Copy the entire prompt or the specific section you need
3. Paste into your AI assistant (Cursor, ChatGPT, Claude, etc.)
4. Replace any `{{PLACEHOLDERS}}` with your specific values
5. Run the prompt

### Example
```
@Debug.md — Run full debug audit on this project
```

---

## 📋 Prompt Usage Patterns

### For Project Setup
1. Use `README-project-template.md` as starting point
2. After scaffolding, use `README-project-refine-prompt.md` to polish

### For Requirements
1. Use `Requirement_Agent.md` to create new PRD or Builder Brief
2. Use `Critique_Agent.md` to review completed requirements
3. Use `Builder_Template.md` or `PRD_Template.md` as structure reference

### For Documentation Cleanup
1. Use `OptimizeDoc.md` for content restructuring
2. Use `ReviseDoc.md` for light touch-ups
3. Use `Format.md` for final formatting polish

### For Code Quality
1. Use `Debug.md` for comprehensive audit
2. Fix high-confidence issues automatically
3. Review medium/low-confidence issues manually

---

## 🔧 Customization

All prompts in this collection are generic and workspace-agnostic. To customize for your specific needs:

1. **Replace placeholders:**
   - `<WORKSPACE_PATH>` → Your workspace path
   - `<WORK_USER>` → Your work GitHub username
   - `<PERSONAL_USER>` → Your personal GitHub username
   - `{{PLATFORM_NAME}}` → Your platform/product name
   - `{{CLIENT_TEAMS}}` → Your target audience

2. **Adjust patterns:**
   - Private folder patterns (`Private*/`, `_private/`, `.local/`)
   - .gitignore patterns
   - Git workflow steps

3. **Extend prompts:**
   - Add project-specific rules
   - Add custom quality checks
   - Add domain-specific patterns

---

## 📚 Best Practices

### When Using Prompts
- ✅ Read the entire prompt before using
- ✅ Understand what it will do (especially auto-fix prompts)
- ✅ Replace ALL placeholders with actual values
- ✅ Test on a small scope first (single file/folder)
- ✅ Review AI output before accepting changes

### When Modifying Prompts
- ✅ Keep prompts focused on one task
- ✅ Use clear section headers
- ✅ Include examples where helpful
- ✅ Document any assumptions
- ✅ Version your changes

### Safety First
- ⚠️ Review auto-fix changes before committing
- ⚠️ Backup important files before running destructive operations
- ⚠️ Verify remote URLs before pushing to GitHub
- ⚠️ Never commit secrets or personal information

---

## 🤝 Contributing

These prompts are continually refined based on real-world usage. If you improve a prompt:

1. Test the improvement thoroughly
2. Document what changed and why
3. Update the version and date
4. Share back to source if applicable

---

## 📖 Additional Resources

### Related Folders
- **`Server_Scripts/`** — Server-side scripting utilities

### Documentation Standards
- Keep prompts under 500 lines when possible
- Use markdown tables for structured data
- Include version/date headers
- Provide examples for complex concepts

---

**Last Updated:** 2025-12-21  
**Prompt Count:** 15  
**Status:** ✅ Production Ready
