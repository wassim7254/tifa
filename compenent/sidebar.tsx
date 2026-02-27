'use client';
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";
import ChatLabel from "@/compenent/ChatLabel";
import { useState, useRef } from "react";

const MagneticButton = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const { clientX, clientY } = e;
      const { height, width, left, top } = ref.current.getBoundingClientRect();
      ref.current.style.transform = `translate(${(clientX - (left + width / 2)) * 0.2}px, ${(clientY - (top + height / 2)) * 0.2}px)`;
  };
  const handleMouseLeave = () => { if (ref.current) ref.current.style.transform = `translate(0px, 0px)`; };
  return <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={`transition-transform duration-200 ease-out z-10 ${className}`}>{children}</div>;
};

// Zedt hna Props dyal Dark Mode
interface SidebarProps {
  expand: boolean;
  setExpand: (val: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

const Sidebar = ({ expand, setExpand, isDarkMode, setIsDarkMode }: SidebarProps) => {
  const { openSignIn } = useClerk();
  const { user } = useAppContext();
  const [openMenu, setOpenMenu] = useState({ open: false });
    
  return (
    // 🌑 Sidebar katwli Zaj Dark f dark mode
    <div className={`flex flex-col justify-between bg-white/40 dark:bg-[#121308] /40 backdrop-blur-2xl border-r border-gray-200/50 dark:border-white/10 pt-7 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-50 max-md:absolute max-md:h-screen shadow-[4px_0_24px_rgba(0,0,0,0.02)] ${
        expand ? "p-4 w-64" : "md:w-20 w-0 max-md:overflow-hidden"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className={`flex ${expand ? "flex-row justify-between items-center px-2" : "flex-col items-center gap-6"}`}>
          
          <Image className={`transition-all duration-300 dark:invert ${expand ? "w-32 drop-shadow-sm" : "w-10"}`} src={expand ? assets.logo_text : assets.logo_icon} alt="Logo" />

          {/* Toggle Sidebar */}
          <MagneticButton>
            <div onClick={() => setExpand(!expand)} className="group relative flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 border border-transparent hover:border-gray-200/50 dark:hover:border-white/10 transition-all duration-300 h-10 w-10 rounded-xl cursor-pointer">
              <Image src={assets.menu_icon} alt="Menu" className="md:hidden w-5 opacity-70 dark:invert group-hover:opacity-100" />
              <Image src={expand ? assets.sidebar_close_icon : assets.sidebar_icon} alt="Sidebar" className="hidden md:block w-5 opacity-70 dark:invert group-hover:opacity-100" />
            </div>
          </MagneticButton>
        </div>

        {/* New Chat Button */}
        <button className={`mt-8 flex items-center justify-center cursor-pointer transition-all duration-300 ${
            expand ? "bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 shadow-md hover:scale-[102%] rounded-2xl gap-3 p-3.5 w-full"
                   : "group h-12 w-12 mx-auto hover:bg-black/5 dark:hover:bg-white/10 border border-transparent hover:border-gray-200/50 dark:hover:border-white/10 rounded-2xl"
          }`}>
          <Image className={`transition-all duration-300 ${expand ? "w-5 invert dark:invert-0" : "w-6 opacity-70 dark:invert"}`} src={expand ? assets.chat_icon : assets.chat_icon_dull} alt="New Chat" />
          {expand && <p className="text-white dark:text-black text-sm font-medium tracking-wide">New chat</p>}
        </button>

        {/* Recents */}
        {expand && (
          <div className="mt-6 flex-1 overflow-y-auto custom-scrollbar pr-2">
            <p className="my-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider pl-2">Recents</p>
            <ChatLabel openMenu={openMenu} setOpenMenu={setOpenMenu} />
          </div>
        )}
      </div>

      <div className="pb-4 pt-4 border-t border-gray-200/50 dark:border-white/10 flex flex-col gap-2">
        
        {/* ☀️🌙 BOUTON DYAL THEME (DARK / LIGHT MODE) */}
        <MagneticButton>
          <div onClick={() => setIsDarkMode(!isDarkMode)} className={`flex items-center cursor-pointer transition-all duration-300 ${
              expand ? "gap-3 p-3 mx-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl" : "h-12 w-12 mx-auto hover:bg-black/5 dark:hover:bg-white/10 rounded-xl justify-center"
            }`}>
             <div className="relative w-5 h-5 flex items-center justify-center">
                {/* Chems */}
                <svg className={`absolute w-5 h-5 text-gray-700 transition-all duration-500 ${isDarkMode ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                {/* Gmara */}
                <svg className={`absolute w-5 h-5 text-gray-200 transition-all duration-500 ${!isDarkMode ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
             </div>
             {expand && <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
          </div>
        </MagneticButton>

        {/* Profile */}
        <MagneticButton>
          <div onClick={() => { if (!user && openSignIn) openSignIn(); }} className={`flex items-center gap-3 p-2 mx-2 cursor-pointer transition-all duration-300 ${expand ? "hover:bg-black/5 dark:hover:bg-white/10 rounded-xl" : "justify-center"}`}>
            {user ? <UserButton/> : <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full"><Image src={assets.profile_icon} alt="Profile" className="w-5 opacity-70 dark:invert" /></div>}
            {expand && <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">My Profile</span>}
          </div>
        </MagneticButton>
      </div>
    </div>
  );
};
export default Sidebar;