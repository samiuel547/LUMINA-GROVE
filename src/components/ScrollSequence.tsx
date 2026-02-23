import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';

export const ScrollSequence = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const frameCount = 35; 

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const currentIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1]);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(3, '0');
      // Fallback to picsum if local images are missing
      img.src = `/sequence/download (2)_${frameNumber}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
        }
      };
      
      img.onerror = () => {
        // If image fails, use a placeholder with a consistent seed per frame
        img.src = `https://picsum.photos/seed/forest-${i}/1920/1080?grayscale`;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === frameCount) {
            setImages(loadedImages);
          }
        };
      };
      
      loadedImages[i] = img;
    }
  }, []);

  // Draw to canvas
  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx || images.length === 0) return;

      const index = Math.floor(currentIndex.get());
      const img = images[index];

      if (img && img.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const canvasAspect = canvas.width / canvas.height;
        const imgAspect = img.width / img.height;
        
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (canvasAspect > imgAspect) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgAspect;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgAspect;
          drawHeight = canvas.height;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    const unsubscribe = currentIndex.on('change', render);
    render();

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        render();
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [images, currentIndex]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-black">
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>
    </div>
  );
};
