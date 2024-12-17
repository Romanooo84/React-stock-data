const tickers=require('./tickers.json')
const {multipleLiveData}=require('../downloads')

let a=0
let b=0

const list = tickers.map(ticker=> {
   b++
    if(ticker!==null && ticker.Type==="Common Stock"){
        let exchange
        ticker.Country==='USA'? exchange='US':exchange=ticker.Exchange
        const code = `${ticker.Code}.${exchange}`
     
    return(code)
}
})
const fetchMultiplyData = async()=>{
    let dataList=[]
    i=0
    let downloads = list.length/100
    while (list.length>0){
        const tempList = list.splice(0,99)
        const data = await multipleLiveData(tempList)
        dataList.push(data)
        console.log('left: '+downloads)
        downloads--
    }
    dataList=dataList.flat()
    console.log(dataList)
    console.log(i)
}

module.exports={
    fetchMultiplyData
}