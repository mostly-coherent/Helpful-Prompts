# Extract Page Shallow

Extract complete content from a single webpage and its direct links only (depth 0 + depth 1). Does NOT recursively follow links beyond the first level. Use when you need focused extraction without deep crawling.

## When to Use

Use this skill when:
- User requests extracting a webpage and its immediate linked pages
- User wants shallow extraction (page + direct links only)
- User mentions "extract this page and links" or "shallow extraction"
- User wants to avoid deep recursive crawling

**Do NOT use when:**
- User needs deep recursive extraction (use extract-webpage-content instead)
- User wants to browse or navigate pages manually

## Execution Model

**Execute autonomously** - Complete the entire workflow without user approval for each action.

**Required tools:** Playwright MCP (`user-playwright`)

## Scope

**Depth 0:** Starting page (the URL provided by user)
**Depth 1:** Direct links found on the starting page
**Depth 2+:** NOT EXTRACTED (this is the key difference from extract-webpage-content)

## Workflow

1. **Navigate to starting page** (Depth 0)
   - Clean up Chrome processes: `pkill -f "mcp-chrome-" && sleep 2`
   - Navigate to target URL
   - Expand all dynamic content (accordions, tabs, etc.)

2. **Extract starting page content** (Depth 0)
   - Extract all text content (headings, paragraphs, lists)
   - Capture full-page screenshot
   - Extract all internal links found on this page
   - Save to folder: `[Page_Title]/[Page_Title]_Full_Content.md`

3. **Extract direct linked pages** (Depth 1)
   - For each internal link found on starting page:
     - Navigate to linked page
     - Expand dynamic content
     - Extract text content
     - Capture screenshot if needed
     - Save to subfolder: `[Page_Title]/[Linked_Page_Title]/[Linked_Page_Title]_Full_Content.md`
   - **DO NOT extract links from these depth 1 pages** (no depth 2)

4. **Progress tracking**
   - Report: "Extracted depth 0: [starting page]"
   - Report: "Extracting depth 1: [X] direct links found"
   - Report progress every 5-10 pages

5. **Save output**
   - Markdown files in nested folder structure
   - Images saved alongside markdown files
   - No state file needed (small scope, runs quickly)

## Output Format

**Directory Structure:**
```
[Page_Title]/
├── [Page_Title]_Full_Content.md
├── [page-title]-image-1.png
├── [Linked_Page_1]/
│   └── [Linked_Page_1]_Full_Content.md
├── [Linked_Page_2]/
│   └── [Linked_Page_2]_Full_Content.md
└── ...
```

**Markdown Format:**
- Images inserted at position in content flow
- Images saved as files in same folder
- Document references: `![alt](filename.png)` (relative path)

## Key Differences from extract-webpage-content

| Feature | extract-page-shallow | extract-webpage-content |
|---------|---------------------|-------------------------|
| **Depth** | Depth 0 + 1 only | Depth 0 + 1 + 2 |
| **Link following** | Direct links only | Links + links-from-links |
| **State persistence** | Not needed (quick) | Required (long-running) |
| **Use case** | Focused extraction | Comprehensive site crawl |
| **Completion time** | Minutes | Hours (potentially) |

## Error Handling

**Navigation errors:**
- Retry up to 3 times
- Mark page as error, continue with next page
- DO NOT stop entire extraction

**Authentication required:**
- Log warning: "Page requires authentication"
- Skip page, continue with remaining pages

**404/403/500 errors:**
- Log error with status code
- Skip page, continue with remaining pages

## Requirements

1. **Autonomous execution** - No user approval needed between pages
2. **Complete extraction** - Expand all dynamic elements
3. **Filter decorative images** - Only content images (skip logos, icons, nav)
4. **Shallow only** - NEVER extract beyond depth 1
5. **Structured output** - Nested folders with descriptive names
6. **Progress reporting** - Log every 5-10 pages

## Completion Criteria

Work is complete when:
1. ✅ Starting page (depth 0) extracted
2. ✅ All direct links (depth 1) extracted or marked as error
3. ✅ All output files created and non-empty
4. ✅ NO depth 2 pages extracted

## Example Usage

**User:** "Extract this page and its direct links: https://example.com/course"

**Agent:**
1. Extracts https://example.com/course (depth 0)
2. Finds 15 internal links on the page
3. Extracts each of those 15 pages (depth 1)
4. **STOPS** - does not follow links from those 15 pages
5. Reports: "Extracted 1 page at depth 0, 15 pages at depth 1. Total: 16 pages."

## Technical Implementation

See [REFERENCE.md](REFERENCE.md) for:
- Complete extraction algorithm
- Dynamic content expansion logic
- Link filtering and normalization
- Error recovery procedures
