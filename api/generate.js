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

    const data = await response.text();

    try {
      return res.status(200).json(JSON.parse(data));
    } catch {
      return res.status(200).json({ raw: data });
    }

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
