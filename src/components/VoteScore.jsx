

const VoteScore = ({ score, cls, changeScore }) => {
  const handleUpdateScore = (e) => {
    if (
      (score > 0 && e.target.id === "minus") ||
      (score >= 0 && e.target.id === "plus")
    ) {
      changeScore(e.target.id);
    }
  };
  return (
    <div
      className={`bottom-left bg-grey100 p-2 text-center grid items-center  gap-2 text-[0.8em] rounded-lg ${
        cls ? cls : ""
      }`}
    >
      <img
        src="./images/icon-plus.svg"
        alt="icon-plus"
        className="shrink-0 cursor-pointer"
        id="plus"
        onClick={(e) => {
          changeScore(e.target.id);
        }}
      />
      <span className="">{score}</span>
      <img
        src="./images/icon-minus.svg"
        alt="icon-minus"
        className="shrink-0 cursor-pointer"
        id="minus"
        onClick={handleUpdateScore}
      />
    </div>
  );
};

export default VoteScore;
