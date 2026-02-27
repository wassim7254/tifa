'use client';
import { assets } from '@/assets/assets';
import Image from 'next/image';
import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';

// ==========================================
// 🧲 Moteur dyal l'Mghnatis
// ==========================================
const MagneticButton = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        ref.current.style.transform = `translate(${(clientX - (left + width / 2)) * 0.3}px, ${(clientY - (top + height / 2)) * 0.3}px)`;
    };
    const handleMouseLeave = () => { if (ref.current) ref.current.style.transform = `translate(0px, 0px)`; };
    return <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={`transition-transform duration-200 ease-out z-10 ${className}`}>{children}</div>;
};

// ==========================================
// Props
// ==========================================
interface PromptBoxProps {
    isLoading?: boolean;
    setIsLoading?: Dispatch<SetStateAction<boolean>>;
    activeMode: string;
    setActiveMode: Dispatch<SetStateAction<string>>;
    setIsTyping: Dispatch<SetStateAction<boolean>>;
}

const PromptBox = ({ isLoading, setIsLoading, activeMode, setActiveMode, setIsTyping }: PromptBoxProps) => {
    const[prompt, setPrompt] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const tiltRef = useRef<HTMLFormElement>(null);

    // 🧊 3D Tilt
    const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!tiltRef.current) return;
        const { left, top, width, height } = tiltRef.current.getBoundingClientRect();
        tiltRef.current.style.transform = `rotateX(${((e.clientY - top) / height - 0.5) * -10}deg) rotateY(${((e.clientX - left) / width - 0.5) * 10}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    const resetTilt = () => { if (tiltRef.current) tiltRef.current.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`; };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
        setIsTyping(e.target.value.length > 0); 
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    };

    useEffect(() => {
        if (prompt === '' && textareaRef.current) textareaRef.current.style.height = 'auto';
    },[prompt]);

    // 🌡️ Mood Shifting Fluid 
    const getFluidColors = () => {
        if (activeMode === 'deepthink') return 'rgba(249,115,22,0.4), rgba(239,68,68,0.4), rgba(234,179,8,0.4), rgba(249,115,22,0.4)'; 
        if (activeMode === 'search') return 'rgba(6,182,212,0.4), rgba(59,130,246,0.4), rgba(45,212,191,0.4), rgba(6,182,212,0.4)'; 
        if (activeMode === 'mic') return 'rgba(16,185,129,0.4), rgba(34,197,94,0.4), rgba(20,184,166,0.4), rgba(16,185,129,0.4)'; 
        return 'rgba(59,130,246,0.3), rgba(168,85,247,0.3), rgba(45,212,191,0.3), rgba(59,130,246,0.3)'; 
    };

    const toggleMode = (mode: string) => {
        setActiveMode(prev => prev === mode ? 'normal' : mode);
    };

    return (
        <div className={`relative w-full mt-4 group z-20 animate-fade-in-up`} style={{ animationDelay: '300ms', perspective: '1000px' }} onMouseMove={handleTilt} onMouseLeave={resetTilt}>
            
            <style>{`
                @keyframes water-flow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
                .bg-water { background-size: 300% 300%; animation: water-flow 4s ease-in-out infinite; transition: background 1s ease; }
                @keyframes sound-wave { 0%, 100% { height: 8px; } 50% { height: 32px; } }
                .wave-bar { animation: sound-wave 1s ease-in-out infinite; width: 6px; border-radius: 4px; background-color: #10B981; }
            `}</style>

            {/* Khayal dyal lma */}
            <div className="absolute -inset-1 rounded-[32px] bg-water blur-[14px] opacity-80 group-hover:opacity-100 transition-all duration-1000 -z-10" style={{ backgroundImage: `linear-gradient(-45deg, ${getFluidColors()})` }}></div>

            {/* 🧊 Form Zaj: Zidna dark:bg-black/40 w dark:border-white/10 */}
            <form ref={tiltRef} className="relative bg-white/30 dark:bg-black/50 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] p-4 rounded-3xl transition-all duration-300 ease-out" style={{ transformStyle: 'preserve-3d' }}>
                
                <div className="min-h-[28px] flex items-center w-full">
                    {activeMode === 'mic' ? (
                        <div className="flex items-center gap-1.5 h-full px-4 text-green-600 dark:text-green-400 font-medium">
                            <div className="flex items-center gap-1 mr-3 h-8">
                                <span className="wave-bar" style={{ animationDelay: '0.1s' }}></span>
                                <span className="wave-bar" style={{ animationDelay: '0.3s', backgroundColor: '#34D399' }}></span>
                                <span className="wave-bar" style={{ animationDelay: '0s', height: '40px' }}></span>
                                <span className="wave-bar" style={{ animationDelay: '0.4s', backgroundColor: '#34D399' }}></span>
                                <span className="wave-bar" style={{ animationDelay: '0.2s' }}></span>
                            </div>
                            <span className="animate-pulse">Listening to your voice...</span>
                        </div>
                    ) : (
                        <textarea 
                            ref={textareaRef}
                            // ✍️ text-gray-900 kayweli text-white f dark mode
                            className='outline-none w-full resize-none break-words bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 font-medium overflow-y-auto custom-scrollbar'
                            rows={1} placeholder='Message Tifa...' onChange={handleInput} value={prompt}
                        />
                    )}
                </div>

                <div className='flex items-center justify-between text-sm mt-3'>
                    <div className='flex items-center gap-2'>
                        
                        {/* DeepThink */}
                        <MagneticButton>
                            <div onClick={() => toggleMode('deepthink')} className={`flex items-center gap-2 text-xs border backdrop-blur-md px-3 py-1.5 rounded-full cursor-pointer hover:shadow-md transition-all duration-300 ${activeMode === 'deepthink' ? 'bg-orange-500/20 border-orange-400/50 text-orange-700 dark:text-orange-400 font-bold' : 'bg-white/40 dark:bg-white/5 border-white/40 dark:border-white/10 text-gray-800 dark:text-gray-300 hover:dark:bg-white/10'}`}>
                                <Image className={`h-4 w-auto dark:invert transition-all ${activeMode === 'deepthink' ? 'scale-110 dark:invert-0' : 'opacity-80'}`} src={assets.deepthink_icon} alt='' />
                                DeepThink (R1)
                            </div>
                        </MagneticButton>
                        
                        {/* Search */}
                        <MagneticButton>
                            <div onClick={() => toggleMode('search')} className={`flex items-center gap-2 text-xs border backdrop-blur-md px-3 py-1.5 rounded-full cursor-pointer hover:shadow-md transition-all duration-300 ${activeMode === 'search' ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-700 dark:text-cyan-400 font-bold' : 'bg-white/40 dark:bg-white/5 border-white/40 dark:border-white/10 text-gray-800 dark:text-gray-300 hover:dark:bg-white/10'}`}>
                                <Image className={`h-4 w-auto dark:invert transition-all ${activeMode === 'search' ? 'scale-110 dark:invert-0' : 'opacity-80'}`} src={assets.search_icon} alt='' />
                                Search
                            </div>
                        </MagneticButton>
                    </div>

                    <div className='flex items-center gap-3'>
                        {/* Mic */}
                        <MagneticButton>
                            <div onClick={() => toggleMode('mic')} className={`relative overflow-hidden rounded-full p-2 cursor-pointer transition-all duration-300 ${activeMode === 'mic' ? 'bg-green-500/20 text-green-600 dark:text-green-400 scale-110' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 relative z-10">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                                </svg>
                            </div>
                        </MagneticButton>
                        
                        {/* Send Button: Kayweli byed f dark mode bach yban zwin */}
                        <MagneticButton>
                            <button type="button" className={`relative overflow-hidden ${prompt ? "bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 shadow-lg" : "bg-white/50 dark:bg-white/10"} rounded-full p-2.5 cursor-pointer transition-colors duration-300 flex items-center justify-center border border-white/40 dark:border-white/10`}>
                                <Image className={`w-4 h-4 object-contain transition-all relative z-10 ${prompt ? 'invert dark:invert-0 scale-110' : 'opacity-70 dark:invert'}`} src={prompt ? assets.arrow_icon : assets.arrow_icon_dull} alt='' />
                            </button>
                        </MagneticButton>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default PromptBox;