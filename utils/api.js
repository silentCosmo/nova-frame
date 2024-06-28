// utils/api.js
export async function generateImageFromAPI(prompt,modelId) {
  const apiToken = process.env.NEXT_PUBLIC_HF_API_TOKEN; // Replace with your actual token
  const response = await fetch(
    `https://api-inference.huggingface.co/models/${modelId}`,
    {
      headers: { Authorization: `Bearer ${apiToken}` },
      method: 'POST',
      body: JSON.stringify({ inputs: prompt }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    console.error('Error response from API:', error);
    throw new Error(error.error || 'Failed to generate image');
  }

  const result = await response.blob();
  return URL.createObjectURL(result); // Create an object URL to display the image
}