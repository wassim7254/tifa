'use client';
import { assets } from "@/assets/assets";
import { useState, useEffect, useRef } from "react";
import Image from "next/image"
import Sidebar from "@/compenent/sidebar"
import PromptBox from "@/compenent/PromptBox"
import Message from "@/compenent/Message"

export default function Home() {
  const [expand, setExpand] = useState<boolean>(false);
  const[messages, setMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 🌙 L'Moteur dyal Dark Mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // Bdinaha b Dark Mode 7it mfrg3!

  const[activeMode, setActiveMode] = useState<string>('normal'); 
  const [isTyping, setIsTyping] = useState<boolean>(false); 

  const spotlightRef = useRef<HTMLDivElement>(null);
  const topLeftGroupRef = useRef<HTMLDivElement>(null);
  const bottomRightGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      if (spotlightRef.current) {
        // Spotlight kaytbdal louno 3la 7ssab Dark/Light
        const color = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(99, 102, 241, 0.08)';
        spotlightRef.current.style.background = `radial-gradient(800px circle at ${x}px ${y}px, ${color}, transparent 40%)`;
      }
      
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      if (topLeftGroupRef.current) topLeftGroupRef.current.style.transform = `translate(${(x - centerX) * -0.015}px, ${(y - centerY) * -0.015}px)`;
      if (bottomRightGroupRef.current) bottomRightGroupRef.current.style.transform = `translate(${(x - centerX) * 0.02}px, ${(y - centerY) * 0.02}px)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  },[isDarkMode]);

  return (
    // 🌑 Hna kan7ekmo f site kaml, ila kant isDarkMode true, kanzido class 'dark'
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        .animate-float { animation: float 5s ease-in-out infinite; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
        @keyframes pulse-core { 0% { box-shadow: 0 0 0 0 rgba(59,130,246,0.7); } 70% { box-shadow: 0 0 0 20px rgba(59,130,246,0); } 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); } }
        .ai-core-active { animation: pulse-core 1.5s infinite; border-radius: 50%; }
        /* Shimmer dyal Dark Mode */
        @keyframes gradient-text { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-gradient-text { background-size: 200% auto; animation: gradient-text 4s linear infinite; }
      `}</style>

      {/* Dynamic Island */}
      <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] flex items-center justify-center bg-black/90 dark:bg-white/10 backdrop-blur-xl border border-transparent dark:border-white/10 rounded-full shadow-2xl transition-all duration-500 overflow-hidden ${
        activeMode !== 'normal' ? 'w-48 h-10 opacity-100 scale-100' : 'w-10 h-10 opacity-0 scale-90 pointer-events-none'
      }`}>
        <div className="flex items-center gap-2 text-white text-xs font-medium">
           {activeMode === 'deepthink' && <>🧠 <span>DeepThink Enabled</span></>}
           {activeMode === 'search' && <>🌐 <span>Searching Web...</span></>}
           {activeMode === 'mic' && <>🎙️ <span className="text-green-400">Listening...</span></>}
        </div>
      </div>

      <div ref={spotlightRef} className="pointer-events-none fixed inset-0 z-50 transition-colors duration-500"></div>

      {/* 🌙 Background Principal: bg-white f light, bg-[#09090b] f dark */}
      <div className={`flex h-screen overflow-hidden transition-colors duration-700 bg-white dark:bg-[#09090b] text-gray-900 dark:text-gray-100`}>
        
        {/* Siftna theme l Sidebar bach tbedel ta hya */}
        <Sidebar expand={expand} setExpand={setExpand} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        
        <div className={`flex-1 flex flex-col items-center justify-center px-4 pb-8 relative overflow-hidden transition-colors duration-1000 ${
          activeMode === 'deepthink' ? 'dark:bg-orange-900/10 bg-orange-50/30' : 
          activeMode === 'search' ? 'dark:bg-cyan-900/10 bg-cyan-50/30' : 
          activeMode === 'mic' ? 'dark:bg-green-900/10 bg-green-50/30' : ''
        }`}>
          
          {/* ✨ No9at sghar (Kibedlo lounhom f dark mode ywelio bydin/rmadiyin) */}
          <div ref={topLeftGroupRef} className="absolute top-6 left-6 z-0 transition-transform duration-300 ease-out pointer-events-none">
            <div className="relative w-16 h-16">
               <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-black dark:bg-white/80 rounded-full animate-float"></div>
               <div className="absolute top-8 left-4 w-2 h-2 bg-black/60 dark:bg-white/40 rounded-full animate-float" style={{ animationDelay: '1s'}}></div>
               <div className="absolute top-3 left-12 w-1 h-1 bg-black/40 dark:bg-white/20 rounded-full animate-float" style={{ animationDelay: '2s'}}></div>
            </div>
          </div>

          <div ref={bottomRightGroupRef} className="absolute bottom-10 right-10 z-0 transition-transform duration-300 ease-out pointer-events-none">
             <div className="relative w-16 h-16">
               <div className="absolute bottom-0 right-0 w-2 h-2 bg-black dark:bg-white/80 rounded-full animate-float" style={{ animationDelay: '0.5s'}}></div>
               <div className="absolute bottom-10 right-6 w-1 h-1 bg-black/50 dark:bg-white/40 rounded-full animate-float" style={{ animationDelay: '1.5s'}}></div>
               <div className="absolute bottom-4 right-12 w-1.5 h-1.5 bg-black/80 dark:bg-white/60 rounded-full animate-float" style={{ animationDelay: '2.5s'}}></div>
             </div>
          </div>

          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-full max-w-3xl mt-auto mb-auto z-10 pointer-events-none">
              <div className='flex items-center gap-4 animate-fade-in-up'>
                <div className={`relative transition-all duration-500 ${isTyping ? 'scale-110' : ''}`}>
                   {/* Logo kywli invert (byed) f dark mode */}
                   <Image src={assets.logo_icon} alt="Logo" className="h-16 relative z-10 drop-shadow-md dark:invert transition-all duration-500"/>
                   {isTyping && <div className="absolute inset-0 bg-blue-500/20 dark:bg-amber-500/10 rounded-full blur-md"></div>}
                </div>
                <p className='text-3xl font-bold flex items-center gap-2'>
                  <span className="bg-gradient-to-r from-gray-800 via-gray-400 to-gray-800 dark:from-white dark:via-gray-400 dark:to-white bg-clip-text text-transparent animate-gradient-text">
                    Hi, I`m
                  </span>
                  {/* Marqueur kybedel loun m3a theme */}
                  <span className="bg-black text-white dark:bg-white dark:text-black px-3 py-1 rounded-lg inline-block -rotate-3 shadow-[0_4px_14px_0_rgba(0,0,0,0.3)] dark:shadow-[0_4px_20px_0_rgba(255,255,255,0.15)] transition-all duration-300 hover:rotate-0 hover:scale-110 cursor-default pointer-events-auto">
                    Tifa
                  </span>
                </p>
              </div>
              <p className='text-sm mt-4 text-gray-500 dark:text-gray-400 animate-fade-in-up delay-200'>
                How can I help you today?
              </p>
            </div>
          ) : (
            <div className="w-full max-w-3xl flex-1 mt-20 overflow-y-auto pb-32 z-10 custom-scrollbar">
              <Message role='ai' content='What is next js' />
            </div>
          )}
         
          <div className="absolute bottom-6 w-full max-w-3xl px-4 z-10">
             <PromptBox isLoading={isLoading} setIsLoading={setIsLoading} activeMode={activeMode} setActiveMode={setActiveMode} setIsTyping={setIsTyping} />
          </div>
        </div>
      </div>
    </div>
  );
}