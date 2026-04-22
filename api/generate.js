export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/TheMosti/PhysioAgentic",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
      }
    );

    const text = await response.text();

    try {
      return res.status(200).json(JSON.parse(text));
    } catch {
      return res.status(200).json({ raw: text });
    }

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
