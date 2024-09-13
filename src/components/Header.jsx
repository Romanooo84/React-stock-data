import { FcComboChart } from "react-icons/fc";
import { Link, useLocation  } from "react-router-dom"
import { useState, useEffect } from "react";
import css from '../styles/Header.module.css'

export const Header=()=>{

    const [buttons, setButtons] = useState()
    const location = useLocation()
    

    useEffect(()=>{
        const buttonsList = ['home', 'details', 'news', 'contact']
        const path=location.pathname.split('/')
        const pageTitle = path[path.length-1]
        const markup=buttonsList.map((button, index)=>{
            if (button!==pageTitle.toLowerCase()) {
                let upperLetter=button.charAt(0).toUpperCase()+button.slice(1)
                return (
                    <Link key={index} to={`/React-stock-data/${button}`}>
                    <button className={css.headerButton}>{upperLetter}</button>
                    </Link> 
                )
            }
            else {
                let upperLetter=button.charAt(0).toUpperCase()+button.slice(1)
                return (
                    <Link key={index} to={`/React-stock-data/${button}`}>
                    <button className={css.activePageButton}>{upperLetter}</button>
                    </Link> 
                )
                
            }
            })
        setButtons(markup)
    },[location])
  

    return(
        <header>
            <div className ={css.mainDiv}>
                <div className ={css.mainDiv}>
                    <div className={css.logoDiv}>
                    <FcComboChart />
                    <p className={css.paragrph}>Stock-Market-Data</p>
                    </div>
                    <div>
                        {buttons}
                    </div>
                </div>
            </div>
        </header>
    )
}
