import { FcComboChart } from "react-icons/fc";
import css from '../styles/Footer.module.css'

export const Footer=()=>{
    return(
        <footer>
            <div className ={css.mainDiv}>
                <div className ={css.mainDiv}>
                <FcComboChart />
                <p>Stock-Market-Data</p>
                <p>Footer</p>
                </div>
                <div>
                    <p>Roman Pisarski</p>
                </div>
            </div>
        </footer>
    )
}