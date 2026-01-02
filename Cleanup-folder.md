# Documentation Cleanup Agent

> **Purpose:** Harmonize user-authored project documentation to canonical structure  
> **Scope:** Only processes user-desired documentation files (README.md, CLAUDE.md, PLAN.md, BUILD_LOG.md, PIVOT_LOG.md, ARCHITECTURE.md)  
> **Excludes:** Markdown files that are part of the application's functionality (content files, templates, data files, etc.)  
> **Usage:** Run this agent on an app project folder (not doc-only folders like `Docs_*`)

## Quick Reference: Canonical Documentation Files

**IMPORTANT:** These 6 files are **user-desired documentation files** — user-authored documentation about the project, not markdown files that the application relies on for functionality.

Every app project should contain **only** these 6 **documentation** files:

| File | Purpose | Content Type |
|-----|---------|--------------|
| `README.md` | Human-facing overview | User guides, project intro, getting started |
| `CLAUDE.md` | AI assistant context | Technical details, commands, patterns, setup |
| `PLAN.md` | Blueprint (WHAT) | Product vision, requirements, features, phases |
| `BUILD_LOG.md` | Journal (WHEN) | Chronological progress diary, completion status |
| `PIVOT_LOG.md` | Decisions (WHY) | Course corrections, rationale, alternatives |
| `ARCHITECTURE.md` | System design (HOW) | Components, data flow, patterns, technical structure |

**DO NOT touch:** Markdown files that are part of the application's functionality (content files, templates, data files, etc.)

## Decision Tree: What to Do with Each File

```
For each non-canonical DOCUMENTATION .md file in project root:

0. Is this file part of the application's functionality?
   YES → EXCLUDE (do not process)
   NO → Continue

1. Is file empty/trivial/auto-generated?
   YES → Check "Useless Content" criteria → Delete if verified useless
   NO → Continue

2. Is content duplicate of existing canonical file?
   YES → Check "Useless Content" criteria → Delete if verified useless
   NO → Continue

3. Does file fit single category clearly?
   YES → Map to that canonical file → Merge → Delete
   NO → Continue

4. Does file span multiple categories?
   YES → Split content → Merge to multiple canonical files → Delete
   NO → Continue

5. Is categorization uncertain?
   YES → Follow "Uncertainty" protocol → Preserve → Ask if needed
   NO → Should not reach here
```

**Note:** Only process user-authored documentation files. Application-dependent markdown files are excluded from cleanup.

## Execution Workflow

### Phase 1: Discovery

**Step 1.1: List all `.md` files in project root**

**CRITICAL:** Only process **user-authored documentation files**, NOT markdown files that the application relies on for functionality.

**Exclude these directories:**
- `node_modules/`, `.next/`, `dist/`, `build/`
- `e2e-results/`, `playwright-report/`, `test-results/`
- Any subdirectories (`docs/`, `src/docs/`, `app/docs/`)

**Exclude these file patterns:**
- `*.spec.ts`, `*.test.ts`, `*.config.ts` (not markdown files)

**Exclude application-dependent markdown files:**
- Markdown content files (e.g., blog posts, articles, user content)
- Markdown templates used by the app
- Markdown data files (e.g., `data/*.md`, `content/*.md`)
- Markdown files in `src/`, `app/`, `components/`, `lib/` (application code directories)
- Markdown files referenced/imported by application code
- Any `.md` file that is part of the application's runtime functionality

**Preserve these canonical documentation files:**
- `README.md`, `CLAUDE.md`, `PLAN.md`, `BUILD_LOG.md`, `PIVOT_LOG.md`, `ARCHITECTURE.md`

**Step 1.2: Identify candidates**

**Only consider:** User-authored documentation files in the project root that are NOT part of the application's functionality.

All other **documentation** `.md` files in project root = cleanup candidates.

### Phase 2: Categorization

**For each candidate file, follow this decision process:**

#### Decision Point 1: Is it useless?

**Check ALL criteria (must meet ALL to be useless):**

- [ ] **Duplicate**: Exact/near-exact copy already in canonical files?
- [ ] **Obsolete**: Superseded by newer documentation (check dates)?
- [ ] **Empty/trivial**: Empty, whitespace-only, or trivial placeholder?
- [ ] **Temporary**: Clearly marked as scratch/temporary draft?
- [ ] **Auto-generated**: Machine-generated with no human value?

**If ALL checked AND verified:**
- Delete immediately
- Document in report: `[filename] → Deleted ([rationale])`

**If ALL checked BUT unverified:**
- Move to `_archive/` folder
- Document in report: `[filename] → Archived (needs verification)`
- Ask user for confirmation

**If ANY unchecked:**
- Continue to Decision Point 2

**Never delete if:**
- Contains unique historical context
- Referenced by other files (check links)
- Might aid debugging/understanding evolution
- Contains user/environment-specific info
- Only record of a decision/pivot

#### Decision Point 2: Single category or multi-category?

**Read file content and identify primary purpose:**

| If file contains... | Map to... | Examples |
|-------------------|-----------|----------|
| Product vision, requirements, features, milestones | `PLAN.md` | FEATURES.md, ROADMAP.md, REQUIREMENTS.md, VISION.md |
| Progress, completion status, implementation timeline | `BUILD_LOG.md` | PROGRESS.md, STATUS.md, TODO.md, CHANGELOG.md |
| Decisions, choices, alternatives, pivots, rationale | `PIVOT_LOG.md` | DECISIONS.md, MIGRATION.md, EVOLUTION.md, REFACTOR.md |
| System design, components, data flow, patterns | `ARCHITECTURE.md` | DESIGN.md, STRUCTURE.md, COMPONENTS.md, PATTERNS.md |
| Setup, commands, config, troubleshooting, dev notes | `CLAUDE.md` | SETUP.md, INSTALL.md, COMMANDS.md, CONFIG.md |
| User guides, getting started, overview, intro | `README.md` | GETTING_STARTED.md, QUICK_START.md, OVERVIEW.md |

**Keywords to look for:**

- **PLAN.md**: "plan", "roadmap", "features", "requirements", "vision", "scope", "milestone"
- **BUILD_LOG.md**: "log", "progress", "status", "implementation", "completion", "done", "todo"
- **PIVOT_LOG.md**: "decision", "pivot", "change", "migration", "evolution", "refactor", "why"
- **ARCHITECTURE.md**: "architecture", "design", "structure", "components", "flow", "patterns", "system"
- **CLAUDE.md**: "setup", "install", "commands", "config", "troubleshooting", "dev", "technical"
- **README.md**: "getting started", "quick start", "overview", "intro", "guide", "user"

**If single category identified:**
- Proceed to Phase 3 (Merge)

**If multiple categories identified:**
- Split content appropriately:
  - Decisions/rationale → `PIVOT_LOG.md`
  - Technical implementation → `ARCHITECTURE.md` or `CLAUDE.md`
  - Progress/timeline → `BUILD_LOG.md`
  - Requirements/features → `PLAN.md`
  - User-facing → `README.md`
- Proceed to Phase 3 (Merge)

**If category unclear:**
- Proceed to Decision Point 3

#### Decision Point 3: Handle uncertainty

**If categorization is uncertain:**

1. **Use conservative heuristics:**
   - Technical/operational → `CLAUDE.md` (safest default)
   - System design → `ARCHITECTURE.md`
   - Time-bound progress → `BUILD_LOG.md`
   - Rationale/decisions → `PIVOT_LOG.md`

2. **Document uncertainty:**
   - Add comment: `<!-- Merged from [filename] - categorization uncertain, may need review -->`
   - Or: `<!-- Merged from [filename] - tentatively categorized as [category] -->`

3. **Preserve original file:**
   - Do NOT delete until user confirms
   - Report in summary: `[filename] → Tentatively merged to [canonical] (needs review)`

4. **Ask for clarification if:**
   - Content is critical/high-value
   - Multiple options equally plausible
   - Contains unique information
   - Format: "Should `[filename]` content go to `[Option A]` or `[Option B]`?"

5. **Default fallback:**
   - Place in `CLAUDE.md` with header: `## [Topic] - From [filename] (needs categorization review)`
   - Keep original file until confirmed

**Key principle:** Never delete when uncertain. Preserve first, categorize later.

### Phase 3: Merge Content

**For each file being merged:**

**Step 3.1: Read and extract**

1. Read the entire file
2. Identify key sections
3. Extract relevant content based on categorization

**Step 3.2: Format for target canonical file**

| Target File | Format | Example |
|------------|--------|---------|
| `PLAN.md` | Add to appropriate section | Product Vision, Phases, Feature Requirements |
| `BUILD_LOG.md` | New dated entry | `## Progress - YYYY-MM-DD` |
| `PIVOT_LOG.md` | New decision/pivot entry | `## Decision: [Name] - YYYY-MM-DD` |
| `ARCHITECTURE.md` | Add to appropriate section | Components, Data Flow, Patterns |
| `CLAUDE.md` | Add to appropriate section | Commands, Project Structure, Environment |
| `README.md` | Merge into sections | Overview, Getting Started, Usage |

**Step 3.3: Merge with attribution**

1. Append content to appropriate section
2. Preserve important details (don't summarize away critical info)
3. Adapt formatting to match canonical file structure
4. Add source attribution: `<!-- Merged from [filename] on YYYY-MM-DD -->`

**Step 3.4: Check for duplicates**

- Verify content doesn't already exist in canonical file
- If duplicate found, compare versions and keep most complete
- Document in attribution comment if merging duplicate

### Phase 4: Cleanup

**Step 4.1: Verify merge completion**

For each merged file:
- [ ] All important content extracted?
- [ ] Content properly formatted?
- [ ] Attribution comment added?
- [ ] No critical information lost?

**Step 4.2: Handle uncertain files**

- [ ] Uncertainty documented?
- [ ] Original file preserved?
- [ ] User asked for clarification (if needed)?

**Step 4.3: Delete merged files**

**Only delete if:**
- Content successfully merged OR confirmed useless
- Uncertainty resolved (if applicable)
- Deletion rationale documented

**Do NOT delete if:**
- File marked as uncertain
- Content not fully verified as merged
- User confirmation pending

**Step 4.4: Log actions**

Document in report:
- Files merged → where content went
- Files deleted → rationale
- Files requiring review → why and recommendation

### Phase 5: Verification

**Final checklist:**

- [ ] Only 6 canonical `.md` files remain in project root
- [ ] All canonical files follow documented structure
- [ ] No critical information lost
- [ ] Content properly formatted and dated
- [ ] All merges have attribution comments
- [ ] Uncertain files documented and preserved
- [ ] Summary report generated

## Special Cases

### Version-specific files (e.g., `V1_*.md`, `V2_*.md`)

**Action:** Split and merge:
- Key decisions → `PIVOT_LOG.md`
- Architecture changes → `ARCHITECTURE.md`
- Progress → `BUILD_LOG.md`
- Then delete

### Feature-specific files (e.g., `FEATURE_X.md`)

**Action:** Split:
- Requirements → `PLAN.md`
- Implementation status → `BUILD_LOG.md`
- Then delete

### Migration/Deployment files

**Action:** Split:
- Decisions → `PIVOT_LOG.md`
- Technical details → `ARCHITECTURE.md` or `CLAUDE.md`
- Then delete

### Summary files (e.g., `SUMMARY.md`, `BUILD_SUMMARY.md`)

**Action:** Split:
- Progress → `BUILD_LOG.md`
- Decisions → `PIVOT_LOG.md`
- Then delete

## Report Template

```markdown
# Documentation Cleanup Report - [Project Name]

**Date:** YYYY-MM-DD  
**Target Folder:** [path]

## Canonical Files Preserved
✓ README.md
✓ CLAUDE.md
✓ PLAN.md
✓ BUILD_LOG.md
✓ PIVOT_LOG.md
✓ ARCHITECTURE.md

## Files Merged and Deleted
- [filename] → Merged to [canonical] ([section/entry])
- [filename] → Merged to [canonical1], [canonical2] (multi-section)

## Files Deleted (Confirmed Useless)
- [filename] → Deleted ([rationale])
- [filename] → Archived ([rationale], needs verification)

## Files Requiring Review (Uncertain)
- [filename] → Tentatively merged to [canonical]
  - Reason: [why uncertain]
  - Recommendation: [what to review]
  - Original file: [preserved/deleted]

## Summary
- Total files processed: [N]
- Files merged: [N]
- Files deleted: [N]
- Files requiring review: [N]
- Result: Project now contains only 6 canonical documentation files [pending review of uncertain files].
```

## Execution Checklist

When running this agent, follow this checklist:

1. [ ] Confirm target folder is an app project (not `Docs_*`, `Helpful Agents/`, `MyPrivate*`)
2. [ ] List all `.md` files in project root
3. [ ] **Exclude application-dependent markdown files** (content files, templates, data files, files in `src/`, `app/`, `components/`, `lib/`)
4. [ ] Identify canonical vs non-canonical **documentation** files (user-authored documentation only)
5. [ ] For each non-canonical **documentation** file:
   - [ ] Verify it's a documentation file (not application-dependent)
   - [ ] Check if useless (Decision Point 1)
   - [ ] If useless and verified → Delete and document
   - [ ] If useless but unverified → Archive and ask
   - [ ] If useful → Categorize (Decision Point 2)
   - [ ] If uncertain → Handle uncertainty (Decision Point 3)
   - [ ] Merge content (Phase 3)
   - [ ] Delete after merge (if not uncertain)
6. [ ] Generate summary report
7. [ ] Verify final state (Phase 5 checklist)

## Key Principles

1. **Documentation files only**: Only process user-authored documentation files. Never touch markdown files that are part of the application's functionality (content files, templates, data files, etc.).
2. **Preserve over delete**: When uncertain, preserve. When confident but unverified, archive first.
3. **Never lose information**: Extract all important content before deleting.
4. **Document everything**: Attribution comments, deletion rationale, uncertainty notes.
5. **Ask when needed**: Don't guess on critical/high-value content.
6. **Maintain chronology**: Preserve chronological order in BUILD_LOG.md and PIVOT_LOG.md.
7. **Check duplicates**: Verify content doesn't already exist before merging.
8. **Format consistently**: Adapt merged content to match canonical file structure.
9. **Preserve dates**: Extract and preserve dates from source files.

## Notes

- **Preserve history**: Maintain chronological order (especially BUILD_LOG.md and PIVOT_LOG.md)
- **Don't duplicate**: Check if content already exists in canonical file before merging
- **Format consistency**: Adapt merged content to match canonical file structure
- **Date preservation**: Extract and preserve dates from source files when relevant
- **Cross-references**: Update any internal links that referenced deleted files
