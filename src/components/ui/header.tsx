import { useTheme } from "@/context/theme-provider"
import { Link } from "react-router-dom"
import { Moon, Sun } from "lucide-react";
import CitySearch from "./city-search";

const Header = () => {

   const { theme, setTheme } = useTheme()
   const isDark = theme === 'dark'

   return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter:bg-background/60">
         <div className="container mx-auto flex h-16 min-w-0 items-center justify-between gap-2 px-4">
            <Link to={"/"} className="shrink-0">
               <img src={isDark ? '/logo.png' : '/logo2.png'} alt="Weather-App Logo" className="h-14"
               />
            </Link>

            <div className="flex min-w-0 flex-1 justify-end gap-2 sm:gap-4">
               <CitySearch />

               <div onClick={() => setTheme(isDark ? "light" : "dark")}

                  className={`flex shrink-0 cursor-pointer items-center transition-transform duration-500
                     ${isDark ? "rotate-180" : "rotate-0"}
                     `}
                  >
                  {isDark ? (
                     <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all" />
                     ) : (
                     <Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all" />
                     )}
               </div>
            </div>
         </div>
      </header>
   )
}

export default Header