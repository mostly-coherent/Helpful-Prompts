# README Refinement Prompt

Use this prompt after project scaffolding to turn a default README into a best-in-class, project-specific README.

```text
You are an expert engineer and technical writer helping produce a best-in-class README for this project.

Primary Goal:
- **Get users from "What is this?" to "App running locally" in under 60 seconds.**
- READMEs are the front door—optimize for immediate usability, defer learning to collapsible sections.
- **Seeing is faster than installing.** Prioritize visual proof.

Secondary Goals:
- Make the README concise, scannable, and genuinely useful for new contributors.
- Keep one clear "happy path" for install, env setup, dev run, and deployment (no A/B option overload).
- Follow documentation best practices: minimal, compact, copy/paste-safe commands (no inline comments).

Context you can use:
- This repository's code and file structure.
- **Look for screenshots in `public/`, `e2e-results/`, or `docs/images/` to embed.**
- **Look for a live URL in `BUILD_LOG.md` or git config to add as a Demo link.**
- The existing README.md.
- CLAUDE.md (project type, key commands, environment).
- Plan.md (if present) for goals and scope.

Instructions:
1. **Value prop first** — Start with a one-sentence blockquote explaining what this does and the outcome you get.
2. Add badges (Type, Status, Stack) immediately after the value prop.
3. **Visual Proof (Critical):**
   - If a live URL is found, add a bold link: **[View Live Demo](url)**.
   - If a screenshot exists (check `e2e-results/*.png` or `public/*.png`), embed the best one immediately.
   - *Rationale: Visuals explain value faster than text.*
4. **🚀 Quick Start section (#1 priority)** — Single copy-paste code block:
   ```bash
   # 1. Install
   npm install
   
   # 2. Configure
   cp .env.example .env
   # Edit .env with your API keys
   
   # 3. Run
   npm run dev
   ```
   - Follow with bold outcome: **→ Open http://localhost:3000**
   - All 3 steps in ONE code block (no scrolling between sections)
   - Adapt commands to the actual stack (npm/pip/etc.)
5. **Everything else goes into collapsible `<details>` tags:**
   - ✨ Features
   - ⚙️ Environment Variables
   - 🛠️ Available Scripts
   - 🚢 Deployment
   - 📚 Development Notes (pointers to CLAUDE.md, Plan.md, BUILD_LOG.md)
6. **Above-the-fold content:** Only value prop, badges, Visual Proof, and Quick Start visible by default.
7. Ensure all code blocks are clean and copy/pasteable:
   - No inline comments inside command blocks (use # comments on separate lines).
   - One command per line.
8. Use emojis in section headings for scannability (🚀 ✨ ⚙️ 🛠️ 🚢 📚).
9. Adapt the template structure to the actual stack using the repo's package files and CLAUDE.md.

Output:
- A complete replacement for README.md that:
  - Leads with value prop + Visuals + Quick Start (above the fold).
  - Defers all learning to collapsible sections below.
  - Preserves all critical information from the existing README and CLAUDE.md.
  - Removes redundant or low-signal detail.
  - Optimizes for "start fast, learn deep later."
```
