async function getEthPrice() {
    const EthereumPrice = await (await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')).json();

    return EthereumPrice;
}

export default getEthPrice;