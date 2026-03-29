from google import genai
from app.core.config import settings

client = genai.Client(api_key=settings.GOOGLE_API_KEY)
#model = "gemini-2.5-flash"

async def ask_llm(prompt: str, model: str) -> str:

    response = await client.aio.models.generate_content(
        model=model,
        contents=prompt
    )

    return response.text