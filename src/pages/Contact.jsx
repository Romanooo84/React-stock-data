import css from '../styles/Contact.module.css'

export const Contact = () => {
    return (
        <div className={css.mainDiv}>
            <p>Name: Roman Pisarski</p>
            <p>Phone: <a href="tel:+48504707289">504-707-289</a></p>
            <p>Email: <a href="mailto:pisarski.roman@gmail.com">pisarski.roman@gmail.com</a></p>
        </div>
    )
}