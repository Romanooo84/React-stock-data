import css from '../styles/Loader2.module.css'

export const Loader2=()=>{
    return(
    <div className={css.loaderDiv}>
    <span className={css.loader}>
        <p className={css.text}>Loading</p>
    </span>
    
    
    </div>
    )
}