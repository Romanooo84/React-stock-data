import { useState, useEffect } from "react"
import Select from 'react-select';
import tickers from '../data/ticers'

export const Header=({multiplyList})=>{

    const [list, setList]=useState()
    const [options, setOptions] = useState([]);

    const searchTerm = "Allegro";

    useEffect(() => {
        const results = tickers.filter(item => item.Name.includes(searchTerm));
    
        const options = results.map(item => ({
          value: `${item.Code}.${item.Exchange}`,
          label: `${item.Code}-${item.Name}`
        }));
    
        setOptions(options);
      }, [tickers, searchTerm])
    
    const onChange = (event) => {
        console.log('Selected option:', event.value);
      }


    useEffect(() => {
        if (multiplyList.length > 0) {
            const markup = multiplyList.map((ticker, index) => (
                <div key={index}>
                    <div>{ticker.code}</div>
                    <div>{ticker.change_p}%</div>
                </div>
            ));
            setList(markup);
        }
    }, [multiplyList]);

    return(
        <header>
            <Select options={options} onChange={onChange}/>
            <div>{list}</div>
        </header>
    )
}