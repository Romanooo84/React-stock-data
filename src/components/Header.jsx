import { useState, useEffect } from "react"
import Select from 'react-select';
import tickers from '../data/ticers'

export const Header=({multiplyList})=>{

    const [list, setList] = useState()
    const [search, setSearch] = useState()
    const [searchTerm, setSearchTerm]=useState()
    const [options, setOptions] = useState([{ label: '3', value: 'initial' }]);


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

    useEffect(() => {
        if (search && search.length > 2) {
            setSearchTerm(search)
        }
    })

    useEffect(() => {
        setOptions([{ label: 'write 3 letters', value: 'initial' }]);
     },[]);

    return(
        <header>
            <Select placeholder="write min 3 letters..." options={options} onChange={onChange} onInputChange={onInputChange}/>
            <div>{list}</div>
        </header>
    )
}