# Server Script Generator

**Auto-generate `start-servers.sh`, `stop-servers.sh`, and `check-servers.sh` for ANY project.**  
Updated: 2025-11-17
Version v3.1 (2025-11-17) — Changes: Compacted README while keeping all core behavior and flows.

---

## 0. Executive Summary

- **What this is**: A reusable AI prompt that inspects any project folder and generates three Bash scripts to start, stop, and check all services (frontend, backend, databases, workers).
- **How to use (Cursor Chat)**:

  ```bash
  @generate-server-scripts.md @your-project-folder
  ```

- **What you get**:
  - `start-servers.sh` – auto-detects and starts all services with health checks.
  - `stop-servers.sh` – gracefully stops everything, then force-kills if needed.
  - `check-servers.sh` – port and PID health check with clear status output.
- **Best for**: Cloned projects you don’t fully understand yet, multi-service dev setups, and quickly bootstrapping local dev scripts across stacks.

---

## 0.5. When and Why This Actually Helps

### The Real Problem

You're switching between 4 projects. Each has frontend + backend + database. You can't remember:
- Which ports each one uses
- What the startup sequence is (database first? backend? does order matter?)
- Whether you already have something running (port conflicts mystery)
- How to check if everything's actually healthy
- Whether this project needs a virtualenv activated first

You waste **10-20 minutes every time you switch projects** just getting things running. Or you leave everything running all the time and your laptop sounds like a jet engine.

### When This Prompt Is Genuinely Useful

**Use it when:**
- **Multi-service projects** — You need to start 3+ services in the right order
- **Context switching** — You're working on 2+ projects and switching between them daily
- **Cloned projects** — You forked/cloned something without clear startup docs
- **Team onboarding** — New teammate needs to get running quickly
- **After weeks away** — You return to a project and forgot the entire setup

**Real example:** You cloned an AI chat app. It has: React+Vite frontend (5173), Flask backend (5000), Postgres (5432), and Redis for caching (6379). The README says "run the frontend and backend" but doesn't mention you need Postgres running first or the backend crashes with cryptic connection errors. This prompt detects all of that and generates scripts that start them in the right order with health checks.

### When This Is Overkill (Use Something Simpler)

**Skip this if:**
- **Single-service Next.js** — `npm run dev` is enough. Don't add complexity you don't need.
- **You have docker-compose** — Use that instead. It's more mature and handles networking better.
- **Mature startup scripts exist** — Don't replace working systems. If the project has good scripts, use them.
- **Solo simple projects** — Building a todo app with just frontend? You don't need this.

### The Honest Trade-off

**What you gain:**
- One-command startup across all your projects (`./start-servers.sh` becomes muscle memory)
- Consistent interface: every project has start/check/stop, same behavior
- Less mental overhead remembering project-specific quirks
- Forces your projects to have standard structure (ports in config, not hardcoded)

**What you give up:**
- Another abstraction layer to understand (the scripts themselves)
- Bash knowledge required to customize (though most people just generate and forget)
- If AI detects wrong ports/services, you need to fix the scripts manually

**My take:** If you're working on 1-2 simple projects, don't bother. If you're managing 4+ projects with multiple services each, this saves you hours per week and keeps you sane.

---

## 1. Quick Start

### 1.1 One-Liner (Recommended)

In Cursor Chat:

```bash
@generate-server-scripts.md @your-project-folder
```

**Example:**

```bash
@generate-server-scripts.md @valetudo-ai
```

You’ll get: a short project analysis + full contents of `start-servers.sh`, `stop-servers.sh`, `check-servers.sh` + where to save them and `chmod` commands.

### 1.2 Daily Workflow with Generated Scripts

**Morning:**

```bash
cd ~/Projects/my-chat-app
./start-servers.sh
# ✅ PostgreSQL already running on 5432
# ✅ Backend started on 5000 (PID 12345)
# ✅ Frontend started on 5173 (PID 12346)
# → Frontend: http://localhost:5173
# → Backend: http://localhost:5000
```

**Switching projects mid-day:**

```bash
cd ~/Projects/my-chat-app
./stop-servers.sh     # Stop current project

cd ~/Projects/another-app
./start-servers.sh    # Start different project
```

**Quick health check (is everything still running?):**

```bash
./check-servers.sh
# ✅ Frontend (5173): Running (PID 12346)
# ✅ Backend (5000): Running (PID 12345)
# ✅ PostgreSQL (5432): Running
```

**With logs (when debugging):**

```bash
./start-servers.sh && tail -f *.log           # Watch all logs
./check-servers.sh && tail -n 50 backend.log  # Check backend logs
```

**End of day:**

```bash
./stop-servers.sh     # Clean shutdown
# ✅ Frontend stopped
# ✅ Backend stopped
# ℹ️ PostgreSQL still running (shared across projects)
```

---

## 2. Prompt Reference

### 2.1 Full Auto-Detect Prompt (Copy/Paste)

Use this when you want the full explicit spec:

```text
Analyze the attached project folder and create 3 executable bash scripts:

1. start-servers.sh - Detect and start all servers (frontend, backend, database)
   in background. Check if already running, validate .env exists, wait for each to
   be ready, show access URLs.

2. stop-servers.sh - Stop all servers gracefully (SIGTERM first, then SIGKILL
   after 5sec timeout). Verify stopped, clean up logs.

3. check-servers.sh - Test connectivity to all detected ports, show process IDs,
   color-coded status (✅/❌).

Auto-detect from project files:
- Frontend: package.json, vite.config, next.config (React/Vue/Next/etc)
- Backend: app.py, server.js, requirements.txt (Flask/Express/Django/etc)
- Database: dependencies and configs (Postgres/Mongo/Redis/etc)
- Ports: from config files or use standard defaults
- Start commands: from package.json scripts or standard patterns
- Virtual envs: venv, .venv detection

Requirements:
- Use absolute paths for the detected project
- Handle errors: missing .env, ports in use, missing dependencies
- Background execution with nohup and log files
- Clear status messages with emojis
- Save all 3 scripts to project root
- Include chmod +x commands in your response

Show me: (1) What you detected, (2) Complete script contents, (3) Where to save them
```

### 2.2 Manual Template (For Non-Standard Setups)

If auto-detection isn’t quite right, fill this in and send it to AI:

```text
Create 3 server management scripts (start, stop, check) for my project:

PROJECT: [Your Project Name]
LOCATION: [/absolute/path/to/project]

FRONTEND:
- Tech: [React+Vite / Next.js / Vue / Angular / etc]
- Path: [./ or ./frontend]
- Command: [npm run dev / npm start]
- Port: [5173 / 3000 / 8080]

BACKEND:
- Tech: [Flask / Express / Django / FastAPI / etc]
- Path: [./backend or ./api]
- Command: [python app.py / node server.js]
- Port: [5000 / 3001 / 8000]
- Virtualenv: [venv / .venv / None]

DATABASE (optional):
- Type: [PostgreSQL / MongoDB / Redis / None]
- Start command: [brew services start postgresql / mongod]
- Port: [5432 / 27017 / 6379]

ENVIRONMENT:
- .env location: [./backend/.env or ./.env]
- Required vars: [PERPLEXITY_API_KEY, DATABASE_URL, etc]

Requirements:
✅ Start in background, check if already running
✅ Stop gracefully (SIGTERM), force if needed (SIGKILL)
✅ Check health + show PIDs + verify .env exists
✅ Handle errors (missing .env, ports in use)
✅ Color-coded output with emojis
✅ Use absolute paths
```

### 2.3 What AI Returns

- **Project analysis**: detected frontend, backend, database, environment, ports.
- **Three scripts**: ready-to-save `start-servers.sh`, `stop-servers.sh`, `check-servers.sh` with comments and error handling.
- **Setup instructions**: where to save, plus:

  ```bash
  chmod +x start-servers.sh stop-servers.sh check-servers.sh
  ./start-servers.sh
  ```

---

## 3. What AI Detects & How Scripts Behave

### 3.1 Files AI Looks At

```text
Your Project/
├── package.json              ← Dependencies, scripts, name
├── vite.config.js            ← Vite setup, port
├── next.config.js            ← Next.js setup
├── vue.config.js             ← Vue setup
├── requirements.txt          ← Python deps
├── app.py / manage.py        ← Flask / Django entry
├── server.js                 ← Express entry
├── .env / .env.local         ← Environment variables
├── venv/ or .venv/           ← Virtual environment
└── node_modules/             ← Dependencies installed
```

### 3.2 Detection Logic (Condensed)

- **Frontend**
  - Reads `package.json` + `vite.config` / `next.config` / `vue.config` to infer React/Vite/Next/Vue/etc.
  - Uses dev script (`npm run dev`, `npm start`, etc.) and detected/default port (5173, 3000, 8080, ...).
- **Backend**
  - Looks for `app.py`, `manage.py`, `server.js`, `requirements.txt` or backend `package.json`.
  - Infers Flask/Django/Express/FastAPI and appropriate start command and port (5000, 8000, 3000/3001, ...).
  - Detects virtualenvs (`venv/`, `.venv/`) for Python apps and activates them.
- **Database**
  - Infers presence from deps (e.g., `psycopg2`, `mongoose`, `redis`).
  - Uses standard ports (PostgreSQL 5432, MongoDB 27017, Redis 6379, etc.) and likely start commands.
- **Environment**
  - Locates `.env`, `.env.local`, `.env.development`, etc.
  - Validates required env vars exist before starting services and fails fast if missing.

### 3.3 Scripts at a Glance

- **`start-servers.sh`**
  - Validates `.env` and basic deps.
  - Checks if each service is already running (port or process).
  - Starts database → backend → frontend in correct order.
  - Uses `nohup ... &` with log files and a short wait, then prints URLs.

- **`stop-servers.sh`**
  - Sends SIGTERM first to all relevant processes.
  - After a short timeout, uses SIGKILL on anything still running.
  - Verifies services stopped and prints clear ✅/⚠️/❌ status.

- **`check-servers.sh`**
  - Pings each detected port (via `curl` or equivalent).
  - Shows process IDs and names for each service.
  - Uses emojis to show health and gives hints on what to try next.

---

## 4. Example Stacks (Conceptual)

These examples show how the same prompt adapts across stacks.

- **React + Flask (Valetudo AI)**
  - Frontend: React + Vite on port **5173**, command `npm run dev`, path `./`.
  - Backend: Flask on port **5000**, `python app.py`, path `./backend`, venv at `backend/venv/`.
  - Environment: `.env` at `backend/.env` with `PERPLEXITY_API_KEY`.
  - Scripts ensure venv is activated and `.env` exists before starting.

- **Next.js Full Stack**
  - Single Next.js app on port **3000**, `npm run dev`, path `./`.
  - Environment: `.env.local` with `DATABASE_URL`, `NEXTAUTH_SECRET`.
  - Scripts run in “single server mode” (combined frontend + backend).

- **Django + React + PostgreSQL**
  - Backend: Django (`manage.py`) on **8000**, venv at `venv/`.
  - Frontend: React (Webpack) in `./frontend`, `npm start` on **3000**.
  - Database: PostgreSQL via `psycopg2`, port **5432**, typically started via `brew services`.
  - Scripts start PostgreSQL first, then Django (with venv), then React.

- **Express + Vue + MongoDB**
  - Frontend: Vue in `./client`, `npm run serve` on **8080**.
  - Backend: Express in `./server`, `node server.js` (or `npm run server`) on **3001**.
  - Database: MongoDB with `mongoose`, `mongod --dbpath ./data/db` on **27017**.
  - Scripts coordinate MongoDB, then Express, then Vue, all with health checks.

---

## 5. Daily Commands & Emergency Operations

### 5.1 Core Commands (Generated Scripts)

```bash
./start-servers.sh    # Start everything
./check-servers.sh    # See status
./stop-servers.sh     # Stop everything
```

### 5.2 “Oh No, Something’s Stuck” Commands

**Kill by process name**

```bash
pkill -f vite                 # Kill Vite frontend
pkill -f "python app.py"      # Kill Flask backend
pkill -f "node server"        # Kill Node backend
pkill -f next                 # Kill Next.js
```

**Kill by port**

```bash
lsof -ti :5173 | xargs kill -9    # Kill port 5173
lsof -ti :5000 | xargs kill -9    # Kill port 5000
lsof -ti :3000 | xargs kill -9    # Kill port 3000
```

**Check what’s running**

```bash
lsof -i :5173                 # What's on port 5173?
lsof -i :5000                 # What's on port 5000?
ps aux | grep vite            # Find Vite processes
ps aux | grep python          # Find Python processes
```

**View logs**

```bash
tail -f frontend.log          # Watch frontend logs
tail -f backend/backend.log   # Watch backend logs
tail -f *.log                 # Watch all logs
```

**Nuclear option (common ports)**

```bash
# Kill all Node processes
pkill -f node

# Kill all Python processes
pkill -f python

for port in 3000 5000 5173 8000; do
    lsof -ti :$port | xargs kill -9 2>/dev/null
done
```

---

## 6. Troubleshooting & Setup Checklist

### 6.1 Common Issues

- **Port already in use**

  ```bash
  lsof -i :5173                   # See what's using the port
  lsof -ti :5173 | xargs kill -9  # Free it
  ```

- **Can’t connect to server**

  ```bash
  ./check-servers.sh      # Is it running?
  tail -f *.log           # Look for errors

  # If needed, try manual start to debug:
  cd backend && source venv/bin/activate && python app.py
  npm run dev
  ```

- **Virtualenv problems**

  ```bash
  rm -rf venv
  python -m venv venv
  source venv/bin/activate
  pip install -r requirements.txt
  ```

- **Missing `.env`**

  ```bash
  ls -la .env backend/.env
  cp .env.example .env
  cp backend/.env.example backend/.env
  ```

- **Dependencies not installed**

  ```bash
  npm install                       # Frontend
  source venv/bin/activate
  pip install -r requirements.txt   # Python backend
  cd backend && npm install         # Node backend
  ```

### 6.2 One-Time Setup for a New Project

```bash
git clone https://github.com/user/project
cd project

npm install                                  # Frontend deps
cd backend && pip install -r requirements.txt  # Backend deps

cp .env.example .env
cp backend/.env.example backend/.env

# In Cursor:
@generate-server-scripts.md @project

chmod +x *.sh
./check-servers.sh
./start-servers.sh
```

---

## 7. Reference: Ports & Bash Basics

### 7.1 Common Ports by Technology

```text
| Technology  | Default Port | Process Name     |
|-------------|-------------:|------------------|
| Frontend    |              |                  |
| Vite (React)|         5173 | vite             |
| CRA (React) |         3000 | webpack          |
| Next.js     |         3000 | next             |
| Vue CLI     |         8080 | vue              |
| Angular     |         4200 | ng               |
| Svelte      |         5000 | vite/sirv        |
| Backend     |              |                  |
| Flask       |         5000 | app.py           |
| Django      |         8000 | manage.py        |
| Express     |     3000/3001| node server.js   |
| FastAPI     |         8000 | uvicorn          |
| Rails       |         3000 | rails            |
| Go          |         8080 | main             |
| Database    |              |                  |
| PostgreSQL  |         5432 | postgres         |
| MongoDB     |        27017 | mongod           |
| Redis       |         6379 | redis-server     |
| MySQL       |         3306 | mysqld           |
| Elastic     |         9200 | elasticsearch    |
```

### 7.2 Bash Concepts You’ll See in Scripts

- **Process management**
  - `ps aux`, `ps aux | grep <name>`, `kill <PID>`, `kill -9 <PID>`, `pkill -f <pattern>`.
- **Ports**
  - `lsof -i :<port>`, `lsof -ti :<port>`, `netstat -an | grep <port>`.
- **Background jobs**
  - `command &`, `nohup command &`, `jobs`, `fg %1`, `bg %1`.
- **Logs**
  - `tail -f file.log`, `tail -n 50 file.log`, `grep ERROR *.log`.

---

## 8. Layout & Advanced Customization

### 8.1 Typical Layout with This Prompt

```text
$WORKSPACE_ROOT/
├── Helpful Prompts/
│   └── Server_Scripts/
│       └── generate-server-scripts.md   ← Main prompt
└── your-project/
    ├── start-servers.sh
    ├── stop-servers.sh
    ├── check-servers.sh
    ├── frontend.log
    └── backend/
        └── backend.log
```

Quick mental checklist:

- Start: `./start-servers.sh`
- Check: `./check-servers.sh`
- Stop: `./stop-servers.sh`
- Kill stuck server: `lsof -ti :PORT | xargs kill -9`
- Regenerate scripts for new services: `@generate-server-scripts.md @project`

### 8.2 Advanced Things You Can Ask AI to Add

- **Extra services**: Redis (6379), Elasticsearch (9200), Docker containers, background workers (Celery, Sidekiq, etc.).
- **Pre-flight checks**: Node ≥ 18, Python ≥ 3.9, required env vars present, DB connection valid.
- **Post-start actions**: run migrations, seed dev data, open browser to `http://localhost:XXXX`, tail logs for you.

---

## 9. Learning Path (Fast)

- **First run (≈5 minutes)**
  1. Open this README.
  2. In a real project: `@generate-server-scripts.md @valetudo-ai`.
  3. Save the scripts, `chmod +x *.sh`, run `./check-servers.sh` and `./start-servers.sh`.

- **Daily**
  - Use the three scripts as your default start/check/stop flow.
  - Glance at the generated Bash to level up your scripting intuition.

- **As projects grow**
  - Re-run the prompt whenever you add a backend, database, or new service.
  - Use the manual template for unusual architectures while keeping the same script behaviors.


