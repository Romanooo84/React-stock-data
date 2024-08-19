import { useState, useEffect } from "react"

export const Header=({multiplyData})=>{

    console.log(multiplyData)
    useEffect(() => {
        
        if (multiplyData) {
          console.log(multiplyData)
        }
      }, []);

    return(
        <header>
            to jest nagłówek
        </header>
    )
}