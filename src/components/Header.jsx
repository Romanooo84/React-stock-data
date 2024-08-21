import { useState, useEffect } from "react"
import Select from 'react-select';
import tickers from '../data/ticers'
import { multiplyData } from '../hooks/downloadData';

export const Header=()=>{

    const [list, setList] = useState()
    const [tickerList, setTickerList] = useState(['AAPL.US', 'EUR.FOREX'])
    const [search, setSearch] = useState()
    const [searchTerm, setSearchTerm]=useState()
    const [options, setOptions] = useState([{ label: '3', value: 'initial' }]);
    const [multiplyList, setMultiplyList] = useState([])

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
    
    const onInputChange = (event) => {
        setSearch(event)
    }

    const handleClick = (index) => {
        console.log('Clicked div with name:', index);
    };

    useEffect(() => {
        multiplyData(tickerList)
          .then(downloadedData => {
            if (downloadedData) {
              setMultiplyList(downloadedData);
            }
          });
      }, []);

    useEffect(() => {
        if (search && search.length > 2) {
            setSearchTerm(search)
        }
    })

     useEffect(() => {
        if (multiplyList.length > 0) {
            const markup = multiplyList.map((ticker, index) => (
                <div key={index} name={index} onClick={() => handleClick(index)}>
                    <Select placeholder="write min 3 letters..." options={options} onChange={onChange} onInputChange={onInputChange}/>
                    <div>{ticker.code}</div>
                    <div>{ticker.change_p}%</div>
                </div>
            ));
            setList(markup);
        }
    }, [multiplyList, options]);

    useEffect(() => {
        setOptions([{ label: 'write 3 letters', value: 'initial' }]);
     },[]);

    return(
        <header>
            <div>{list}</div>
        </header>
    )
}