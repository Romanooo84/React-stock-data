import { newsData } from "hooks/downloadData";
import { useState, useEffect } from "react";

export const News = ({ chartTicker }) => {
    const [text, setText] = useState(null);

    useEffect(() => {
        newsData(chartTicker)
            .then(data => {
                const markup = data.map((news, index) => (
                    <div key={index}>
                        <p>{news.title}</p>
                        <p>{news.date}</p>
                        <p>{news.content}</p>
                    </div>
                ));
                setText(markup);
            });
    }, [chartTicker]);

    return (
        <div>{text}</div>
    );
};
