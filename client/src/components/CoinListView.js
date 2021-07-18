const CoinListView = ({ coins }) => {
  return (
    <div>
      {coins ? (
        coins.map((coin) => (
          <div key={coin.id} className="box">
            <div>
              <img className="coin-logo" src={coin.logo_url} alt="" />
              <div>{coin.name}</div>
            </div>
            <div>${coin.price}</div>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CoinListView;
