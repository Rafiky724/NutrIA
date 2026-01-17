import json
import re


def safe_parse_json(text: str) -> dict:
        """
        Try to safely parse a JSON object from a given text response.
        """

        if not text:
            raise ValueError("Respuesta vacía del LLM")

        # Delete extra spaces/newlines
        start = text.find("{")
        end = text.rfind("}")

        if start == -1 or end == -1:
            raise ValueError("No se encontró un objeto JSON en la respuesta")

        json_candidate = text[start:end + 1]

        # Delete comments (// ...)
        json_candidate = re.sub(r"//.*", "", json_candidate)

        # Try to parse the cleaned JSON
        try:
            return json.loads(json_candidate)
        except json.JSONDecodeError as e:
            raise ValueError(f"Error al parsear JSON del LLM: {e}")