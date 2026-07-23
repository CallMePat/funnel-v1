"use client";

import { DictShape } from "@/app/i18n/dictionaries/fr";
import { ArrowDown, ArrowRightCircle, Calendar, Video } from "lucide-react";

interface StageParcoursProps {
  dict: DictShape;
}

export default function StageParcours({ dict }: StageParcoursProps) {
  return (
    <section className="relative w-full py-24 lg:py-32 bg-white text-neutral-900 overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Parcours (Page 18) */}
        <div className="mb-32">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light text-brand leading-tight tracking-tight mb-16 uppercase">
            {dict.journey.title}
          </h2>
          
          <div className="flex flex-col gap-4 max-w-4xl mx-auto relative pl-4 sm:pl-8 border-l-2 border-brand/20">
            {dict.journey.steps.slice(0, 4).map((step, index) => (
              <div 
                key={index}
                className="relative group flex items-center p-6 sm:p-8 rounded-r-3xl rounded-l-md bg-gradient-to-r from-neutral-50 to-white border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300 transform origin-left hover:scale-[1.02]"
                style={{ marginLeft: `${index * 1}rem` }}
              >
                {/* Node on the timeline */}
                <div className="absolute -left-4 sm:-left-8 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-16 sm:h-16 rounded-full bg-white border-4 border-brand flex items-center justify-center -translate-x-1/2 shadow-lg z-10 group-hover:bg-brand transition-colors">
                  <ArrowDown className="w-4 h-4 sm:w-6 sm:h-6 text-brand group-hover:text-white transition-colors" />
                </div>
                
                <span className="text-xl sm:text-3xl font-light text-neutral-800 ml-6 sm:ml-10">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Masterclass Details (Page 19) */}
        <div className="max-w-6xl mx-auto bg-neutral-900 text-white rounded-[3rem] p-8 sm:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand/20 via-neutral-900 to-neutral-900 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-16">
            <div className="w-full lg:w-1/2">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light leading-tight mb-8">
                {dict.masterclass.title}
              </h3>
              
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
                <Video className="w-5 h-5 text-brand-light" />
                <span className="text-lg font-medium">{dict.masterclass.subtitle}</span>
              </div>
              
              <ul className="space-y-3 mb-12">
                {dict.masterclass.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg text-neutral-300 font-light">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-neutral-400 mb-4 font-light">
                  {dict.masterclass.questionIntro}
                </p>
                <p className="text-2xl sm:text-3xl font-display text-brand-light italic">
                  &quot;{dict.masterclass.question}&quot;
                </p>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 flex flex-col justify-between">
              <div>
                <h4 className="text-2xl font-light mb-8 text-neutral-200">
                  {dict.masterclass.discoverIntro}
                </h4>
                <div className="space-y-6 mb-12">
                  {dict.masterclass.discoverPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <ArrowRightCircle className="w-6 h-6 text-brand shrink-0 mt-0.5" />
                      <span className="text-lg text-neutral-300 font-light leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <button className="group relative inline-flex items-center justify-center px-8 py-5 text-lg font-bold text-white bg-brand rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(255,165,0,0.3)] w-full">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span className="relative z-10 flex items-center gap-3">
                  <Calendar className="w-5 h-5" />
                  {dict.ctas.reserveMasterclass}
                </span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
