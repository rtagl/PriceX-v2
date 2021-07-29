const Quote = ({ selectedCoin }) => {
  return <div className="text-xl md:text-2xl font-semibold mb-5">If {selectedCoin.name} had the market cap of . . . </div>;
};

export default Quote;
