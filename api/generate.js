export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/TheMosti/PhysioAgentic",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
      }
    );

    const text = await response.text(); // IMPORTANT FIX

    try {
      const data = JSON.parse(text); // try JSON
      return res.status(200).json(data);
    } catch (e) {
      // if NOT JSON, return raw text safely
      return res.status(200).json({ raw: text });
    }

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
