"use client"
import { useEffect, useState } from 'react';
import { generateImageFromAPI } from '../utils/api';
import { Loading } from './Loading';
import { tips } from './Tips'
import { randomPrompts } from '../utils/PromptSample';


export default function Frame() {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('sd-xl');
  const [error, setError] = useState('');
  const [tipIndex, setTipIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [exampleClicked, setExampleClicked] = useState(false);


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
      }, 7500);

      return () => clearInterval(interval);
    }
  }, [loading]);


  const modelMap = {
    'sd-xl': {
      ids: ['stabilityai/stable-diffusion-xl-base-1.0', 'mann-e/Mann-E_Turbo'],
      description: 'Balanced performance suitable for basic use cases.',
    },
    'sd-v1.4': {
      ids: ['CompVis/stable-diffusion-v1-4', '/mann-e/mann-e', 'fluently/Fluently-v2.5', 'fluently/Fluently-v2', 'fluently/Fluently-epic', 'fluently/Fluently-v1', 'ehristoforu/dreamdrop', 'mann-e/mann-e_rev-3', 'SG161222/Paragon_V1.0'],
      description: 'This engine provides balanced performance capable for most general use cases.',
    },
    'sd-v1.5': {
      ids: ['runwayml/stable-diffusion-v1-5', 'fluently/Fluently-v4', 'fluently/Fluently-v3', 'fluently/Fluently-v4-LCM', 'SG161222/Realistic_Vision_V6.0_B1_noVAE', 'SG161222/Realistic_Vision_V5.1_noVAE'],
      description: 'Optimized for blending different artistic styles, offering creative flexibility.',
    },
    'sd-v3.0': {
      ids: ['stabilityai/stable-diffusion-3-medium-diffusers'],
      description: 'Powerful engine with advanced capabilities, designed for high-quality creative outputs. [beta]',
    },
    'sdxl-me': {
      ids: ['mann-e/Mann-E_Dreams'],
      description: 'This engine used thousands of generated visionaries in order to make it possible to make high-quality images. [beta]',
    },
    'mlt': {
      ids: ['alvdansen/m3lt'],
      description: 'A new engine for exploring surreal themes and soft tones. [beta]',
    },
    'rae': {
      ids: ['Raelina/Rae-Diffusion-XL-V2', 'yodayo-ai/kivotos-xl-2.0'],
      description: 'Meticulously optimized to excel in depicting anime characters, pushing the boundaries of creativity. [beta]',
    },
    'ani': {
      ids: ['cagliostrolab/animagine-xl-3.1'],
      description: 'Meticulously optimized to excel in depicting anime characters, pushing the boundaries of creativity. [beta]',
    },
    'hand': {
      ids: ['alvdansen/littletinies'],
      description: 'A classic engine for hand drawn cartoon style. [beta]',
    },
    'toon': {
      ids: ['alvdansen/midsommarcartoon'],
      description: 'A retro-style cartoon print model that blends a bit of an anime influence with classic northern european cartoons. [beta]',
    },
    'fxl': {
      ids: ['RunDiffusion/Juggernaut-X-v10','RunDiffusion/Juggernaut-XL-v8','fluently/Fluently-XL-v4', 'fluently/Fluently-XL-v3', 'fluently/Fluently-v3.5', 'fluently/Fluently-XL-v3-Lightning', 'fluently/Fluently-XL-v1', 'recoilme/colorfulxl'],
      description: 'Correct anatomy, Art and realism in one, Controling contrast, Great nature, Great faces without AfterDetailer [beta]',
    },
    'real': {
      ids: ['SG161222/RealVisXL_V4.0', 'SG161222/RealVisXL_V4.0_Lightning', 'RunDiffusion/Juggernaut-X-Hyper', 'RunDiffusion/Juggernaut-XL-Lightning'],
      description: `The engine is aimed at photorealism. Can produce realistic images at decent quality. [beta]`,
    },
    'eclipse': {
      ids: ['fluently/Fluently-XL-Final'],
      description: 'Art and realism in one, The engine was obtained through training on expensive graphics accelerators. [beta]',
    },
    'nsfw': {
      ids: ['UnfilteredAI/NSFW-gen-v2.1', 'UnfilteredAI/NSFW-gen-v2', 'UnfilteredAI/NSFW-GEN-ANIME-v2', 'UnfilteredAI/NSFW-GEN-ANIME'],
      description: 'Push the boundaries to explore new dimensions of mature artistic expression and dive into a world where imagination is the only limit! [beta]',
    },
  };


  const alvdansenModels = ['mlt', 'hand', 'toon'];

  const generateImage = async () => {
    if (!prompt) {
      setError("Oops! The prompt cannot be empty.");
      return;
    }
    setLoading(true);
    setGeneratedImage(null);
    setError('');

    const modelIds = modelMap[selectedModel].ids;

    for (let i = 0; i < modelIds.length; i++) {
      try {
        let uniquePrompt = prompt;
        if (alvdansenModels.includes(selectedModel)) {
          uniquePrompt = `${prompt} - ${new Date().getTime()}`;
        }
        const imageUrl = await generateImageFromAPI(uniquePrompt, modelIds[i]);
        setGeneratedImage(imageUrl);
        setLoading(false);
        return;
      } catch (error) {
        //console.error(`Error generating image with model ${modelIds[i]}:`, error);
      }
    }

    setError(`Oh no! The selected engine is taking a nap. Try another engine while it recharges!`);

    setLoading(false);
  };
 

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    setError(''); // Clear error when prompt changes
    if (e.target.value.length > 0) {
      setExampleClicked(false);
    }
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
    <section className="image-generator py-14 md:px-20 bg-gray-900 bg-opacity-5 text-blue-100 relative overflow-hidden h-full">
      <h2 className="md:text-3xl text-2xl text-center font-bold mb-10">AI-Powered Image Generator</h2>
      {/* <h6 className='text-center text-slate-400 mb-8'>Beyond Imagination: Discover New Visual Horizons</h6> */}
      <div className="md:px-28 px-6 mx-auto flex flex-col md:flex-row">
        {/* Left side: Inputs and Generate button */}
        <div className="w-full md:w-1/2 md:pr-4 text-slate-400">
          <div className="mb-4">
            <div className='flex row justify-between'>
              <label htmlFor="prompt" className="block mb-2">Prompt</label>
              {(prompt === '' || exampleClicked) && (
                <button
                  className={`text-xs flex items-center active:scale-90 group ${exampleClicked ? '' : 'animate-pulse'}`}
                  onClick={() => {
                    setPrompt(randomPrompts[Math.floor(Math.random() * randomPrompts.length)]);
                    setExampleClicked(true);
                  }}
                >
                  <span className=' text-violet-300 tracking-wider'>Generate Idea!</span>
                  <span role="img" aria-label="light bulb" className={`mr-1 opacity-95 group-active:scale-150 ${exampleClicked ? 'animate-pulse' : 'hidden'}`}>🔮</span>
                </button>
              )}
            </div>

            <textarea
              rows={exampleClicked?5:4}
              id="prompt"
              value={prompt}
              onChange={handlePromptChange}
              placeholder="To generate an image, enter a description of what you'd like to create. Let your imagination run wild!"
              className={`w-full bg-gray-900 ${exampleClicked ? 'text-violet-300 font-mono font-semibold text-base' : 'text-blue-200'}  border-2 border-gray-800 py-2 px-3 rounded-[0.150rem] focus:outline-none focus:border-blue-950`}
            />
            {error && <p className="text-rose-400 opacity-70 ml-2 mt-1">{error}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="model" className="block mb-2">Engine</label>
            <select
              id="model"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full bg-gray-900 text-blue-200 border-2 border-gray-600 py-2 px-4 rounded-[0.150rem] focus:outline-none focus:border-blue-900"
            >
              <option value="sd-xl">Nova Lite</option>
              <option value="sd-v1.5">Nova Blend</option>
              <option value="sd-v1.4">Nova LitePlus</option>
              <option value="mlt">Nova Surreal</option>
              <option value="ani">Nova Animagic</option>
              <option value="rae">Nova Animagine</option>
              <option value="hand">Nova HandDrawn</option>
              <option value="toon">Nova RetroToon</option>
              <option value="fxl">Nova Lementis</option>
              <option value="nsfw">Nova Midnight</option>
              <option value="eclipse">Nova Eclipse</option>
              <option value="sdxl-me">Nova Fusion</option>
              <option value="real">Nova Forge</option>
              <option value="sd-v3.0">Nova Elite</option>

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
                <p className="my-7 text-slate-400 animate-pulse">Hang tight, your image is on the way!</p>
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
