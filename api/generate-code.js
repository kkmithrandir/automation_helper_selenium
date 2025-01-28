import { HfInference } from "@huggingface/inference";

export default async function handler(req, res) {
  const { inputText } = req.body;

  const client = new HfInference(process.env.HUGGING_FACE_TOKEN);

  try {
    const output = await client.textGeneration({
      model: "meta-llama/Llama-3.2-1B", // Replace with your desired model
      inputs: `Convert the following plain English instructions into Selenium Java code:\n\n${inputText}`,
      parameters: {
        max_new_tokens: 500, // Adjust as needed
        temperature: 0.7, // Adjust for creativity
      },
    });
    res.status(200).json({ code: output.generated_text.trim() });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate code" });
  }
}
