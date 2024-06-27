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


/* export async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify({inputs:data}),
		}
	);
  
	const result = await response.blob();
	return result;
}
query({"inputs": "Astronaut riding a horse"}).then((response) => {
	// Use image
  console.log('res:'+response);
}); */

/* 
export async function generateImageFromAPI(prompt) {
  const response = await fetch('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0', {
    method: 'POST',
    headers: {
      'Authorization': "Bearer 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",
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs: 'prompt' }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate image');
  }

  const result = await response.json();
  return result.generated_image_url; // Assuming the API returns a URL to the generated image
}
 */