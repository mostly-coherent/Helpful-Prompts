---
name: extract-webpage-content
description: Extract all content from internal webpages including text, images, collapsible sections (accordions, tabs, carousels), and embedded links. Accepts either a single URL or a sitemap file (from extract-sitemap) as input. Use Playwright MCP to navigate, expand all dynamic elements, capture screenshots, and extract pages. Save output as Markdown or Word documents. Extracts depth 0 + 1 + 2 only (starting page + direct links + links-from-links, no deeper). Use when the user requests extracting webpage content, copying page content, archiving internal documentation, or extracting from a sitemap file.
---

# Extract Webpage Content

Extract complete content from internal authenticated webpages, including all visible text, images, collapsed content (accordions, tabs, carousels), and embedded links. Accepts either a single URL (with recursive link following) or a sitemap file (from `extract-sitemap`) for curated extraction.

## When to Use

Use this skill when:
- User requests extracting webpage content
- User wants to copy or archive internal documentation
- User needs to capture content from authenticated sites
- User mentions "extract page," "copy page content," or "archive documentation"
- User provides a sitemap file (from `extract-sitemap`) to extract content from curated URLs

**Do NOT use when:**
- User wants to browse or navigate pages manually
- User needs real-time page interaction (use cursor-ide-browser instead)

## Execution Model

**Execute autonomously** - Complete the entire workflow without user approval for each action.

**CRITICAL - NO CONFIRMATION REQUESTS:**
- ❌ **NEVER ask** "Should I continue?" or "Do you want me to pause?"
- ❌ **NEVER ask** "There are X pages remaining, continue?"
- ❌ **NEVER ask** for approval between pages or batches
- ✅ **ALWAYS continue** until all pages are extracted
- ✅ **ALWAYS complete** the entire workflow automatically
- ✅ **ONLY report** progress updates, never ask for permission

**Required tools:** Playwright MCP (`user-playwright`) - does NOT require per-action approval
**Do NOT use:** cursor-ide-browser MCP - requires per-action approval (not suitable)

## Input Types

**Single URL Mode:**
- Extract from one URL plus 2 levels of linked pages (depth 0 + 1 + 2)
- Depth 0: Starting page
- Depth 1: Direct links from starting page (hop 1)
- Depth 2: Links from depth 1 pages (hop 2)
- **Stops at depth 2** - does NOT follow links from depth 2 pages

**Sitemap Mode:**
- Extract from all URLs in sitemap file, respecting depth levels from sitemap
- Do NOT recursively follow links from extracted pages (sitemap already contains all URLs)
- Parse URLs from machine-readable section using `references/sitemap-parser.js`

## Workflow

1. **Resume Logic (MANDATORY AT START)** - Check for existing state, resume if found (see Resume Logic section)
2. **Determine Input Type** - Check if user provided sitemap file or single URL
3. **Navigate** - Clean up Chrome processes, navigate to target URL(s)
4. **Expand Dynamic Content** - Click all tabs, expand all accordions, navigate carousels (see `references/expand-dynamic-content.js`)
5. **Extract Text** - Capture text content with image position markers, filter navigation elements
6. **Filter & Capture Images** - Identify content images (skip decorative), take screenshots (see `references/image-filtering.js`)
7. **Extract Links** - Find all internal links on the page (see `references/link-extraction.js`)
8. **Recursive Extraction** - Extract each linked page using queue algorithm (see Recursive Extraction Algorithm section)
   - **NEVER ask for confirmation** - Continue extracting all pages automatically
9. **Progress tracking** - Log progress after every 5-10 pages (see Progress Tracking section)
10. **Completion gates** - Verify all gates pass before proceeding (see Completion Gates section)
11. **Save Output** - Format as Markdown, save to nested folder structure (only after gates pass)

## Output Format

**Markdown Format (Default):**
- Images inserted at their exact position in content flow
- Images saved as files in same folder as Markdown
- Document references: `![alt]([exact-filename])` (relative path)

**Word Format (Optional - on request):**
- Images embedded directly in document
- Maintain heading hierarchy
- Default: Markdown unless user explicitly requests Word format

## Directory Structure

**Main Page (Depth 0):**
- Folder: `[base-directory]/[Page_Title]/`
- Files: `[Page_Title]_Full_Content.md` + images

**Nested Pages (Depth 1-2):**
- Folder: `[parent-folder]/[Nested_Page_Title]/`
- Files: `[Nested_Page_Title]_Full_Content.md` + images

**Base Directory:**
- Use directory specified by user, or workspace root if not specified
- **FORBIDDEN:** Never save to paths containing `Internal-Helpx Archive`

## File Naming

**Markdown Files:**
- Main: `[Page_Title]_Full_Content.md`
- Nested: `[Nested_Page_Title]_Full_Content.md`

**Image Filenames:**
- Format: `[page-slug]-image-[N]-[context].[ext]`
- Examples: `retention-policy-image-1-overview.png`

**Image Location:**
- All images saved to same folder as Markdown file
- NO `screenshots/` subfolder
- Filename in document reference MUST match saved filename exactly

## Requirements

1. **Autonomous execution** - Execute entire workflow automatically without user approval
   - **NEVER ask for confirmation** - Continue extracting until complete
   - **NEVER pause for approval** - Process all pages autonomously
   - **ONLY report progress** - Inform user of status, don't ask permission
2. **Complete extraction** - Expand all dynamic elements, capture all content
3. **Filter decorative images** - Only capture content images (screenshots, diagrams), skip logos/icons/navigation
4. **Follow embedded links** - Extract depth 0 + 1 + 2 only (no deeper recursion - single URL mode only)
5. **Track visited URLs** - Prevent duplicate extractions and infinite loops
6. **Structured output** - Nested folder structure with descriptive names from page headlines
7. **State persistence** - Save progress to `extraction-state.json` after every 5-10 pages
8. **Queue-based extraction** - Use explicit queue algorithm for recursive extraction (see Recursive Extraction Algorithm section)
9. **Completion verification** - Verify all completion gates pass before marking complete

## State Persistence

**Save progress to `extraction-state.json` after every 5-10 pages:**

```json
{
  "startingUrl": "https://...",
  "startingTitle": "...",
  "visitedUrls": ["url1", "url2", ...],
  "extractedPages": [
    {"title": "...", "url": "...", "depth": 0, "folder": "...", "status": "complete"},
    ...
  ],
  "pendingUrls": [
    {"url": "...", "depth": 1, "parentFolder": "..."},
    ...
  ],
  "lastUpdated": "2026-01-28T14:00:00Z"
}
```

**Resume Logic:**
1. **ALWAYS check for `extraction-state.json` at start**
2. If exists → Load state, resume from `pendingUrls` queue
3. If not exists → Start fresh
4. After every 5-10 pages → Save state
5. On completion → Delete state file

**If interrupted:** Load state from `extraction-state.json` and continue from where you left off.

## Recursive Extraction Algorithm (MANDATORY)

**You MUST implement this exact algorithm for recursive extraction. See `references/RECURSIVE_EXTRACTION_ALGORITHM.md` for detailed pseudocode.**

### Queue-Based Algorithm

```javascript
// Initialize state tracking
visitedUrls = new Set()  // Normalized URLs already processed
extractedPages = []      // All extracted pages: {title, url, depth, folder, status}
pendingUrls = []         // Queue: {url, depth, parentFolder}

// Process starting page (depth 0)
processPage(startingUrl, depth: 0, parentFolder: baseDirectory)

// Process queue until empty (CRITICAL - DO NOT STOP EARLY)
while (pendingUrls.length > 0) {
  item = pendingUrls.shift()  // {url, depth, parentFolder}
  normalized = normalizeUrl(item.url)
  
  // Skip if already visited
  if (visitedUrls.has(normalized)) continue
  
  // Skip if max depth reached (allow depth 0, 1, 2 only)
  if (item.depth > 2) continue
  
  // Mark as visited BEFORE processing
  visitedUrls.add(normalized)
  
  try {
    // Process page: navigate, expand content, extract text, capture images
    result = processPage(item.url, item.depth, item.parentFolder)
    
    // Add to extracted pages
    extractedPages.push({
      title: result.title,
      url: normalized,
      depth: item.depth,
      folder: result.folder,
      status: 'complete'
    })
    
    // Extract links from this page
    links = extractLinks(item.url)
    
    // Add discovered links to queue (if depth < 2)
    if (item.depth < 2) {
      for (link of links) {
        linkNormalized = normalizeUrl(link.href)
        if (!link.isFileDownload && 
            !visitedUrls.has(linkNormalized) && 
            isInternalLink(link.href)) {
          pendingUrls.push({
            url: linkNormalized,
            depth: item.depth + 1,
            parentFolder: result.folder
          })
        }
      }
    }
  } catch (error) {
    // Log error but continue
    extractedPages.push({
      title: 'Untitled',
      url: normalized,
      depth: item.depth,
      folder: item.parentFolder,
      status: 'error'
    })
  }
  
  // Save state every 5-10 pages
  if (extractedPages.length % 10 === 0) {
    saveState('extraction-state.json')
    logProgress(extractedPages.length, pendingUrls.length)
  }
}

// Verify completion
if (pendingUrls.length > 0) {
  throw new Error('Queue not empty! Continue processing.')
}
```

**For file downloads (PDFs, DOCs, etc.):**
- Download file directly, save to parent folder
- Do NOT add to queue (files don't have extractable links)
- Reference downloaded file in Markdown

**See `references/RECURSIVE_EXTRACTION_ALGORITHM.md` for complete pseudocode.**

## Error Recovery (MANDATORY)

**When errors occur, follow this recovery procedure. NEVER stop processing due to errors.**

### Navigation Errors

1. **Error:** "Failed to launch browser process"
   - **Action:** Run `pkill -f "mcp-chrome-" && sleep 2` automatically
   - **Action:** Retry navigation (up to 3 times)
   - **If still fails:** Mark URL as error, continue with next URL (DO NOT stop)
   - **Log:** "Navigation failed for [URL]. Marking as error and continuing."

2. **Error:** Navigation timeout
   - **Action:** Mark URL as timeout, continue with next URL
   - **Action:** Log error but continue processing queue
   - **Log:** "Timeout for [URL]. Marking as timeout and continuing."

3. **Error:** 404/403/500
   - **Action:** Mark URL with appropriate status
   - **Action:** Continue with next URL (DO NOT stop)
   - **Log:** "Status [code] for [URL]. Marking appropriately and continuing."

### State Corruption

1. **Error:** Cannot load state file
   - **Action:** Backup corrupted state file first: `mv extraction-state.json extraction-state.json.backup`
   - **Action:** Start fresh (backup corrupted state file first)
   - **Action:** Log warning but continue
   - **Log:** "State file corrupted. Backed up and starting fresh."

### Critical Rule

**NEVER stop processing due to errors. Always continue with next item in queue. Errors are logged but do not halt execution.**

## Troubleshooting

If navigation fails:
1. ✅ Chrome processes cleaned? → Run `pkill -f "mcp-chrome-" && sleep 2` FIRST
2. ✅ Browser installed? → Call `browser_install`
3. ✅ Tab exists? → Call `browser_tabs(action: "list")`, create if needed
4. ✅ URL valid? → Check includes `https://`, no typos
5. ✅ Authenticated? → For internal sites, ensure user is logged in

**Priority:** Always check for conflicting Chrome processes FIRST before attempting browser operations.

## Resume Logic (MANDATORY AT START)

**ALWAYS execute this at the very start, before any processing:**

```python
def start_workflow():
    state_file = 'extraction-state.json'
    
    # Step 1: Check for existing state
    if file_exists(state_file):
        state = load_state(state_file)
        print(f"Resuming from saved state: {len(state['extractedPages'])} pages extracted, {len(state['pendingUrls'])} URLs remaining")
        print(f"Last updated: {state['lastUpdated']}")
        
        # Verify state is valid
        if state['pendingUrls']:
            print(f"Continuing from queue: {len(state['pendingUrls'])} URLs to extract")
            return state  # Resume from here
        else:
            print("State file exists but queue empty. Verifying completion...")
            # Run completion verification
            if verify_completion(state):
                print("Previous run completed. Starting fresh.")
                delete_state_file(state_file)
                return None  # Start fresh
            else:
                print("Previous run incomplete. Resuming...")
                return state  # Resume
    
    # Step 2: Start fresh
    print("No saved state found. Starting fresh.")
    return None
```

**This logic MUST execute at the very start, before any processing. Always check for saved state first.**

## Progress Tracking (MANDATORY)

**Log progress after every batch (5-10 pages) - This is MANDATORY, not optional:**

```python
def log_progress(state):
    processed = len(state['extractedPages'])
    remaining = len(state['pendingUrls'])
    depth_breakdown = {
        0: sum(1 for p in state['extractedPages'] if p['depth'] == 0),
        1: sum(1 for p in state['extractedPages'] if p['depth'] == 1),
        2: sum(1 for p in state['extractedPages'] if p['depth'] == 2)
    }
    
    print(f"Progress: {processed} pages extracted, {remaining} URLs remaining in queue")
    print(f"Depth breakdown: Depth 0: {depth_breakdown[0]}, Depth 1: {depth_breakdown[1]}, Depth 2: {depth_breakdown[2]}")
    
    # CRITICAL: If remaining > 0, explicitly state work is NOT complete
    if remaining > 0:
        print(f"⚠️ WARNING: {remaining} URLs still pending. Work is NOT complete. Continue extracting.")
    else:
        print("✅ Queue empty. Proceeding to completion verification.")
```

**Progress logging is MANDATORY after every 5-10 pages. Never skip this step.**

## Completion Gates (MANDATORY)

**BEFORE marking task complete, ALL gates must pass. If ANY gate fails, work is NOT complete.**

### Gate 1: State Verification

```python
def verify_gate_1(state):
    # Load state
    if not file_exists('extraction-state.json'):
        print("❌ Gate 1 FAILED: State file missing. Cannot verify completion.")
        return False
    
    state = load_state('extraction-state.json')
    
    # Verify queue empty
    if len(state['pendingUrls']) > 0:
        print(f"❌ Gate 1 FAILED: Queue not empty: {len(state['pendingUrls'])} items remaining. Continue extracting.")
        return False
    
    print("✅ Gate 1 PASSED: Queue is empty.")
    return True
```

**If Gate 1 fails:** Continue extracting queue until empty. DO NOT mark complete.

### Gate 2: Progress Verification

```python
def verify_gate_2(state):
    # Count extracted pages
    extracted = len(state['extractedPages'])
    
    # Count visited URLs
    visited = len(state['visitedUrls'])
    
    # Verify all pending URLs processed
    if len(state['pendingUrls']) > 0:
        print(f"❌ Gate 2 FAILED: Pending URLs not processed: {len(state['pendingUrls'])} remaining. Continue extracting.")
        return False
    
    print(f"✅ Gate 2 PASSED: All URLs processed ({extracted} pages extracted, {visited} URLs visited).")
    return True
```

**If Gate 2 fails:** Process remaining URLs. DO NOT mark complete.

### Gate 3: Output Verification

```python
def verify_gate_3(state, base_directory):
    # Verify all extracted pages have output files
    for page in state['extractedPages']:
        if page['status'] == 'complete':
            expected_file = f"{base_directory}/{page['folder']}/{page['title']}_Full_Content.md"
            if not file_exists(expected_file):
                print(f"❌ Gate 3 FAILED: Output file missing: {expected_file}. Generate output before marking complete.")
                return False
    
    print("✅ Gate 3 PASSED: All output files exist.")
    return True
```

**If Gate 3 fails:** Generate/fix output files. DO NOT mark complete.

### Completion Gate Execution

```python
def run_completion_gates(state, base_directory):
    gates = [
        ('Gate 1: State Verification', verify_gate_1, state),
        ('Gate 2: Progress Verification', verify_gate_2, state),
        ('Gate 3: Output Verification', verify_gate_3, state, base_directory)
    ]
    
    all_passed = True
    for gate_name, gate_func, *args in gates:
        print(f"\nRunning {gate_name}...")
        if not gate_func(*args):
            all_passed = False
            print(f"{gate_name} FAILED. Fix issues and re-run verification.")
    
    if all_passed:
        print("\n✅ ALL COMPLETION GATES PASSED. Work is complete.")
        return True
    else:
        print("\n❌ ONE OR MORE GATES FAILED. Work is NOT complete. Fix issues and re-run verification.")
        return False
```

**If ANY gate fails:** Fix issues, re-run verification, DO NOT mark complete.

## Never Stop Early (MANDATORY)

**CRITICAL RULES to prevent early stopping:**

1. **Queue Check:**
   - Before marking complete → Verify `pendingUrls.length === 0`
   - If queue NOT empty → Continue extracting (DO NOT mark complete)
   - Log: "Queue has X items remaining. Continuing extraction."

2. **Progress Check:**
   - Before marking complete → Verify all discovered links extracted
   - If gaps found → Continue extracting (DO NOT mark complete)
   - Log: "X links discovered but Y not extracted. Continuing."

3. **State Check:**
   - Before marking complete → Load state file
   - Verify state matches current progress
   - If mismatch → Fix state, continue extracting

4. **Output Check:**
   - Before marking complete → Verify all output files exist
   - If missing → Continue extracting (DO NOT mark complete)

**If ANY check fails, work is NOT complete. Continue extracting.**

## Completion Criteria (ALL MUST BE TRUE)

**Work is complete ONLY when ALL criteria are true:**

1. ✅ **Queue empty:** `pendingUrls.length === 0`
2. ✅ **All links extracted:** Every discovered link either extracted OR marked as error
3. ✅ **State saved:** State file reflects current progress
4. ✅ **Output generated:** All output files exist and are non-empty
5. ✅ **No pending work:** No URLs remaining to extract
6. ✅ **Verification passed:** All completion gates passed

**If ANY criterion is false → Work is NOT complete. Continue extracting.**

**Before marking complete, verify ALL criteria explicitly:**

```python
def is_complete(state, base_directory):
    criteria = {
        'queue_empty': len(state['pendingUrls']) == 0,
        'all_links_extracted': verify_gate_2(state),
        'state_saved': file_exists('extraction-state.json') and state_matches_progress(state),
        'output_generated': verify_gate_3(state, base_directory),
        'no_pending_work': len(state['pendingUrls']) == 0,
        'verification_passed': run_completion_gates(state, base_directory)
    }
    
    all_passed = all(criteria.values())
    
    if not all_passed:
        failed = [k for k, v in criteria.items() if not v]
        print(f"❌ Completion criteria failed: {failed}")
        print("Continue extracting until all criteria pass.")
        return False
    
    print("✅ All completion criteria passed. Work is complete.")
    return True
```

## If Verification Fails

**When completion verification fails, follow this procedure:**

1. **Identify failure reason:**
   - Queue not empty → Continue extracting queue
   - Links not extracted → Extract remaining links
   - Output missing/incomplete → Generate/fix output
   - State corrupted → Fix state or start fresh

2. **Take corrective action:**
   - If queue not empty → Extract remaining URLs
   - If links not extracted → Extract missing links
   - If output incomplete → Regenerate output
   - If state corrupted → Fix state or start fresh

3. **Re-run verification:**
   - After fixes → Re-run all completion gates
   - If still fails → Repeat corrective action
   - Continue until ALL verification passes

4. **Log actions:**
   - Log what failed
   - Log corrective action taken
   - Log verification result after fix

**NEVER mark complete if verification fails. Always fix and re-verify.**

## Detailed Reference

For comprehensive implementation details, see:
- `references/DETAILED_WORKFLOW.md` - Complete step-by-step workflow with all critical requirements, error handling, and verification checklists
- `references/expand-dynamic-content.js` - Tab/accordion expansion logic
- `references/image-filtering.js` - Image identification and filtering
- `references/link-extraction.js` - Link discovery and normalization
- `references/sitemap-parser.js` - Sitemap file parsing
