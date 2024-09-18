import { FcComboChart } from "react-icons/fc";
import css from '../styles/Footer.module.css'

export const Footer=()=>{
    return(
        <footer>
            <div className ={css.mainDiv}>
                <div className ={css.logoDiv}>
                <FcComboChart />
                <p className={css.paragrph}>Stock-Market-Data</p>
                </div>
                <div>
                    <p className={css.paragrph}>Roman Pisarski</p>
                </div>
            </div>
        </footer>
    )
}