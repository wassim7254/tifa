'use client';
import { assets } from '@/assets/assets'
import Image from 'next/image'
import { useRef, useEffect } from 'react'

interface ChatLabelProps {
  openMenu: { open: boolean };
  setOpenMenu: (value: { open: boolean }) => void; 
}

const ChatLabel = ({ openMenu, setOpenMenu }: ChatLabelProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu({ open: false });
      }
    };
    if (openMenu.open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  },[openMenu.open, setOpenMenu]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenu({ open: !openMenu.open });
  };

  return (
    <div className='flex items-center justify-between p-2.5 
                    bg-transparent text-gray-700 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-white/10 hover:shadow-sm 
                    transition-all duration-300 rounded-xl text-sm group 
                    cursor-pointer border border-transparent hover:border-white/50 dark:hover:border-white/10 relative'>
        
        <p className='truncate pr-3 w-full text-blue-500 dark:text-blue-400 font-bold flex items-center gap-2'>
            Chat Name Here
        </p>

      <div className='relative flex items-center justify-center' ref={menuRef}>
        
        {/* Les 3 points */}
        <div 
          onClick={handleToggle}
          className={`flex items-center justify-center gap-[3px] h-7 w-7 rounded-lg transition-all duration-300 
                      ${openMenu.open ? 'bg-gray-200/80 dark:bg-white/20 opacity-100 scale-100 shadow-inner' : 'opacity-0 scale-95 group-hover:scale-100 group-hover:opacity-100 hover:bg-gray-200/50 dark:hover:bg-white/10'}`}
        >
          <span className={`w-1 h-1 rounded-full transition-colors ${openMenu.open ? 'bg-gray-800 dark:bg-white' : 'bg-gray-400 dark:bg-gray-400'}`}></span>
          <span className={`w-1 h-1 rounded-full transition-colors ${openMenu.open ? 'bg-gray-800 dark:bg-white' : 'bg-gray-400 dark:bg-gray-400'}`}></span>
          <span className={`w-1 h-1 rounded-full transition-colors ${openMenu.open ? 'bg-[#222102] dark:bg-white' : 'bg-gray-400 dark:bg-gray-400'}`}></span>
        </div>

        {/* 🧊 Dropdown Menu Jdid - Dark Mode Compatible */}
        <div 
          className={`absolute right-0 top-full mt-2 z-50 bg-white/70 dark:bg-[#222102]/80 backdrop-blur-2xl 
                      border border-white/60 dark:border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] dark:shadow-black/50
                      rounded-xl w-36 p-1.5 transition-all duration-300 origin-top-right
                      ${openMenu.open ? 'opacity-100 scale-100 visible translate-y-0' : 'opacity-0 scale-95 invisible -translate-y-2'}`}
        >
          {/* ✏️ Rename */}
          <div 
            className='group/item flex items-center gap-3 hover:bg-blue-50/80 dark:hover:bg-blue-500/10 px-2 py-2.5
                       rounded-lg transition-colors cursor-pointer text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
            onClick={() => { setOpenMenu({ open: false }); }}
          > 
              <div className="bg-gray-100 dark:bg-[#ffffff] group-hover/item:bg-blue-100 dark:group-hover/item:bg-blue-500/20 p-1.5 rounded-md transition-colors">
                 <Image src={assets.pencil_icon} alt='Rename' className='w-3.5 opacity-70 dark:invert group-hover/item:opacity-100 group-hover/item:rotate-12 group-hover/item:scale-110 transition-transform duration-300' />
              </div>
              <p className="font-medium text-sm">Rename</p>
          </div>
          
          {/* 🗑️ Delete */}
          <div 
            className='group/item flex items-center gap-3 hover:bg-red-50/80 dark:hover:bg-red-500/10 px-2 py-2.5 
                       rounded-lg transition-colors cursor-pointer text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 mt-0.5'
            onClick={() => { setOpenMenu({ open: false }); }}
          >
              <div className="bg-gray-100 dark:bg-white/10 group-hover/item:bg-red-100 dark:group-hover/item:bg-red-500/20 p-1.5 rounded-md transition-colors">
                 <Image src={assets.delete_icon} alt='Delete' className='w-3.5 opacity-70 dark:invert group-hover/item:opacity-100 group-hover/item:-rotate-12 group-hover/item:scale-110 transition-transform duration-300' />
              </div>
              <p className="font-medium text-sm">Delete</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ChatLabel