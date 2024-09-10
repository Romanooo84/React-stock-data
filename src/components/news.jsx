import { newsData } from "hooks/downloadData";
import css from '../styles/News.module.css'
import { useState, useEffect } from "react";

export const News = ({ chartTicker }) => {
    const [text, setText] = useState(null);

    useEffect(() => {
        newsData(chartTicker)
            .then(data => {
                const markup = data.map((news, index) => (
                    <div key={index}>
                        <p className={css.title}>{news.title}</p>
                        <p>{news.date}</p>
                        <p>{news.content}</p>
                    </div>
                ));
                setText(markup);
            });
    }, [chartTicker]);

    return (
        <div>
            <h1>Latest News</h1>
            <div>{text}</div>
        </div>
    );
};
