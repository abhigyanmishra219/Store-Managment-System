"use client"

import { Theme } from "@radix-ui/themes"
import { createContext, ReactNode, useState } from "react"

export const ThemeContext=createContext<
  {isDark:boolean,
  setisDark:((x:boolean)=>void) | null
  }>({
    isDark:true,
    setisDark:null

})
  
export default function ThemeProvider({
    children
}:{children:ReactNode})
{
    const [isDark, setisDark] = useState(true)    
    return(
        <>
       
          <ThemeContext.Provider value={{
            isDark,
            setisDark
          }}>
             <Theme appearance={isDark?"dark":"light"}>{children}</Theme>
          </ThemeContext.Provider>
        
        </>
    )
}