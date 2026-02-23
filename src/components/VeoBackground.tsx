import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export const VeoBackground = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.2]);

  const generateVideo = async () => {
    try {
      setError(null);
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
        // Proceeding after key selection
      }

      setIsGenerating(true);
      setStatus('Initializing Veo Engine...');

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      setStatus('Dreaming of the Stained Glass Forest...');
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: 'A cinematic, 4K loop of a deep forest made of intricate stained glass. Shimmering amber and emerald light filters through the glass leaves. Ethereal atmosphere, slow camera movement, high fidelity, masterpiece.',
        config: {
          numberOfVideos: 1,
          resolution: '1080p',
          aspectRatio: '16:9'
        }
      });

      setStatus('Crafting the light and shadow (this may take a few minutes)...');
      
      // Poll for completion
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        try {
          operation = await ai.operations.getVideosOperation({ operation: operation });
        } catch (e: any) {
          if (e.message?.includes("Requested entity was not found")) {
            setStatus('Session expired. Please re-select your API key.');
            await window.aistudio.openSelectKey();
            continue;
          }
          throw e;
        }
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        setStatus('Finalizing video stream...');
        const response = await fetch(downloadLink, {
          method: 'GET',
          headers: {
            'x-goog-api-key': process.env.API_KEY || '',
          },
        });
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate video');
    } finally {
      setIsGenerating(false);
      setStatus('');
    }
  };

  return (
    <motion.div 
      style={{ opacity, scale }}
      className="absolute inset-0 z-0 overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {videoUrl ? (
          <motion.video
            key="veo-video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
          />
        ) : (
          <motion.div
            key="veo-placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex flex-col items-center justify-center bg-forest-950/80 backdrop-blur-sm"
          >
            {isGenerating ? (
              <div className="text-center space-y-6 px-6">
                <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto" />
                <div className="space-y-2">
                  <p className="text-xl font-serif italic text-zinc-100">{status}</p>
                  <p className="text-sm text-zinc-500 font-mono uppercase tracking-widest">Veo 3.1 High Fidelity Generation</p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-8 max-w-md px-6">
                <div className="space-y-4">
                  <h3 className="text-3xl font-serif font-bold text-white">Cinematic Atmosphere</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    Generate a unique, AI-crafted background video of the Lumina Grove using Google's Veo model.
                  </p>
                </div>
                
                <button
                  onClick={generateVideo}
                  className="group relative px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-full transition-all flex items-center justify-center space-x-3 mx-auto overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Background</span>
                </button>

                {error && (
                  <p className="text-red-400 text-sm font-mono bg-red-400/10 py-2 px-4 rounded-lg border border-red-400/20">
                    {error}
                  </p>
                )}

                <p className="text-xs text-zinc-600">
                  Requires a paid Google Cloud project API key. 
                  <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline ml-1">Learn more</a>
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
