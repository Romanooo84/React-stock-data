import { newsData } from "hooks/downloadData";
import css from '../styles/News.module.css'
import { useState, useEffect } from "react";
import {Modal} from '../components/Modal';

export const News = ({ chartTicker }) => {
    const [text, setText] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataNews, setDataNews]=useState([])
    const [modalNews, setModalNews]=useState()

    const openModal = (e) => {
        const id=e.target.id
        console.log(dataNews)
        let data=dataNews[id]
        console.log(data)
        if (data){
        setModalNews(
            <div className={css.newsDiv}>
                <p className={css.title}>{data.title}</p>
                <div className={css.date}>
                    <p>{data.date[0]}</p>
                    <p>{data.date[2]} UTC</p>
                </div>
                <p className={css.modalText}>{data.content}</p>
            </div>
        )
        setIsModalOpen(true);
    }
    }
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        newsData(chartTicker)
            .then(data => {
                setDataNews(data)
                const markup = data.map((news, index) =>{
                    news.date=news.date.split('T')
                    let newHour=news.date[1].split('+')
                    news.date=[...news.date,...newHour]
                    return(
            
                    <div className={css.newsDiv} key={index}>
                        <p className={css.title}>{news.title}</p>
                        <div className={css.date}>
                            <p>{news.date[0]}</p>
                            <p>{news.date[2]} UTC</p>
                        </div>
                        <button id={index}className={css.text} onClick={openModal}>{news.content}</button>
                    </div>
                )} );
                setText(markup);
            });
    }, [chartTicker, isModalOpen, openModal]);

    return (
        <div className={css.mainDiv}>
            <h1>Latest News</h1>
            <div>{text}</div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div>
                     {modalNews}
                </div>
            </Modal>
        </div>
    );
};
