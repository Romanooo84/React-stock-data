import { FcComboChart } from "react-icons/fc";
import { Link, useLocation  } from "react-router-dom"
import { useState, useEffect } from "react";
import css from '../styles/Header.module.css'

export const Header=()=>{

    const [buttons, setButtons] = useState()
    const location = useLocation()
    

    useEffect(()=>{
        const buttonsList = ['home', 'detailes', 'news', 'contact']
        const path=location.pathname.split('/')
        const pageTitle = path[path.length-1]
        console.log(buttonsList)
        const markup=buttonsList.map((button, index)=>{
            if (button!==pageTitle.toLowerCase()) {
                let upperLetter=button.charAt(0).toUpperCase()+button.slice(1)
                return (<Link key={index} to={`/React-stock-data/${button}`}>
                <button>{upperLetter}</button>
                </Link> )
            }
            return null;
            })
        setButtons(markup)
    },[location])
  

    return(
        <header>
            <div className ={css.mainDiv}>
                <div className ={css.mainDiv}>
                <FcComboChart />
                <p>Stock-Market-Data</p>
                {buttons}
                <p>Roman Pisarski</p>
                </div>
            </div>
        </header>
    )
}