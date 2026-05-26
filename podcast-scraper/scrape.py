import argparse
import re
import time
from pathlib import Path

import requests
from bs4 import BeautifulSoup

BASE_URL = "https://podscripts.co"
PODCAST_SLUG = "moonshots-with-peter-diamandis"
LISTING_URL = f"{BASE_URL}/podcasts/{PODCAST_SLUG}"
OUTPUT_DIR = Path("transcripts")
DELAY = 1.5  # seconds between requests — be polite

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}


def fetch(url: str) -> BeautifulSoup:
    response = requests.get(url, headers=HEADERS, timeout=15)
    response.raise_for_status()
    return BeautifulSoup(response.text, "html.parser")


def get_episode_urls(n: int) -> list[str]:
    urls: list[str] = []
    page = 1

    while len(urls) < n:
        paged_url = LISTING_URL if page == 1 else f"{LISTING_URL}?page={page}"
        print(f"Fetching episode list (page {page})...")
        soup = fetch(paged_url)

        links = soup.find_all(
            "a", href=re.compile(rf"/podcasts/{PODCAST_SLUG}/.+")
        )
        seen = set(urls)
        new_urls = [
            BASE_URL + a["href"]
            for a in links
            if a["href"] not in seen
        ]

        if not new_urls:
            print(f"No more episodes found after page {page - 1}.")
            break

        urls.extend(new_urls)
        page += 1
        time.sleep(DELAY)

    return urls[:n]


def extract_transcript(soup: BeautifulSoup) -> str:
    # Try selectors from most specific to least — adjust if site structure changes
    candidates = [
        soup.find(class_=re.compile(r"transcript", re.I)),
        soup.find(class_=re.compile(r"episode.?content|content.?body", re.I)),
        soup.find("article"),
        soup.find("main"),
    ]
    for el in candidates:
        if el:
            return el.get_text(separator="\n", strip=True)
    return ""


def slugify(url: str) -> str:
    return url.rstrip("/").split("/")[-1]


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Scrape recent Moonshots with Peter Diamandis transcripts"
    )
    parser.add_argument(
        "-n", "--count",
        type=int,
        default=5,
        help="Number of most recent episodes to scrape (default: 5)",
    )
    args = parser.parse_args()

    OUTPUT_DIR.mkdir(exist_ok=True)

    episode_urls = get_episode_urls(args.count)
    if not episode_urls:
        print(
            "No episode URLs found. The page structure may have changed — "
            "inspect the listing page HTML and update the link selector in scrape.py."
        )
        return

    print(f"\nFound {len(episode_urls)} episode(s). Downloading transcripts...\n")

    for url in episode_urls:
        slug = slugify(url)
        out_path = OUTPUT_DIR / f"{slug}.txt"

        if out_path.exists():
            print(f"Skipping (already saved): {out_path.name}")
            continue

        print(f"Scraping: {url}")
        try:
            soup = fetch(url)
            text = extract_transcript(soup)
            if not text.strip():
                print(
                    f"  Warning: no transcript text found for '{slug}'.\n"
                    "  The transcript selector may need updating in scrape.py."
                )
                continue
            out_path.write_text(text, encoding="utf-8")
            print(f"Saved: {out_path}")
        except Exception as exc:
            print(f"  Error scraping {url}: {exc}")

        time.sleep(DELAY)

    print("\nDone.")


if __name__ == "__main__":
    main()
