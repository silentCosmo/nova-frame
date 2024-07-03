"use client"
import { useEffect, useState } from 'react';
import { generateImageFromAPI } from '../utils/api';
import { Loading } from './Loading';
import { tips } from './Tips'


export default function Frame() {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('sd-xl');
  const [error, setError] = useState('');
  const [tipIndex, setTipIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (loading) {
      const getRandomIndex = () => {
        return Math.floor(Math.random() * tips.length);
      };

      const interval = setInterval(() => {
        setFade(false);
        setTimeout(() => {
          setTipIndex(getRandomIndex());
          setFade(true);
        }, 500); // Change tip every 5 seconds with a 500ms fade-out and fade-in
      }, 5500);

      return () => clearInterval(interval);
    }
  }, [loading]);

  const modelMap = {
    'sd-xl': {
      id: 'stabilityai/stable-diffusion-xl-base-1.0',
      description: 'This engine provides balanced performance suitable for most general use cases.',
    },
    'sd-v1.5': {
      id: 'runwayml/stable-diffusion-v1-5',
      description: 'Optimized for blending different artistic styles, offering creative flexibility.',
    },
    'sd-v3.0': {
      id: 'stabilityai/stable-diffusion-3-medium-diffusers',
      description: 'Most powerful enginge with advanced capabilities, Designed for high-quality creative outputs.',
    },
  };

  const generateImage = async () => {
    if (!prompt) {
      setError("Oops! The prompt cannot be empty.");
      return;
    }
    setLoading(true);
    setGeneratedImage(null);
    try {
      const imageUrl = await generateImageFromAPI(prompt, modelMap[selectedModel].id);
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    }
    setLoading(false);
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    setError(''); // Clear error when prompt changes
  };

  const handleDownload = () => {
    if (generatedImage) {
      // Create a temporary anchor element
      const anchor = document.createElement('a');
      anchor.href = generatedImage;
      anchor.download = `NovaFrame_generated_image.${prompt}.jpg`; // Set download file name
      anchor.click();
    }
  };

  const handleShare = async () => {
    if (generatedImage) {
      try {
        const response = await fetch(generatedImage);
        const blob = await response.blob();
        const file = new File([blob], 'novaframe.netlify.app_generated_image.png', { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'NovaFrame Generated Image',
            text: 'Check out this AI-generated image from NovaFrame!',
            files: [file],
          });
        } else {
          alert('Sharing is not supported on this browser.');
        }
      } catch (error) {
        console.error('Error sharing image:', error);
      }
    }
  };


  return (
    <section className="image-generator py-14 md:px-20 bg-gray-900 bg-opacity-5 text-slate-300 relative overflow-hidden h-full">
      <h2 className="md:text-3xl text-2xl text-center font-bold mb-10">AI-Powered Image Generator</h2>
      {/* <h6 className='text-center text-slate-400 mb-8'>Beyond Imagination: Discover New Visual Horizons</h6> */}
      <div className="md:px-28 px-6 mx-auto flex flex-col md:flex-row">
        {/* Left side: Inputs and Generate button */}
        <div className="w-full md:w-1/2 md:pr-4">
          <div className="mb-4">
            <label htmlFor="prompt" className="block mb-2">Prompt</label>
            <textarea
              rows={4}
              id="prompt"
              value={prompt}
              onChange={handlePromptChange}
              placeholder="To generate an image, enter a description of what you'd like to create. Let your imagination run wild!"
              className="w-full bg-gray-900 text-white border-2 border-gray-800 py-2 px-3 rounded-[0.150rem] focus:outline-none focus:border-blue-950"
            />
            {error && <p className="text-red-400 opacity-70 ml-2 mt-1">{error}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="model" className="block mb-2">Select Engine</label>
            <select
              id="model"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full bg-gray-900 text-white border-2 border-gray-600 py-2 px-4 rounded-[0.150rem] focus:outline-none focus:border-blue-900"
            >
              <option value="sd-xl">NovaLite</option>
              <option value="sd-v1.5" className="option-style">NovaBlend</option>
              <option value="sd-v3.0">NovaElite</option>
            </select>
            <div className="text-gray-500 text-sm ml-2 mt-2">
              {modelMap[selectedModel].description}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className={`btn bg-blue-700 hover:bg-blue-800 text-white text-base py-2 px-5 mt-3 tracking-wide rounded-sm ${loading ? 'loader' : ''}`}
              onClick={generateImage}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Image'}
            </button>
          </div>
          {generatedImage && (
            <div className="flex flex-col gap-4 w-max justify-center mx-auto mt-4">
              <button
                className="btn bg-purple-800 hover:bg-purple-900 text-white py-2 px-4 rounded-sm"
                onClick={handleDownload}
              >
                Download Image
              </button>
              <button
                className="btn bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-sm"
                onClick={handleShare}
              >
                Share Image
              </button>
            </div>
          )}
        </div>

        {/* Right side: Generated Image with animated frame */}
        <div className="w-full md:w-1/2 md:pl-4 mt-8 md:mt-0">
          <div className="frame h-full flex justify-center">
            {generatedImage ? (
              <img
                src={generatedImage}
                alt="Generated Image"
                className="rounded-md shadow-lg max-w-full max-h-[36rem]"
              />
            ) : loading ? (
              <div className="loading-container overflow-hidden">
                <div className="md:mt-9  rounded-sm rounded-b-lg overflow-hidden">
                  <p className={` text-slate-50 tracking-wider font-light bg-gradient-to-r from-blue-900 to-purple-900 drop-shadow-2xl shadow-black md:p-6 p-4 rounded-lg  ${fade ? 'slide-in' : 'slide-out'}`}>{tips[tipIndex]}</p>
                </div>
                <p className="my-7 text-slate-400 animate-pulse">Generating your image...</p>
                <Loading />

              </div>
            )
              : (
                <div className="rounded-md border-slate-700 shadow-lg w-full h-full items-center justify-center flex flex-col">
                  <p className="text-gray-600 md:text-center md:mt-0 mt-24">Your generated image will appear here</p>
                </div>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
