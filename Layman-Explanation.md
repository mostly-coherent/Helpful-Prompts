# Layman Explanation Prompt for Cursor IDE

> **Purpose:** Ensure AI coding assistants in Cursor IDE always explain technical work in simple, understandable terms after completing coding or configuration tasks.

## Rule: Communication After Technical Work (MANDATORY)

**After completing any coding, configuration, or technical implementation work, ALWAYS provide a layman's explanation.**

**Applies to:** ALL LLMs used in Cursor IDE - this includes Composer, Chat, and any other AI feature or model you use within Cursor. The rule applies universally across all AI interactions in Cursor, not just specific features.

### Requirements:
- **When:** After every coding/configuration task is complete
- **What:** Explain what was done in simple, non-technical language
- **Who:** Written for someone without coding knowledge
- **Scope:** Code changes, technical configuration, database changes, API integrations, etc.
- **NOT required for:** Documentation or editorial work (already in natural language)

### Explanation Format:

Provide explanations using these seven sections:

1. **What problem were we solving?** 
   - Why did we need to do this? Describe the issue or need in context - what was broken, missing, or inefficient? What was the user experiencing or what gap existed?

2. **Why is it important?** 
   - What impact does solving this have? Why does it matter for the user experience, system reliability, or project goals? What happens if we don't fix it?

3. **What did we change?** 
   - What files/parts of the system were affected? Which components, pages, or features were modified? Were any new pieces added or old ones removed?

4. **How does it work now?** 
   - What happens when someone uses it? Walk through the user experience step-by-step. How does the system behave differently than before?

5. **What are the risk or complexity introduced? / What can go wrong?** 
   - What new risks or complexity did we add? Any important limitations or things to watch for? What edge cases might break? Are there any known issues or trade-offs we made?

6. **What you could have learned?** 
   - What concepts, patterns, or approaches were used here? What general principles or techniques could be applied elsewhere?

7. **How to improve from here on?** 
   - What are the next logical steps? Are there obvious enhancements, optimizations, or related features that would make sense to tackle next?

### Example:

❌ **Too technical:**
> "Refactored the API route handler to use async/await pattern and added error boundary middleware with Zod schema validation."

✅ **Layman's terms:**

- **What problem were we solving?** The app was crashing whenever it tried to save data to the database. If the internet was slow or the database was busy, users would see a blank white screen with an error message. This was frustrating because they'd lose their work and have to start over.

- **Why is it important?** When apps crash unexpectedly, users lose trust and stop using them. A reliable app needs to handle problems gracefully - like a car that doesn't stall when you hit a pothole, but instead keeps running smoothly.

- **What did we change?** We updated the code that handles saving data (the "save" button functionality). We also added a new safety system that catches errors before they crash the whole page.

- **How does it work now?** When you click save, the app tries to save your data. If something goes wrong (like a network issue), instead of crashing, it shows a friendly message like "Oops, couldn't save right now. Please try again." Your work stays on the screen, so you don't lose anything.

- **What are the risk or complexity introduced? / What can go wrong?** We've added a new error handling system, which means there's more code to maintain. If the database is completely offline for a long time, users still won't be able to save. The app will keep asking them to try again, but it won't automatically retry forever - that would waste resources. Also, if someone enters invalid data, they'll see an error message explaining what needs to be fixed. The complexity comes from having to test all these different error scenarios to make sure they work correctly.

- **What you could have learned?** This demonstrates the principle of "graceful degradation" - when things break, fail in a way that's helpful rather than destructive. It's like having a backup plan that kicks in automatically. The error handling pattern we used here can be applied anywhere the app talks to external services.

- **How to improve from here on?** We could add automatic retry logic (try saving again after a few seconds), or save drafts locally so work isn't lost even if the internet disconnects. We could also add better error messages that tell users exactly what went wrong and how to fix it.

## How to Use This Prompt in Cursor IDE

This prompt is designed specifically for Cursor IDE and works with any LLM you use within Cursor (Claude, GPT-4, GPT-3.5, etc.). It ensures consistent explanations regardless of which AI feature you're using.

### Integration Options:

Choose the option that fits your workflow:

**Option 1: Workspace-Specific (Single Workspace)**
- **Add to `.cursorrules`** in your workspace root
- **Best for:** Working on one primary workspace with unique needs
- **Effect:** Rule applies only to this workspace
- **Example:** `/Users/yourname/my-project/.cursorrules`

**Option 2: Universal (All Workspaces)**
- **Add to Cursor Settings → User Rules**
- **Best for:** Consistent behavior across all your Cursor workspaces
- **Effect:** Rule applies to every workspace you open in Cursor
- **How:** Cursor Settings → Rules → User Rules → Paste the "Rule: Communication After Technical Work" section

**Why These Options?**
- `.cursorrules` = workspace-specific configuration (like project settings)
- User Rules = universal preferences (like IDE-wide settings)
- Cursor reads both and applies them to all AI features (Composer, Chat, inline suggestions, etc.)

**Recommendation:** Use **Option 2 (User Rules)** if you want laymen explanations across all your projects. Use **Option 1 (.cursorrules)** if you only need it for specific projects.

### For Other IDEs or Tools:

If you're using this prompt outside of Cursor IDE, adapt it to your tool's configuration system:
- **VS Code with AI extensions:** Add to workspace settings or extension configuration
- **Other AI assistants:** Include in system instructions or workspace configuration
- **Team documentation:** Share this file to establish consistent communication standards

