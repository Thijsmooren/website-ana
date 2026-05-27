# Podcast Idea Extractor

Extracts business ideas from *Moonshots with Peter Diamandis* podcast transcripts using the OpenAI Responses API.

## Setup

### 1. Install dependencies

```bash
pip install -r requirements.txt
```

### 2. Add your API key

```bash
cp .env.example .env
```

Open `.env` and set your key:

```
OPENAI_API_KEY=your-api-key-here
```

### 3. Add transcripts

Place `.txt` transcript files in the `transcripts/` directory:

```
transcripts/episode_001.txt
transcripts/episode_002.txt
```

### 4. Run

```bash
python main.py
```

### 5. Find your outputs

One Markdown file is written to `outputs/` for each transcript:

```
outputs/episode_001_ideas.md
outputs/episode_002_ideas.md
```

If no clear business idea is found in an episode, the file will contain:

```
No clear business idea found.
```

## Output format

Each idea follows this structure:

```markdown
## Idea title

One-sentence summary.

**Problem:**  
**Opportunity:**  
**Why now:**  
**Evidence from episode:**  
**Potential score:**  
```

At most 2 ideas are extracted per episode.
