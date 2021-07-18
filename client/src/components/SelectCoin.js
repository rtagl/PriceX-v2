const SelectCoin = ({ coins, selectedCoin, handleChange }) => {
  return (
    <div>
      <div>
        <h2>Select a coin</h2>
      </div>
      <div>
        <select onChange={handleChange}>
          <option>Select A Coin</option>
          {coins ? coins.map((coin) => <option key={coin.id}>{coin.name}</option>) : null}
        </select>
      </div>
      <div>{selectedCoin ? <img className="coin-logo" src={selectedCoin.logo_url} alt="" /> : null}</div>
    </div>
  );
};

export default SelectCoin;
