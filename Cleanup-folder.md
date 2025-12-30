# Documentation Cleanup Agent

> **Purpose:** Harmonize project documentation to canonical structure
> **Usage:** Run this agent on an app project folder (not doc-only folders like `Docs_*`)

## Canonical Documentation Files

Every app project should contain **only** these 6 files:

1. **README.md** - Human-facing project overview (for GitHub, users)
2. **CLAUDE.md** - AI assistant context (technical details, commands, patterns)
3. **PLAN.md** - Blueprint (WHAT we're building - product vision, requirements, phases)
4. **BUILD_LOG.md** - Journal (WHEN things happened - chronological progress diary)
5. **PIVOTS.md** - Decisions & Course Corrections (WHY we chose/changed approaches)
6. **ARCHITECTURE.md** - System Architecture (HOW the system works - components, data flow, patterns)

## Cleanup Process

### Step 1: Identify Non-Canonical Files

Scan the project folder for `.md` files. Exclude:
- Files in `node_modules/`, `.next/`, `dist/`, `build/`, `e2e-results/`, `playwright-report/`, `test-results/`
- Files in subdirectories that are code/docs (e.g., `docs/`, `src/docs/`, `app/docs/`)
- Files matching patterns: `*.spec.ts`, `*.test.ts`, `*.config.ts`, etc.

**Canonical files to preserve:**
- `README.md`
- `CLAUDE.md`
- `PLAN.md`
- `BUILD_LOG.md`
- `PIVOTS.md`
- `ARCHITECTURE.md`

**All other `.md` files** in the project root are candidates for cleanup.

### Step 2: Categorize Non-Canonical Files

For each non-canonical `.md` file, determine its purpose and map to canonical file:

#### Map to PLAN.md (Blueprint - WHAT)
- Files about product vision, requirements, features, milestones
- Files with "plan", "roadmap", "features", "requirements", "vision", "scope"
- Files describing what the project does or should do
- Examples: `FEATURES.md`, `ROADMAP.md`, `REQUIREMENTS.md`, `VISION.md`, `SCOPE.md`

#### Map to BUILD_LOG.md (Journal - WHEN)
- Files about progress, completion status, implementation status
- Files with "log", "progress", "status", "implementation", "completion", "done", "todo"
- Files tracking what was completed and when
- Examples: `PROGRESS.md`, `STATUS.md`, `IMPLEMENTATION_STATUS.md`, `TODO.md`, `CHANGELOG.md`

#### Map to PIVOTS.md (Decisions & Course Corrections - WHY)
- Files about decisions, choices, alternatives, pivots, changes
- Files with "decision", "pivot", "change", "migration", "evolution", "refactor"
- Files explaining why something was chosen or changed
- Examples: `DECISIONS.md`, `MIGRATION.md`, `EVOLUTION.md`, `REFACTOR.md`, `CHANGES.md`

#### Map to ARCHITECTURE.md (System Architecture - HOW)
- Files about system design, components, data flow, patterns, technical structure
- Files with "architecture", "design", "structure", "components", "flow", "patterns", "system"
- Files explaining how the system works technically
- Examples: `DESIGN.md`, `STRUCTURE.md`, `COMPONENTS.md`, `DATA_FLOW.md`, `PATTERNS.md`

#### Map to CLAUDE.md (AI Assistant Context)
- Files about development setup, commands, technical notes, troubleshooting
- Files with "setup", "install", "commands", "config", "troubleshooting", "dev", "technical"
- Files that are technical reference for AI assistants
- Examples: `SETUP.md`, `INSTALL.md`, `COMMANDS.md`, `CONFIG.md`, `TROUBLESHOOTING.md`

#### Map to README.md (Human-Facing Overview)
- Files that are user-facing overviews, getting started guides, quick start
- Files with "getting started", "quick start", "overview", "intro", "guide"
- Files meant for human readers (not AI assistants)
- Examples: `GETTING_STARTED.md`, `QUICK_START.md`, `OVERVIEW.md`, `INTRO.md`

#### Special Cases
- **Version-specific files** (e.g., `V1_*.md`, `V2_*.md`): Extract key decisions → PIVOTS.md, key architecture changes → ARCHITECTURE.md, progress → BUILD_LOG.md, then delete
- **Feature-specific files** (e.g., `FEATURE_X.md`): Extract to PLAN.md (requirements) or BUILD_LOG.md (implementation status)
- **Migration/Deployment files**: Extract decisions → PIVOTS.md, technical details → ARCHITECTURE.md or CLAUDE.md
- **Summary files** (e.g., `SUMMARY.md`, `BUILD_SUMMARY.md`): Extract progress → BUILD_LOG.md, decisions → PIVOTS.md

### Step 3: Merge Content

For each non-canonical file:

1. **Read the file** and identify key sections
2. **Extract relevant content** based on the mapping above
3. **Append to appropriate canonical file** following its format:
   - **PLAN.md**: Add to appropriate section (Product Vision, Phases, Feature Requirements, etc.)
   - **BUILD_LOG.md**: Add new dated entry with format: `## Progress - YYYY-MM-DD`
   - **PIVOTS.md**: Add new decision/pivot entry with format: `## Decision/Pivot: [Name] - YYYY-MM-DD`
   - **ARCHITECTURE.md**: Add to appropriate section (Components, Data Flow, Patterns, etc.)
   - **CLAUDE.md**: Add to appropriate section (Commands, Project Structure, Environment, etc.)
   - **README.md**: Merge user-facing content into appropriate sections
4. **Preserve important information**: Don't lose critical details; adapt formatting to match canonical structure
5. **Add source attribution**: When merging, add a comment like `<!-- Merged from [filename] on YYYY-MM-DD -->` at the end of merged content

### Step 4: Delete Merged Files

After successfully merging content:
1. **Verify** all important content has been extracted
2. **Delete** the non-canonical file
3. **Log** what was merged and where

### Step 5: Verify Canonical Files

After cleanup, verify:
- [ ] Only 6 canonical `.md` files remain in project root
- [ ] All canonical files follow their documented structure
- [ ] No critical information was lost
- [ ] Content is properly formatted and dated

## Execution Instructions

When running this agent:

1. **Confirm target folder**: Ensure this is an app project (not `Docs_*`, `Helpful Agents/`, `MyPrivate*`, etc.)
2. **List all `.md` files** in project root
3. **Identify canonical vs non-canonical**
4. **For each non-canonical file**:
   - Read and analyze content
   - Determine mapping to canonical file(s)
   - Extract and merge content
   - Delete file after successful merge
5. **Report summary**: List files merged, where content went, and any files that couldn't be categorized

## Example Output

```
Documentation Cleanup Report - [Project Name]

Canonical files preserved:
✓ README.md
✓ CLAUDE.md
✓ PLAN.md
✓ BUILD_LOG.md
✓ PIVOTS.md
✓ ARCHITECTURE.md

Files merged and deleted:
- FEATURES.md → Merged to PLAN.md (Feature Requirements section)
- PROGRESS.md → Merged to BUILD_LOG.md (new entry: 2025-01-30)
- DECISIONS.md → Merged to PIVOTS.md (3 decisions extracted)
- SETUP.md → Merged to CLAUDE.md (Environment Setup section)
- V1_BUILD_PLAN.md → Merged to PLAN.md, BUILD_LOG.md, PIVOTS.md (multi-section)

Result: Project now contains only 6 canonical documentation files.
```

## Notes

- **Preserve history**: When merging, maintain chronological order (especially for BUILD_LOG.md and PIVOTS.md)
- **Don't duplicate**: Check if content already exists in canonical file before merging
- **Format consistency**: Adapt merged content to match canonical file structure
- **Date preservation**: Extract and preserve dates from source files when relevant
- **Cross-references**: Update any internal links that referenced deleted files

