import { FcComboChart } from "react-icons/fc";
import css from '../styles/Header.module.css'

export const Header=()=>{
    return(
        <header>
            <div className ={css.mainDiv}>
                <div className ={css.mainDiv}>
                <FcComboChart />
                <p>Stock-Market-Data</p>
                </div>
                <div>
                    <p>Roman Pisarski</p>
                </div>
            </div>
        </header>
    )
}