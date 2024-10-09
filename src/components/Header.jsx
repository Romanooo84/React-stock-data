import { FcComboChart } from "react-icons/fc"
import { RiMenuFold3Fill } from "react-icons/ri";
import { RiMenuFold4Fill } from "react-icons/ri";
import { useData } from 'hooks/dataContext';
import { Link, useLocation  } from "react-router-dom"
import { useState, useEffect, useCallback } from "react";
import css from '../styles/Header.module.css'

export const Header=()=>{

    const [buttons, setButtons] = useState()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { updateData } = useData();
    const location = useLocation()

    const onClick = useCallback(() => {
        updateData({ isStartPage: true });
        setIsMenuOpen(false)
    }, [updateData]);

    useEffect(()=>{
        const buttonsList = ['home', 'details', 'currency', 'news', 'contact']
        const path=location.pathname.split('/')
        const pageTitle = path[path.length-1]
        const markup=buttonsList.map((button, index)=>{
            if (button!==pageTitle.toLowerCase()) {
                let upperLetter=button.charAt(0).toUpperCase()+button.slice(1)
                return (
                    <Link key={index} to={`/React-stock-data/${button}`}>
                    <button className={css.headerButton} onClick={onClick}>{upperLetter}</button>
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
    }, [location, onClick])
    
   
  

    return(
        <header>
            <div className ={css.mainDiv}>
                <div className ={css.mainDiv}>
                    <div className={css.logoDiv}>
                        <FcComboChart size={20} />
                    <p className={ css.paragrph}>Stock-Market-Data</p>
                    </div>
                    <div className={` ${isMenuOpen ? css.menu : css.menuHidden} `}>
                        {buttons}
                        <FcComboChart className={ css.visuallyHidden} size={50} />
                    </div>
                    <button className={`${css.hamburgerHidden} ${css.hamburgerButton}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {!isMenuOpen ? (<RiMenuFold3Fill className={`${css.hamburgerMenu}`}/>) : (<RiMenuFold4Fill className={`${css.hamburgerMenu}`} />)}
                    </button>
                </div>
            </div>
        </header>
    )
}
