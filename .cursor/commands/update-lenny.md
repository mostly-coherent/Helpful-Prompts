# Update Lenny's Podcast Transcripts

Updates the local copy of Lenny's Podcast transcripts from the upstream ChatPRD repository.

## Overview

Pulls the latest transcripts from the original ChatPRD/lennys-podcast-transcripts repository while preserving your fork for contributions.

## What This Does

1. Switches to the Production_Clones/lennys-podcast-transcripts directory
2. Ensures you're on the main branch
3. Pulls latest changes from ChatPRD's upstream repository
4. Reports current status

## Steps

1. **Navigate to repository**
   ```bash
   cd "Production_Clones/lennys-podcast-transcripts"
   ```

2. **Switch to main branch** (if not already on it)
   ```bash
   git switch main
   ```

3. **Pull latest from upstream**
   ```bash
   git pull upstream main
   ```

4. **Show status**
   ```bash
   git log --oneline -3
   ```

## Expected Output

You should see:
- Confirmation of branch switch to main
- Git pull progress (or "Already up to date" if current)
- Recent commits from ChatPRD

## Notes

- This updates from ChatPRD (upstream), not your fork (origin)
- Your fork remains unchanged - this is read-only update
- If you have local uncommitted changes, stash them first
- To contribute back, work on a separate branch and push to origin

## Usage

Simply type `/update-lenny` in Cursor chat to run this workflow.
