# Podcast Transcript Scraper

Scrapes *Moonshots with Peter Diamandis* transcripts from [podscripts.co](https://podscripts.co) and saves each one as a `.txt` file.

Outputs drop directly into `transcripts/`, ready to feed into the idea extractor.

## Setup

```bash
pip install -r requirements.txt
```

## Usage

Scrape the 5 most recent episodes (default):

```bash
python scrape.py
```

Scrape a specific number of episodes:

```bash
python scrape.py -n 20
```

Transcripts are saved in `transcripts/` as `<episode-slug>.txt`. Already-saved episodes are skipped on re-runs.

## Feeding into the idea extractor

Copy (or symlink) the `transcripts/` folder to `podcast-idea-extractor/`, then run:

```bash
cd ../podcast-idea-extractor
python main.py
```

## Troubleshooting

**`No episode URLs found`** — the listing page HTML changed. Open `scrape.py` and update the `href` regex in `get_episode_urls()`.

**`no transcript text found`** — the episode page layout changed. Open `scrape.py` and update the CSS selectors in `extract_transcript()`.

**403 errors** — the site may have added stronger bot protection. Try adding a `Cookie` header from a real browser session.
