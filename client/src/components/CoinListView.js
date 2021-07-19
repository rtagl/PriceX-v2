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
      return (multiplier * 100).toFixed(2) + "%";
    } else {
      return Math.round(multiplier) + "x";
    }
  };

  const nFormatter = (mcap) => {
    const num = Number(mcap);
    if (num >= 1000000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "T";
    }
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  };

  return (
    <div>
      {coins.map((coin) => (
        <div key={coin.id} className="bg-gray-100 border-solid border-2 border-gray-200 rounded-lg shadow-lg my-6">
          <div className="flex justify-between">
            <div className="flex-1 max-w-xl">
              <div className="flex flex-row my-14 mx-8 flex-wrap content-start justify-between">
                <div className="flex">
                  <img className="w-12" src={coin.logo_url} alt="" />
                  <div className="mx-6">
                    <div>{coin.id}</div>
                    <div className="text-lg font-semibold">{coin.name}</div>
                  </div>
                </div>
                <div className="py-2 mx-8 text-3xl font-semibold">{"$" + nFormatter(coin.market_cap)}</div>
              </div>
            </div>
            {selectedCoin ? (
              <div className="flex flex-col mx-2 my-6">
                <div className="flex flex-row justify-between">
                  <div className="px-12">Current Price</div>
                  <div className="px-12">${Number(selectedCoin.price).toFixed(2)}</div>
                </div>
                <div className="flex flex-row justify-between my-4">
                  <div className="px-12">Potential Price</div>
                  <div className="px-12">${coinValueAtX(coin, selectedCoin)}</div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="px-12">Potential Upside</div>
                  <div className="px-12 font-semibold">{potentialUpside(coin, selectedCoin)}</div>
                </div>
              </div>
            ) : (
              <div>hello</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoinListView;
