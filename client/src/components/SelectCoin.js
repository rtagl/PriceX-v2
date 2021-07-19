const SelectCoin = ({ coins, selectedCoin, handleChange }) => {
  return (
    <div className="border-solid border-4 border-indigo-800 shadow-lg my-2">
      <div>
        <h2>Select a coin</h2>
      </div>
      <div>
        <select onChange={handleChange}>
          <option>Select A Coin</option>
          {coins ? coins.map((coin) => <option key={coin.id}>{coin.name}</option>) : null}
        </select>
      </div>
      <div>{selectedCoin ? <img className="w-8" src={selectedCoin.logo_url} alt="" /> : null}</div>
    </div>
  );
};

export default SelectCoin;
