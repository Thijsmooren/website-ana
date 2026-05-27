# Moonshots Podcast Idea Extractor — Project Handoff

**Last updated:** 2026-05-27  
**Repository:** `thijsmooren/website-ana`  
**Branch:** `claude/podcast-idea-extractor-LppIh`  
**Status:** Functional. Scraper must be run locally (see known issues). Extractor is fully operational.

---

## Table of Contents

1. [What this project does](#1-what-this-project-does)
2. [Repository layout](#2-repository-layout)
3. [How the two pieces fit together](#3-how-the-two-pieces-fit-together)
4. [Component 1 — Transcript Scraper](#4-component-1--transcript-scraper)
5. [Component 2 — Idea Extractor](#5-component-2--idea-extractor)
6. [The extraction prompt](#6-the-extraction-prompt)
7. [Output format](#7-output-format)
8. [End-to-end walkthrough](#8-end-to-end-walkthrough)
9. [Configuration reference](#9-configuration-reference)
10. [Known issues and gotchas](#10-known-issues-and-gotchas)
11. [Dependencies](#11-dependencies)
12. [Potential next steps](#12-potential-next-steps)

---

## 1. What this project does

This project reads podcast transcripts from *Moonshots with Peter Diamandis*, sends each one to OpenAI, and extracts up to 2 concrete business ideas per episode. Each idea is written to a structured Markdown file.

The pipeline is:

```
podscripts.co  →  podcast-scraper/scrape.py  →  transcripts/*.txt
                                                        ↓
                                   podcast-idea-extractor/main.py
                                                        ↓
                                              outputs/*_ideas.md
```

The two components are intentionally decoupled:
- You can scrape transcripts once and run the extractor many times.
- You can swap in transcripts from any source — the extractor only cares about `.txt` files.
- No database, no vector store, no web UI, no orchestration layer.

---

## 2. Repository layout

```
website-ana/
├── podcast-scraper/               # Step 1: get transcripts
│   ├── scrape.py                  # Main scraper script
│   ├── requirements.txt
│   ├── README.md
│   └── transcripts/               # Created on first run
│
├── podcast-idea-extractor/        # Step 2: extract ideas
│   ├── main.py                    # Main extraction script
│   ├── requirements.txt
│   ├── .env.example               # Copy to .env and add API key
│   ├── README.md
│   ├── prompts/
│   │   └── extract_ideas.txt      # System prompt sent to OpenAI
│   ├── transcripts/               # Input: put .txt files here
│   │   └── .gitkeep
│   └── outputs/                   # Output: Markdown idea files
│       └── .gitkeep
│
└── HANDOFF.md                     # This file
```

---

## 3. How the two pieces fit together

The scraper and extractor are separate directories with separate dependencies. They share data through the filesystem: the scraper writes `.txt` files; the extractor reads `.txt` files.

After scraping, copy or move the `transcripts/` folder into `podcast-idea-extractor/`:

```bash
cp -r podcast-scraper/transcripts/ podcast-idea-extractor/transcripts/
```

Or just run both tools from the same working directory and point them at the same folder — but the simplest approach is the copy above.

---

## 4. Component 1 — Transcript Scraper

**File:** `podcast-scraper/scrape.py`

### What it does

1. Fetches the episode listing page at `https://podscripts.co/podcasts/moonshots-with-peter-diamandis`
2. Collects episode URLs by finding all `<a>` tags whose `href` matches `/podcasts/moonshots-with-peter-diamandis/.+`
3. Handles pagination automatically by incrementing `?page=N` until enough episodes are found
4. For each episode URL, fetches the page and extracts the transcript text
5. Saves each transcript as `transcripts/<episode-slug>.txt`
6. Already-saved files are skipped on re-runs (idempotent)

### How to run

```bash
cd podcast-scraper
pip install -r requirements.txt

python scrape.py           # scrape 5 most recent episodes (default)
python scrape.py -n 20     # scrape 20 most recent episodes
python scrape.py -n 100    # scrape 100 episodes (paginated automatically)
```

### Key constants at the top of `scrape.py`

| Constant | Default | Purpose |
|---|---|---|
| `BASE_URL` | `https://podscripts.co` | Root of the site |
| `PODCAST_SLUG` | `moonshots-with-peter-diamandis` | Podcast path segment |
| `LISTING_URL` | derived | Full listing page URL |
| `OUTPUT_DIR` | `Path("transcripts")` | Where `.txt` files are saved |
| `DELAY` | `1.5` | Seconds to wait between requests (rate limiting) |

### Transcript selector logic

The `extract_transcript()` function tries these selectors in order, returning the first match:

1. Any element with a class matching `transcript` (case-insensitive)
2. Any element with a class matching `episode-content` or `content-body`
3. `<article>` tag
4. `<main>` tag

If the site's HTML changes and no transcript is found, the script prints a warning and skips that episode without crashing.

### IMPORTANT — must be run locally

**podscripts.co blocks cloud/datacenter IPs.** The server returns:

```
HTTP 403  x-deny-reason: host_not_allowed  "Host not in allowlist"
```

This cannot be bypassed with headers, proxies, or browser emulation libraries — the site checks the IP directly. **Run `scrape.py` on your own machine** (home WiFi or mobile data). Residential IPs are not blocked.

---

## 5. Component 2 — Idea Extractor

**File:** `podcast-idea-extractor/main.py`

### What it does

1. Loads `OPENAI_API_KEY` from `.env`
2. Reads all `.txt` files from `transcripts/` in alphabetical order
3. For each file, calls the OpenAI Responses API with the system prompt from `prompts/extract_ideas.txt`
4. Writes the model's response to `outputs/<stem>_ideas.md`
5. If one file fails (network error, bad API response, etc.), logs the error and continues with the next file

### How to run

```bash
cd podcast-idea-extractor

# First-time setup
cp .env.example .env
# Edit .env and set: OPENAI_API_KEY=sk-...

pip install -r requirements.txt

# Put transcript files into transcripts/ then:
python main.py
```

### File naming convention

| Input | Output |
|---|---|
| `transcripts/episode_001.txt` | `outputs/episode_001_ideas.md` |
| `transcripts/some-episode-slug.txt` | `outputs/some-episode-slug_ideas.md` |

The output filename is always `{input_stem}_ideas.md`.

### Key constants at the top of `main.py`

| Constant | Default | Purpose |
|---|---|---|
| `MODEL` | `"gpt-4.1-mini"` | OpenAI model to use — change here to upgrade |
| `TRANSCRIPTS_DIR` | `Path("transcripts")` | Where to look for `.txt` input files |
| `OUTPUTS_DIR` | `Path("outputs")` | Where to write Markdown output files |
| `PROMPT_FILE` | `Path("prompts/extract_ideas.txt")` | System prompt file path |

### API call structure

The extractor uses the **OpenAI Responses API** (`client.responses.create`), not the Chat Completions API. The call structure is:

```python
response = client.responses.create(
    model=MODEL,
    input=[
        {"role": "system", "content": <prompt from extract_ideas.txt>},
        {"role": "user",   "content": <transcript text>},
    ],
)
return response.output_text
```

The full transcript text is passed as the user message. There is no chunking — transcripts are sent whole. If a transcript is very long (100k+ tokens), you may hit context limits; in that case, consider truncating to the first 50,000 characters before sending.

### Error handling

| Condition | Behaviour |
|---|---|
| `transcripts/` doesn't exist | Creates it, prints a helpful message, exits cleanly |
| `outputs/` doesn't exist | Creates it silently |
| No `.txt` files in `transcripts/` | Prints a helpful message, exits cleanly |
| `OPENAI_API_KEY` not set | Raises `EnvironmentError` with a clear message |
| A single transcript fails | Logs the error, continues with the next file |

---

## 6. The extraction prompt

**File:** `podcast-idea-extractor/prompts/extract_ideas.txt`

This is the full system prompt sent to OpenAI for every transcript:

```
You are analyzing a Moonshots with Peter Diamandis podcast transcript.

Find only concrete business ideas, startup opportunities, moonshot opportunities,
or market gaps mentioned or strongly implied.

Extract at most 2 ideas.

For each idea, return:

## Idea title

One-sentence summary.

**Problem:**
**Opportunity:**
**Why now:**
**Evidence from episode:**
**Potential score:** (1-10, with one short reason)

If there are no real business ideas, say exactly:
No clear business idea found.
```

### Tuning the prompt

The prompt is in a plain text file — edit it directly without touching any Python code. Things worth experimenting with:

- **Raise the idea cap** — change "at most 2 ideas" to 3 or 5 if you want broader coverage
- **Tighten the criteria** — add "only extract ideas with a Potential score of 7 or higher" to filter weak signals
- **Change the output format** — add or remove fields (e.g., add "Comparable companies:") without touching `main.py`
- **Add episode metadata** — if you prepend the episode title/date to the transcript text before sending, the prompt can reference it in the Evidence field

---

## 7. Output format

Each output file is a Markdown document. If ideas are found:

```markdown
## [Idea title]

One-sentence summary of the idea.

**Problem:**
Description of the problem being solved.

**Opportunity:**
What someone could build as a business.

**Why now:**
Why this is becoming possible or urgent.

**Evidence from episode:**
Short quote or paraphrase from the transcript.

**Potential score:**
7/10 — reason for the score.
```

If no ideas are found, the file contains exactly:

```
No clear business idea found.
```

---

## 8. End-to-end walkthrough

### Step 1 — Scrape transcripts (run locally on your machine)

```bash
git clone https://github.com/thijsmooren/website-ana.git
cd website-ana/podcast-scraper

pip install -r requirements.txt
python scrape.py -n 10
# → transcripts/some-episode-slug.txt  (one file per episode)
```

### Step 2 — Copy transcripts to the extractor

```bash
cp -r transcripts/ ../podcast-idea-extractor/transcripts/
```

### Step 3 — Set up the extractor

```bash
cd ../podcast-idea-extractor
cp .env.example .env
# Open .env and set:  OPENAI_API_KEY=sk-...

pip install -r requirements.txt
```

### Step 4 — Run the extractor

```bash
python main.py
```

Console output looks like:

```
Processing: some-episode-slug.txt
Saved: outputs/some-episode-slug_ideas.md
Processing: another-episode.txt
Saved: outputs/another-episode_ideas.md
```

### Step 5 — Review outputs

```bash
ls outputs/
cat outputs/some-episode-slug_ideas.md
```

---

## 9. Configuration reference

### `podcast-scraper/scrape.py`

| What to change | Where | How |
|---|---|---|
| Number of episodes | CLI flag | `python scrape.py -n 20` |
| Request delay | `DELAY = 1.5` | Increase if getting rate-limited |
| Episode link pattern | `re.compile(rf"/podcasts/{PODCAST_SLUG}/.+")` | Update if URL structure changes |
| Transcript selector | `extract_transcript()` | Add/reorder CSS selectors to match updated site HTML |
| Output directory | `OUTPUT_DIR = Path("transcripts")` | Change to write files elsewhere |

### `podcast-idea-extractor/main.py`

| What to change | Where | How |
|---|---|---|
| OpenAI model | `MODEL = "gpt-4.1-mini"` | Change to `gpt-4.1`, `gpt-4o`, etc. |
| Transcripts directory | `TRANSCRIPTS_DIR` | Change the `Path(...)` value |
| Outputs directory | `OUTPUTS_DIR` | Change the `Path(...)` value |
| Prompt | `prompts/extract_ideas.txt` | Edit the text file directly |
| API key | `.env` file | `OPENAI_API_KEY=sk-...` |

---

## 10. Known issues and gotchas

### podscripts.co blocks cloud IPs
The site checks requesting IPs against an allowlist. Any cloud or datacenter IP (AWS, GCP, Azure, Render, Railway, Heroku, etc.) gets `HTTP 403 — Host not in allowlist`. **Only residential and mobile IPs work.** This is not a Cloudflare challenge — it cannot be bypassed with headers, cookies, or TLS fingerprint tools like `cloudscraper` or `curl_cffi`. Always run `scrape.py` on your local machine.

### Transcript selector may break
The scraper guesses at CSS class names since the site was unreachable from the build environment. If `scrape.py` runs but saves empty `.txt` files, inspect the episode page HTML in your browser (View Source or DevTools), find the element wrapping the transcript text, and update the selector list in `extract_transcript()`.

### Very long transcripts
The idea extractor sends the entire transcript as a single API call with no chunking. Most podcast transcripts are well within GPT-4.1-mini's context window (~128k tokens). If you ever process transcripts from longer sources, add a truncation step before the API call.

### Re-running the extractor overwrites outputs
`main.py` will overwrite existing output files on every run. If you want to preserve previous runs, either move the `outputs/` folder before re-running, or add a file-exists check similar to the one in `scrape.py`.

### Re-running the scraper is safe
`scrape.py` checks whether a `.txt` file already exists before fetching. Re-running with `-n 10` when 10 files are already saved will skip all of them. It is safe to re-run to pick up new episodes.

---

## 11. Dependencies

### `podcast-scraper/`

| Package | Version | Purpose |
|---|---|---|
| `requests` | `>=2.31.0` | HTTP requests to podscripts.co |
| `beautifulsoup4` | `>=4.12.0` | HTML parsing |

### `podcast-idea-extractor/`

| Package | Version | Purpose |
|---|---|---|
| `openai` | `>=1.30.0` | OpenAI Responses API client |
| `python-dotenv` | `>=1.0.0` | Load `OPENAI_API_KEY` from `.env` |

Both projects require **Python 3.10+** (use of `list[str]` type hints without `from __future__ import annotations`).

---

## 12. Potential next steps

These are intentionally not built — the project is designed to stay simple. Add only what you actually need.

| Idea | Effort | Notes |
|---|---|---|
| **Skip already-extracted episodes** | Low | Add a file-exists check in `main.py` like the one in `scrape.py` |
| **Batch all episodes in one API call** | Low | Use OpenAI Batch API to cut costs ~50% for large runs |
| **Add episode title/date to output** | Low | Parse it from the scraper and prepend to the transcript before sending |
| **Tune the prompt for higher quality** | Low | Edit `prompts/extract_ideas.txt` — no code changes needed |
| **Support other podcasts** | Low | Change `PODCAST_SLUG` in `scrape.py` and the podcast name in `extract_ideas.txt` |
| **Weekly automated run** | Medium | GitHub Actions workflow: checkout → install → run extractor → commit outputs |
| **Aggregate all ideas into one index** | Medium | Post-process `outputs/*.md` into a single `ALL_IDEAS.md` with a simple Python script |
| **Notion / Airtable export** | Medium | Add a third script that reads `outputs/` and posts to Notion API |
| **Smarter transcript chunking** | Medium | Split very long transcripts into segments, extract from each, deduplicate ideas |
| **Scored filtering** | Low | Add a post-processing step that only keeps ideas with Potential score ≥ 7 |
| **Switch to a different transcript source** | Medium | YouTube auto-captions via `yt-dlp` would bypass the podscripts.co IP block entirely |
