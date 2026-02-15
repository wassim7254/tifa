import { assets } from "@/assets/assets";
import Image from "next/image";
import { useClerk , UserButton } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";
import ChatLabel from "@/compenent/ChatLabel"
import { useState } from "react";

const Sidebar = ({ expand, setExpand }) => {

  const { openSignIn } = useClerk()
  const {user} = useAppContext()
  const [openMenu, setOpenMenu] = useState({id: 0, open: false})
    
  return (
    <div
      className={`flex flex-col justify-between bg-[#212327] pt-7 transition-all z-50 max-md:absolute max-md:h-screen ${
        expand ? "p-4 w-64" : "md:w-20 w-0 max-md:overflow-hidden"
      }`}
    >
      {/* Top section */}
      <div>
        <div
          className={`flex ${
            expand ? "flex-row gap-10" : "flex-col items-center gap-8"
          }`}
        >
          <Image
            className={expand ? "w-36" : "w-10"}
            src={expand ? assets.logo_text : assets.logo_icon}
            alt=""
          />

          {/* Toggle button */}
          <div
            onClick={() => setExpand(!expand)}
            className="group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 rounded-lg cursor-pointer"
          >
            <Image
              src={assets.menu_icon}
              alt=""
              className="md:hidden"
            />

            <Image
              src={
                expand
                  ? assets.sidebar_close_icon
                  : assets.sidebar_icon
              }
              alt=""
              className="hidden md:block"
            />

            {/* Tooltip */}
            <div className="absolute left-full ml-2 bg-black text-white text-xs rounded p-1 invisible opacity-0 group-hover:visible group-hover:opacity-75 transition whitespace-nowrap z-50">
              {expand ? ":<== Close sidebar" : "==> Open sidebar"}
              <div className="w-3 h-3 absolute bg-black rotate-45 left-[-4px] top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* New Chat */}
        <button
          className={`mt-8 flex items-center justify-center cursor-pointer ${
            expand
              ? "bg-primary hover:opacity-90 rounded-2xl gap-2 p-3 w-max"
              : "group relative h-9 w-9 mx-auto hover:bg-gray-500/30 rounded-lg"
          }`}
        >
          <Image
            className={expand ? "w-6" : "w-7"}
            src={
              expand ? assets.chat_icon : assets.chat_icon_dull
            }
            alt=""
          />

          {!expand && (
            <div className="absolute left-full ml-2 bg-black text-white text-xs rounded p-1 opacity-0 group-hover:opacity-75 transition whitespace-nowrap">
              New chat
              <div className="w-3 h-3 absolute bg-black rotate-45 left-[-4px] top-1/2 -translate-y-1/2" />
            </div>
          )}

          {expand && (
            <p className="text-white text font-bold">
              New chat
            </p>
          )}
        </button>

        {/* Recents */}
        {expand && (
          <div className="mt-8 text-white/25 text-sm">
            <p className="my-1">Recents</p>
            <ChatLabel openMenu={openMenu} setOpenMenu={setOpenMenu} />
          </div>
        )}
      </div>

      {/* Bottom section */}
      <div>
        {/* Get App */}
        
        <div
          className={`flex items-center cursor-pointer group relative ${
            expand
              ? "gap-2 text-white/80 text-sm p-2.5 border border-primary rounded-lg hover:bg-white/10"
              : "h-10 w-10 mx-auto hover:bg-gray-500/30 rounded-lg"
          }`}
          type="button"
    onClick={() => {
      window.location.href = "https://www.google.com";
    }}
    
        >
          
          <Image
            className={expand ? "w-5" : "w-7 mx-auto"}
            src={assets.phone_icon}
            alt="phone"
          />
          

          {!expand && (
  <div className="absolute -top-19 right-[-7rem] opacity-0 group-hover:opacity-80 transition left-[-0.2rem]">
    <div className="relative bg-black text-white text-sm p-3 rounded-lg">
      <p>Scan to get DeepSeek App</p>
      <div className="w-3 h-3 absolute bg-black rotate-45 left-4 -bottom-1.5" />
    </div>
  </div>
)}

{expand && (
  <button
    type="button"
    onClick={() => {
      window.location.href = "https://www.google.com";
    }}
    className="flex items-center gap-2"
  >
    <span>Get App</span>
    <Image src={assets.new_icon} alt="" />
  </button>
)}
</div>
          
        {/* Profile */}
    <div  onClick={ user ? null : openSignIn} // <- This triggers the warning
className={`flex items-center gap-3 text-white/60 text-sm p-2 mt-2 cursor-pointer ${
expand ? "hover:bg-white/10 rounded-lg" : "justify-center items-center"
}gap-3 text-white/60 text-sm p-2 mt-2 cursor-pointer `}
>
        {
            user ? <UserButton/>
            : <Image
            src={assets.profile_icon}
            alt=""
            className="w-7"
          />
        }

          
          {expand && <span>My Profile</span>}
        </div>
      </div>
    </div>
    
  );
};

export default Sidebar;
