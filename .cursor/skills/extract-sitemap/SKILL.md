---
name: extract-sitemap
description: Map all links from a starting webpage recursively up to 2 hops deep (depth 0, 1, 2 only - depth 3 is descoped), check link accessibility, and generate a sitemap markdown file. Use when the user wants to preview what pages would be extracted, discover site structure, or identify dead links before running extract-webpage-content.
---

# Extract Sitemap

Map all links from a starting webpage recursively up to 2 hops deep, check accessibility of each link, and generate a structured sitemap markdown file.

## When to Use

Use this skill when:
- User wants to preview what pages would be extracted before running `extract-webpage-content`
- User needs to discover site structure and understand link relationships
- User wants to identify dead links (404, 403, etc.) before extraction
- User mentions "map links," "sitemap," "preview extraction," or "check dead links"

**Do NOT use when:**
- User wants to extract actual page content (use `extract-webpage-content` instead)
- User only wants to check a single page's links (use browser tools instead)

## Execution Model

**Execute autonomously** - Complete the entire workflow without user approval for each action.

**CRITICAL - NO CONFIRMATION REQUESTS:**
- ❌ **NEVER ask** "Should I continue?" or "Do you want me to pause?"
- ❌ **NEVER ask** "There are X pages remaining, continue?"
- ❌ **NEVER ask** for approval between pages or batches
- ✅ **ALWAYS continue** until queue is empty and sitemap is generated
- ✅ **ALWAYS complete** the entire workflow automatically
- ✅ **ONLY report** progress updates, never ask for permission

**Required tools:** Playwright MCP (`user-playwright`) - does NOT require per-action approval
**Do NOT use:** cursor-ide-browser MCP - requires per-action approval (not suitable)

## Workflow

1. **Resume Logic (MANDATORY AT START)** - Check for existing state, resume if found (see Resume Logic section)
2. **Clean up Chrome processes** - Run `pkill -f "mcp-chrome-" && sleep 2` automatically before browser operations
3. **Initialize or resume** - Either start fresh or resume from saved state
4. **Navigate** - Install browser if needed, create tab, navigate to starting URL (or next URL in queue)
5. **Extract links** - Find all internal links using script from `references/link-extraction.js`
6. **Check accessibility** - Verify each link using script from `references/status-check.js`
7. **Process queue exhaustively** - Follow queue-based algorithm (see Recursive Mapping section) until queue is empty
8. **Progress tracking** - Log progress after every 10-20 pages (see Progress Tracking section)
9. **Completion gates** - Verify all gates pass before proceeding (see Completion Gates section)
10. **Generate sitemap** - Format as markdown table and save to workspace root (only after gates pass)
11. **Clean up** - Delete `sitemap-state.json` after successful completion

## Output Format

The sitemap file must follow this exact structure:

```markdown
# Sitemap: [Starting Page Title]

**Starting URL:** [URL]
**Generated:** [Date/Time]
**Last Updated:** [Date]
**Total Pages Mapped:** [count]
**Total Links Found:** [count]
**Dead Links:** [count]
**Max Depth:** 2 hops

## Summary Statistics

- ✅ Accessible Pages: [count]
- ❌ Dead Links (404): [count]
- 🔒 Forbidden (403): [count]
- ⚠️ Server Errors (500): [count]
- ⏱️ Timeouts: [count]
- 📄 Files: [count]

---

## Pages

| Title | URL | Depth | Status | Links Found |
|-------|-----|-------|--------|-------------|
| [Page Title] | [URL] | 0 | ✅ Accessible (200) | [count] |
| [Page Title] | [URL] | 1 | ✅ Accessible (200) | [count] |
| [Page Title] | [URL] | 2 | ❌ Dead Link (404) | N/A |
```

**Status values:**
- `✅ Accessible (200)` - Link works, page loaded successfully
- `❌ Dead Link (404)` - Page not found
- `🔒 Forbidden (403)` - Access denied
- `⚠️ Server Error (500)` - Server error
- `⏱️ Timeout` - Navigation timed out
- `📄 File` - Downloadable file (PDF, DOC, etc.)

**Depth values:**
- `0` - Starting page
- `1` - Links from starting page
- `2` - Links from depth 1 pages (maximum depth - depth 3 is descoped and not processed)

**File naming:** `sitemap-[sanitized-starting-url]-[timestamp].md` saved to workspace root

## Requirements

1. **Autonomous execution** - Execute entire workflow automatically without user approval
   - **NEVER ask for confirmation** - Continue processing until complete
   - **NEVER pause for approval** - Process all pages autonomously
   - **ONLY report progress** - Inform user of status, don't ask permission
2. **Complete link discovery** - Find ALL internal links on each page
3. **Exhaustive recursive mapping** - Follow ALL internal HTML page links recursively up to 2 hops deep - DO NOT stop until queue is empty
4. **Accessibility checking** - Check HTTP status for every link discovered
5. **Track visited URLs** - Prevent duplicate checks and infinite loops (normalize URLs: remove hash fragments and trailing slashes)
6. **State persistence** - Save progress to `sitemap-state.json` after every 10-20 pages
7. **Completion verification** - Verify queue is empty and all links processed before generating sitemap
8. **Table output** - Format as markdown table with columns: Title, URL, Depth, Status, Links Found

## Link Extraction

Use the script in `references/link-extraction.js` via `browser_evaluate`:
- Extracts all internal links (same domain)
- Identifies downloadable files (PDFs, DOCs, etc.) - mapped but not recursively followed
- Normalizes URLs (removes hash fragments, trailing slashes)
- Filters out anchors (#), javascript:, mailto:, tel: links

## Accessibility Checking

Use the script in `references/status-check.js` via `browser_evaluate`:
- Navigate to each link using `browser_navigate`
- Wait for page load: `browser_wait_for(time: 3)`
- Check for error indicators (404, 403, 500 in page content)
- Record status code and accessibility

## Recursive Mapping

**CRITICAL:** Execute recursive mapping for ALL internal HTML page links found. This MUST be completed exhaustively - do NOT stop until all discovered links have been processed.

### Queue-Based Algorithm (REQUIRED)

**You MUST implement this exact algorithm to ensure completeness. See `references/QUEUE_ALGORITHM.md` for detailed pseudocode.**

1. **Initialize state tracking:**
   - Create `visitedUrls` Set (normalized URLs already processed)
   - Create `pages` Array (all processed pages with metadata)
   - Create `queue` Array/Deque (URLs to process: `{url, depth}`)
   - Create `sitemap-state.json` file to persist state between tool calls

2. **Process starting page (depth 0):**
   - Navigate to starting URL
   - Extract links using `link-extraction.js`
   - Check accessibility using `status-check.js`
   - Add to `pages` array
   - Add starting URL to `visitedUrls`
   - Add ALL discovered internal HTML links to `queue` with `depth: 1`
   - Save state to `sitemap-state.json`

3. **Process queue until empty (CRITICAL - DO NOT STOP EARLY):**
   ```
   WHILE queue is not empty:
     a. Pop next item from queue: {url, depth}
     b. Normalize URL (remove hash, trailing slash)
     c. IF normalized URL in visitedUrls → skip (continue to next)
     d. IF depth >= 2 → skip (max depth reached - depth 3 is descoped and not processed)
     e. Add normalized URL to visitedUrls
     f. Navigate to URL
     g. Check accessibility (handle errors/timeouts)
     h. IF accessible:
        - Extract links using link-extraction.js
        - Add page to pages array with: {title, url, depth, status, linksFound: count}
        - IF depth < 2:
          - Add ALL discovered internal HTML links to queue with depth: depth + 1
     i. IF error/404/403:
        - Add page to pages array with: {title, url, depth, status: error, linksFound: 0}
        - Do NOT add links to queue (dead/forbidden pages)
     j. Save state to sitemap-state.json (after every 10-20 pages)
     k. Continue to next item in queue
     l. **NEVER ask for confirmation** - Process automatically until queue is empty
   ```

4. **Completion verification (BEFORE generating sitemap):**
   - Verify queue is empty: `queue.length === 0`
   - Verify all discovered links processed: Check that every URL in `pages` array has been fully processed
   - Count total links discovered vs processed:
     - Sum all `linksFound` values from `pages`
     - Verify all those links are either in `visitedUrls` or marked as dead/forbidden
   - If queue is NOT empty, continue processing until empty

5. **For file downloads:**
   - Check accessibility but do NOT add to queue
   - Add to `pages` array with status `📄 File`
   - Do NOT recursively follow links from files

### State Persistence

**Save state after every batch (10-20 pages) to `sitemap-state.json`:**

```json
{
  "startingUrl": "https://...",
  "startingTitle": "...",
  "visitedUrls": ["url1", "url2", ...],
  "pages": [
    {"title": "...", "url": "...", "depth": 0, "status": "✅ Accessible (200)", "linksFound": 16},
    ...
  ],
  "queue": [
    {"url": "...", "depth": 1},
    ...
  ],
  "lastUpdated": "2026-01-28T14:00:00Z"
}
```

**If interrupted:** Load state from `sitemap-state.json` and continue from where you left off.

## Resume Logic (MANDATORY AT START)

**ALWAYS execute this at the very start, before any processing:**

```python
def start_workflow():
    state_file = 'sitemap-state.json'
    
    # Step 1: Check for existing state
    if file_exists(state_file):
        state = load_state(state_file)
        print(f"Resuming from saved state: {len(state['pages'])} pages processed, {len(state['queue'])} URLs remaining")
        print(f"Last updated: {state['lastUpdated']}")
        
        # Verify state is valid
        if state['queue']:
            print(f"Continuing from queue: {len(state['queue'])} URLs to process")
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

### Progress Tracking (MANDATORY)

**Log progress after every batch (10-20 pages) - This is MANDATORY, not optional:**

```python
def log_progress(state):
    processed = len(state['pages'])
    remaining = len(state['queue'])
    depth_breakdown = {
        0: sum(1 for p in state['pages'] if p['depth'] == 0),
        1: sum(1 for p in state['pages'] if p['depth'] == 1),
        2: sum(1 for p in state['pages'] if p['depth'] == 2)
    }
    status_breakdown = {
        'accessible': sum(1 for p in state['pages'] if '✅' in p['status']),
        'dead': sum(1 for p in state['pages'] if '❌' in p['status']),
        'forbidden': sum(1 for p in state['pages'] if '🔒' in p['status'])
    }
    
    print(f"Progress: {processed} pages processed, {remaining} URLs remaining in queue")
    print(f"Depth breakdown: Depth 0: {depth_breakdown[0]}, Depth 1: {depth_breakdown[1]}, Depth 2: {depth_breakdown[2]}")
    print(f"Status breakdown: Accessible: {status_breakdown['accessible']}, Dead: {status_breakdown['dead']}, Forbidden: {status_breakdown['forbidden']}")
    
    # CRITICAL: If remaining > 0, explicitly state work is NOT complete
    if remaining > 0:
        print(f"⚠️ WARNING: {remaining} URLs still pending. Work is NOT complete. Continue processing.")
    else:
        print("✅ Queue empty. Proceeding to completion verification.")
```

**Progress logging is MANDATORY after every 10-20 pages. Never skip this step.**

### Common Mistakes to Avoid

❌ **DO NOT:**
- Stop processing when you've "demonstrated the pattern" - process ALL links
- Skip URLs because "there are too many" - process exhaustively
- Mark URLs as "visited" before actually processing them
- Generate sitemap while queue still has items
- Forget to extract links from accessible pages before moving on

✅ **DO:**
- Process queue until completely empty
- Extract ALL links from every accessible page
- Verify completion before generating final sitemap
- Save state frequently to prevent data loss
- Continue processing even if it takes many iterations

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
   - **Action:** Mark URL with appropriate status (❌ Dead Link (404), 🔒 Forbidden (403), ⚠️ Server Error (500))
   - **Action:** Continue with next URL (DO NOT stop)
   - **Log:** "Status [code] for [URL]. Marking appropriately and continuing."

### State Corruption

1. **Error:** Cannot load state file
   - **Action:** Backup corrupted state file first: `mv sitemap-state.json sitemap-state.json.backup`
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

## Completion Gates (MANDATORY)

**BEFORE marking task complete, ALL gates must pass. If ANY gate fails, work is NOT complete.**

### Gate 1: State Verification

```python
def verify_gate_1(state):
    # Load state
    if not file_exists('sitemap-state.json'):
        print("❌ Gate 1 FAILED: State file missing. Cannot verify completion.")
        return False
    
    state = load_state('sitemap-state.json')
    
    # Verify queue empty
    if len(state['queue']) > 0:
        print(f"❌ Gate 1 FAILED: Queue not empty: {len(state['queue'])} items remaining. Continue processing.")
        return False
    
    print("✅ Gate 1 PASSED: Queue is empty.")
    return True
```

**If Gate 1 fails:** Continue processing queue until empty. DO NOT mark complete.

### Gate 2: Progress Verification

```python
def verify_gate_2(state):
    # Count processed pages
    processed = len(state['pages'])
    
    # Count discovered links
    total_discovered = sum(p['linksFound'] for p in state['pages'])
    
    # Count processed URLs
    total_processed = len(state['visitedUrls'])
    
    # Verify all discovered links processed
    # (Some links may be dead/forbidden, so processed count may be less than discovered)
    # But every discovered link should be either in visitedUrls or marked as dead/forbidden
    dead_forbidden_count = sum(1 for p in state['pages'] if '❌' in p['status'] or '🔒' in p['status'] or '⚠️' in p['status'] or '⏱️' in p['status'])
    
    if total_processed + dead_forbidden_count < total_discovered:
        print(f"❌ Gate 2 FAILED: Not all links processed. Discovered: {total_discovered}, Processed: {total_processed}, Dead/Forbidden: {dead_forbidden_count}. Continue processing.")
        return False
    
    print(f"✅ Gate 2 PASSED: All discovered links processed ({total_discovered} discovered, {total_processed} processed, {dead_forbidden_count} dead/forbidden).")
    return True
```

**If Gate 2 fails:** Process remaining links. DO NOT mark complete.

### Gate 3: Output Verification

```python
def verify_gate_3(state, output_file):
    # Verify output file exists
    if not file_exists(output_file):
        print(f"❌ Gate 3 FAILED: Output file missing: {output_file}. Generate output before marking complete.")
        return False
    
    # Verify output file is non-empty
    if file_size(output_file) == 0:
        print(f"❌ Gate 3 FAILED: Output file empty: {output_file}. Generate output before marking complete.")
        return False
    
    # Verify output contains all processed pages
    output_content = read_file(output_file)
    pages_in_output = output_content.count('|') // 6  # Approximate count (6 columns per row)
    
    if pages_in_output < len(state['pages']):
        print(f"❌ Gate 3 FAILED: Output incomplete. Pages processed: {len(state['pages'])}, Pages in output: {pages_in_output}. Regenerate output.")
        return False
    
    print(f"✅ Gate 3 PASSED: Output file exists, is non-empty, and contains all processed pages.")
    return True
```

**If Gate 3 fails:** Generate/fix output. DO NOT mark complete.

### Completion Gate Execution

```python
def run_completion_gates(state, output_file):
    gates = [
        ('Gate 1: State Verification', verify_gate_1, state),
        ('Gate 2: Progress Verification', verify_gate_2, state),
        ('Gate 3: Output Verification', verify_gate_3, state, output_file)
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
   - Before marking complete → Verify `queue.length === 0`
   - If queue NOT empty → Continue processing (DO NOT mark complete)
   - Log: "Queue has X items remaining. Continuing processing."

2. **Progress Check:**
   - Before marking complete → Verify all discovered links processed
   - If gaps found → Continue processing (DO NOT mark complete)
   - Log: "X links discovered but Y not processed. Continuing."

3. **State Check:**
   - Before marking complete → Load state file
   - Verify state matches current progress
   - If mismatch → Fix state, continue processing

4. **Output Check:**
   - Before marking complete → Verify output file exists and is complete
   - If incomplete → Continue processing (DO NOT mark complete)

**If ANY check fails, work is NOT complete. Continue processing.**

## Completion Criteria (ALL MUST BE TRUE)

**Work is complete ONLY when ALL criteria are true:**

1. ✅ **Queue empty:** `queue.length === 0`
2. ✅ **All links processed:** Every discovered link either processed OR marked as dead/forbidden
3. ✅ **State saved:** State file reflects current progress
4. ✅ **Output generated:** Output file exists, is non-empty, contains all processed pages
5. ✅ **No pending work:** No URLs remaining to process
6. ✅ **Verification passed:** All completion gates passed

**If ANY criterion is false → Work is NOT complete. Continue processing.**

**Before marking complete, verify ALL criteria explicitly:**

```python
def is_complete(state, output_file):
    criteria = {
        'queue_empty': len(state['queue']) == 0,
        'all_links_processed': verify_gate_2(state),
        'state_saved': file_exists('sitemap-state.json') and state_matches_progress(state),
        'output_generated': file_exists(output_file) and file_size(output_file) > 0,
        'no_pending_work': len(state['queue']) == 0,
        'verification_passed': run_completion_gates(state, output_file)
    }
    
    all_passed = all(criteria.values())
    
    if not all_passed:
        failed = [k for k, v in criteria.items() if not v]
        print(f"❌ Completion criteria failed: {failed}")
        print("Continue processing until all criteria pass.")
        return False
    
    print("✅ All completion criteria passed. Work is complete.")
    return True
```

## If Verification Fails

**When completion verification fails, follow this procedure:**

1. **Identify failure reason:**
   - Queue not empty → Continue processing queue
   - Links not processed → Process remaining links
   - Output missing/incomplete → Generate/fix output
   - State corrupted → Fix state or start fresh

2. **Take corrective action:**
   - If queue not empty → Process remaining URLs
   - If links not processed → Extract/process missing links
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

## Handoff to extract-webpage-content

The sitemap file can be used as input to `extract-webpage-content`. Users can edit the sitemap file to remove URLs they don't want extracted before running content extraction.
