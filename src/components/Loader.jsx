import css from '../styles/loader.module.css'

export const Loader = () => {
    return (
        <div className={css.mainDiv}>
            <div className={css.wifiLoader}>
                <svg className={css.circleOuter} viewBox="0 0 86 86">
                    <circle className={css.back} cx="43" cy="43" r="40"></circle>
                    <circle className={css.front} cx="43" cy="43" r="40"></circle>
                    <circle className={css.new} cx="43" cy="43" r="40"></circle>
                </svg>
                <svg className={css.circleMiddle} viewBox="0 0 60 60">
                    <circle className={css.back} cx="30" cy="30" r="27"></circle>
                    <circle className={css.front} cx="30" cy="30" r="27"></circle>
                </svg>
                <svg className={css.circleInner} viewBox="0 0 34 34">
                    <circle className={css.back} cx="17" cy="17" r="14"></circle>
                    <circle className={css.front} cx="17" cy="17" r="14"></circle>
                </svg>
                <div className={css.text} data-text="Searching for data..."></div>
            </div>
        </div>
    )
}