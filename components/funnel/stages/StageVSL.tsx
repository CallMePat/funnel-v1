"use client";

import { DictShape } from "@/app/i18n/dictionaries/fr";
import { useState, useRef } from "react";
import { VolumeX } from "lucide-react";

interface StageVSLProps {
  dict: DictShape;
}

export default function StageVSL({ dict }: StageVSLProps) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleToggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 sm:px-8 z-20 overflow-hidden">
      
      {/* Top Text / Hook */}
      {/* <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-foreground text-balance">
          🚀 <span className="font-medium text-brand underline decoration-brand/30 underline-offset-4">Boostez votre impact</span> et convertissez votre audience avec la préparation exécutive
        </h2>
      </div> */}

      {/* Video Wrapper (Allows badge to overflow) */}
      <div className="relative w-full max-w-7xl mx-auto">
        
        {/* Video Container */}
        <div 
          className="relative w-full aspect-video  border-3 rounded-3xl overflow-hidden border-2 border-white shadow-2xl bg-background group cursor-pointer" 
          onClick={handleToggleMute}
        >
          {/* Fallback to generic sample video, and our generated thumbnail as poster */}
          <video 
            ref={videoRef}
            className={`w-full h-full  object-cover transition-opacity duration-700 ${!isMuted ? 'opacity-100' : 'opacity-60'}`}
            poster="/vsl-thumbnail.png"
            playsInline
            loop
            autoPlay
            muted
          >
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          </video>

          {/* Overlay when muted */}
          {isMuted && (
            <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300">
              
              {/* Top Unmute Badge */}
              <div className="absolute top-6 bg-black/80 backdrop-blur-md text-white text-xs px-4 py-2 rounded-xl flex items-center gap-2 border border-white/10 font-medium tracking-wide">
                Unmute
              </div>

              {/* Center Play Button */}
              <div className="bg-black/80 backdrop-blur-md border border-brand/40 text-brand px-6 py-3 rounded-full font-medium flex items-center gap-3 transform group-hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:bg-black">
                <VolumeX className="w-5 h-5 text-white" /> 
                <span className="text-white">Click to Unmute</span>
              </div>
              
            </div>
          )}

         
        </div>

        {/* Floating Badge "2 min" on the right */}
        <div className="absolute -right-4 top-[15%] sm:-right-10 sm:top-[20%] bg-gradient-to-br from-brand-400 to-brand-600 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex flex-col items-center justify-center text-white shadow-[0_10px_40px_rgba(202,138,84,0.4)] transform rotate-[12deg] z-30 border-[4px] border-background pointer-events-none hover:rotate-[8deg] transition-transform">
          <div className="transform -rotate-[12deg] flex flex-col items-center drop-shadow-md">
            <span className="text-4xl sm:text-5xl font-black leading-none tracking-tighter">2</span>
            <span className="text-sm sm:text-base font-bold uppercase tracking-widest mt-1">min</span>
          </div>
        </div>

      </div>

      {/* Bottom Text / Arrows */}
      <div className="mt-12 flex items-center justify-center relative w-full ">
        <svg className="w-12 h-12 text-brand/60 hidden sm:block transform scale-x-[-1] -rotate-12 mr-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8L22 12L18 16" />
          <path d="M2 12C2 12 10 12 22 12" />
        </svg>

        <div className="font-serif italic text-lg sm:text-xl px-2 text-center text-muted-foreground bg-brand/5 py-2 px-6 rounded-[2rem] border border-brand/20 shadow-sm max-w-2xl text-balance leading-relaxed">
          &quot;{dict.vsl.footer}&quot;
        </div>

        <svg className="w-12 h-12 text-brand/60 hidden sm:block -rotate-12 ml-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8L22 12L18 16" />
          <path d="M2 12C2 12 10 12 22 12" />
        </svg>
      </div>

      {/* CTA Button */}
      <div className="mt-14 flex justify-center relative z-30 animate-[fade-up_1s_ease_forwards] opacity-0" style={{ animationDelay: '500ms' }}>
        <button className="group relative inline-flex items-center justify-center px-8 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl font-bold text-white bg-brand rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,165,0,0.4)] shadow-xl active:scale-95">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          <span className="relative z-10 flex items-center gap-3">
            {dict.ctas.discoverScore}
            <svg className="w-6 h-6 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>
      </div>

    </section>
  );
}
