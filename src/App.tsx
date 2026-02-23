import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { ContactForm } from './components/ContactForm';
import { CustomCursor } from './components/CustomCursor';
import { ScrollSequence } from './components/ScrollSequence';
import { PRODUCTS } from './constants';
import { ArrowRight, ChevronRight, Play } from 'lucide-react';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Hero Animations
  const heroOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.05], [1, 0.8]);
  
  // Titanium Section Animations
  const titaniumOpacity = useTransform(smoothProgress, [0.05, 0.15, 0.25, 0.35], [0, 1, 1, 0]);
  const titaniumScale = useTransform(smoothProgress, [0.05, 0.15], [1.2, 1]);
  const titaniumTextY = useTransform(smoothProgress, [0.05, 0.15], [100, 0]);

  // Feature Section Animations
  const featureOpacity = useTransform(smoothProgress, [0.35, 0.45, 0.75, 0.85], [0, 1, 1, 0]);
  const featureScale = useTransform(smoothProgress, [0.35, 0.45], [0.9, 1]);

  // Contact Reveal Animations
  const contactBlur = useTransform(smoothProgress, [0.85, 0.95], [0, 20]);
  const contactOpacity = useTransform(smoothProgress, [0.85, 0.95], [0, 1]);
  const contactY = useTransform(smoothProgress, [0.85, 0.95], [100, 0]);

  return (
    <div ref={containerRef} className="relative bg-black cursor-none">
      <CustomCursor />
      <Navbar />

      <main>
        {/* Background Scrubbing Sequence */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <ScrollSequence />
        </div>

        {/* Section 1: Hero - The Reveal */}
        <section className="relative h-[200vh] flex flex-col items-center z-10">
          <motion.div 
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl md:text-[12rem] font-bold tracking-tighter text-center mb-6 text-gradient z-20"
            >
              Lumina Grove.
            </motion.h1>
            
            {/* Background Typography as Art - Hiding behind "trees" (z-index) */}
            <motion.div 
              style={{ 
                x: useTransform(smoothProgress, [0, 0.1], [0, -400]),
                opacity: useTransform(smoothProgress, [0, 0.1], [0.1, 0])
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-bold text-white/10 whitespace-nowrap z-0 pointer-events-none select-none"
            >
              TITANIUM
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-xl md:text-2xl text-titanium-400 font-medium text-center max-w-2xl z-20"
            >
              The strongest, lightest, and most ethereal glass collection ever created.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mt-12 flex items-center gap-8 z-20"
            >
              <button className="text-blue-500 font-semibold flex items-center gap-1 hover:underline group interactive">
                Watch the film <Play size={16} className="fill-current" />
              </button>
              <button className="text-blue-500 font-semibold flex items-center gap-1 hover:underline interactive">
                Learn more <ChevronRight size={16} />
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* Section 2: Materiality */}
        <section className="relative h-[300vh] z-10">
          <motion.div 
            style={{ opacity: titaniumOpacity, scale: titaniumScale }}
            className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
          >
            <div className="relative z-10 max-w-5xl px-6 grid md:grid-cols-2 gap-20 items-center">
              <motion.div style={{ y: titaniumTextY }}>
                <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-8">
                  A masterpiece <br />
                  of materiality.
                </h2>
                <p className="text-xl text-titanium-400 leading-relaxed mb-8">
                  Lumina Grove features a aerospace-grade titanium frame, the same alloy used in spacecraft that mission to Mars. 
                </p>
                <p className="text-xl text-titanium-400 leading-relaxed">
                  Titanium has one of the best strength-to-weight ratios of any metal, making these our lightest glass pieces yet.
                </p>
              </motion.div>
              
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-titanium-800/50 backdrop-blur-md border border-white/5 shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/titanium/800/1000" 
                  alt="Titanium texture" 
                  className="w-full h-full object-cover grayscale opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <p className="text-sm font-mono text-titanium-500 uppercase tracking-widest mb-2">Material Science</p>
                  <p className="text-2xl font-bold">Grade 5 Titanium</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section 3: The Collection */}
        <section className="relative h-[400vh] z-10">
          <motion.div 
            style={{ 
              opacity: featureOpacity, 
              scale: featureScale,
              filter: `blur(${contactBlur.get() * 2}px)`
            }}
            className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6"
          >
            <div className="max-w-7xl w-full">
              <div className="mb-16 text-center">
                <h2 className="text-5xl md:text-8xl font-bold tracking-tight mb-6">Explore the lineup.</h2>
                <p className="text-xl text-titanium-500">Four finishes. Infinite possibilities.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {PRODUCTS.slice(0, 4).map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
              
              <div className="mt-16 flex justify-center">
                <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-titanium-200 transition-all flex items-center gap-2 group interactive">
                  Shop All Models <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section 4: Contact Reveal */}
        <section className="relative h-[200vh] z-20">
          <motion.div 
            style={{ opacity: contactOpacity, y: contactY }}
            className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6"
          >
            <div className="max-w-4xl w-full">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">Get in touch.</h2>
                <p className="text-xl text-titanium-400">Our specialists are here to help you find the perfect piece.</p>
              </div>
              <ContactForm />
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="relative bg-black py-20 px-6 border-t border-white/10 z-30">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-sm text-titanium-500">
            <div className="col-span-2 md:col-span-1">
              <p className="text-white font-bold mb-6">Lumina Grove</p>
              <p className="leading-relaxed">
                Redefining glass art through the lens of modern technology and aerospace materials.
              </p>
            </div>
            <div>
              <p className="text-white font-bold mb-6">Shop</p>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-white transition-colors interactive">Titanium Series</a></li>
                <li><a href="#" className="hover:text-white transition-colors interactive">Classic Collection</a></li>
                <li><a href="#" className="hover:text-white transition-colors interactive">Limited Editions</a></li>
                <li><a href="#" className="hover:text-white transition-colors interactive">Accessories</a></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-bold mb-6">Support</p>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-white transition-colors interactive">Order Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors interactive">Shipping & Delivery</a></li>
                <li><a href="#" className="hover:text-white transition-colors interactive">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors interactive">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-bold mb-6">About</p>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-white transition-colors interactive">Our Story</a></li>
                <li><a href="#" className="hover:text-white transition-colors interactive">Sustainability</a></li>
                <li><a href="#" className="hover:text-white transition-colors interactive">Design Philosophy</a></li>
                <li><a href="#" className="hover:text-white transition-colors interactive">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-20 pb-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-titanium-600">
            <p>© 2024 Lumina Grove Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-titanium-400 interactive">Privacy Policy</a>
              <a href="#" className="hover:text-titanium-400 interactive">Terms of Use</a>
              <a href="#" className="hover:text-titanium-400 interactive">Sales Policy</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}



