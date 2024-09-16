import { newsData } from "hooks/downloadData";
import { useState, useEffect, useCallback } from "react";
import { Loader } from "./Loader";
import {Modal} from './Modal';
import css from '../styles/News.module.css'
import { createDate } from "hooks/createDate";
import { Datepicker } from '@mobiscroll/react';

export const News=()=>{

    const [text, setText] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataNews, setDataNews]=useState([])
    const [modalNews, setModalNews]=useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [isLoading, setIsLoading] =useState(true)
    
    const closeModal = () => {
        setIsModalOpen(false);
    }

    const openModal = useCallback((e) => {
        const id=e.target.id
        let data=dataNews[id]
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
    },[dataNews])

    const onDateChange = (selectedOption) => {
        console.log(selectedOption)
        const startDate=createDate(selectedOption.value)
        const endDate = createDate(selectedOption.value)
         setStartDate(startDate)
         setEndDate(endDate )
     }


    useEffect(()=>{
        let date = new Date()
        setStartDate(createDate(date))
        setEndDate(createDate(date))
    },[])


    useEffect(() => {
        if (startDate) {
            setIsLoading(true)
             newsData('APPL',1000, startDate, endDate)
            .then(data => {
                setDataNews(data)
            });
        }        
    }, [startDate, endDate]);

    useEffect(()=>{
        const markup = dataNews.map((news, index) =>{
            news.date=news.date.split('T')
            let newHour=news.date[1].split('+')
            news.date = [...news.date, ...newHour]
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
        setIsLoading(false)
    }, [dataNews, openModal])
    

    return (
        <div className={css.mainDiv}>
            <div className={css.datepickerDiv}>
                <Datepicker className={css.datepicker} placeholder={`${endDate}`} onChange={onDateChange} controls={['calendar']} touchUi={true} inputComponent="input" inputProps={{ id: 'startDate' }} max={new Date()}/>
            </div>
            { isLoading ? (
                <Loader/>
            ) : (
                <div>{text}</div>
            )}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div>
                     {modalNews}
                </div>
            </Modal>
        </div>
    );
}