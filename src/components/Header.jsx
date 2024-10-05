import { FcComboChart } from "react-icons/fc"
import { CiMenuKebab } from "react-icons/ci";
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
    }, [updateData]);

    useEffect(() => {
        console.log(isMenuOpen)
    },[isMenuOpen])
    
    

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
                    <FcComboChart />
                    <p className={`${css.visuallyHidden} ${css.paragrph}`}>Stock-Market-Data</p>
                    </div>
                    <div className={` ${isMenuOpen ? css.menu : css.menuHidden} `}>
                        {buttons}
                    </div>
                    <button className={`${css.hamburgerHidden} ${css.hamburgerButton}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <CiMenuKebab className={`${css.hamburgerMenu}`} />
                    </button>
                </div>
            </div>
        </header>
    )
}
