const CoinListView = ({ coins, selectedCoin }) => {
  const coinValueAtX = (coin, selectedCoin) => {
    const coinMC = Number(coin.market_cap);
    const selectedCoinMC = Number(selectedCoin.market_cap);
    const selectedCoinPrice = Number(selectedCoin.price);
    const potentialPrice = (coinMC / selectedCoinMC) * selectedCoinPrice;

    return potentialPrice.toFixed(2);
  };

  const potentialUpside = (coin, selectedCoin) => {
    const potentialPrice = coinValueAtX(coin, selectedCoin);
    const selectedCoinPrice = Number(selectedCoin.price);
    const multiplier = (potentialPrice - selectedCoinPrice) / selectedCoin.price;

    if (multiplier < 10) {
      return multiplier.toFixed(2) * 100 + "%";
    } else {
      return Math.round(multiplier) + "x";
    }
  };

  return (
    <div>
      {coins.map((coin) => (
        <div key={coin.id} className="border-solid border-4 border-indigo-800 shadow-lg my-4">
          <div>
            <img className="w-8" src={coin.logo_url} alt="" />
            <div>{coin.name}</div>
          </div>
          <div>{"$" + Number(coin.price).toFixed(2)}</div>
          {selectedCoin ? (
            <div>
              <div>Current Price ${Number(selectedCoin.price).toFixed(2)}</div>
              <div>Potential Price ${coinValueAtX(coin, selectedCoin)}</div>
              <div>Potential Upside {potentialUpside(coin, selectedCoin)}</div>
            </div>
          ) : (
            <div>hello</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CoinListView;
