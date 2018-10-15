async function getEthPrice() {
    const response = await fetch('https://api.coinmarketcap.com/v2/ticker/1/?convert=ETH');
    const data = await response.json();
    
    const BTCPrice = data.data.quotes.USD.price;
    const ETHRatio = data.data.quotes.ETH.price;
    const ETHPrice = BTCPrice / ETHRatio;

    return ETHPrice;
}

export default getEthPrice;