import os
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

MODEL = "gpt-4.1-mini"
TRANSCRIPTS_DIR = Path("transcripts")
OUTPUTS_DIR = Path("outputs")
PROMPT_FILE = Path("prompts/extract_ideas.txt")


def load_prompt() -> str:
    return PROMPT_FILE.read_text(encoding="utf-8")


def extract_ideas(client: OpenAI, prompt: str, transcript: str) -> str:
    response = client.responses.create(
        model=MODEL,
        input=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": transcript},
        ],
    )
    return response.output_text


def main() -> None:
    if not TRANSCRIPTS_DIR.exists():
        TRANSCRIPTS_DIR.mkdir(parents=True)
        print(
            f"Created '{TRANSCRIPTS_DIR}/' — add .txt transcript files there and re-run."
        )
        return

    OUTPUTS_DIR.mkdir(parents=True, exist_ok=True)

    txt_files = sorted(TRANSCRIPTS_DIR.glob("*.txt"))
    if not txt_files:
        print(
            f"No .txt files found in '{TRANSCRIPTS_DIR}/'. "
            "Add transcript files and re-run."
        )
        return

    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise EnvironmentError(
            "OPENAI_API_KEY is not set. Copy .env.example to .env and fill it in."
        )

    client = OpenAI(api_key=api_key)
    prompt = load_prompt()

    for txt_path in txt_files:
        print(f"Processing: {txt_path.name}")
        try:
            transcript = txt_path.read_text(encoding="utf-8")
            ideas = extract_ideas(client, prompt, transcript)
            output_path = OUTPUTS_DIR / f"{txt_path.stem}_ideas.md"
            output_path.write_text(ideas, encoding="utf-8")
            print(f"Saved: {output_path}")
        except Exception as exc:
            print(f"Error processing {txt_path.name}: {exc}")


if __name__ == "__main__":
    main()
