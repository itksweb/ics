import { getPath } from "../assets/utils";

const ActionIcon = ({ id }) => {
  const path = getPath(id)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 size-3 fill-current"
    >
      <path d={path} />
    </svg>
  );
};

export const ActionButton = ({ setMode, id, mode }) => {
  const actionText = (str) => str[0].toUpperCase() + str.slice(1); 
  return (
    <button
      type="button"
      className={`flex cursor-pointer items-center gap-2 font-medium ${
        id === "delete"
          ? "text-pink400 disabled:text-pink200"
          : "text-purple600 disabled:text-grey100"
      }`}
      onClick={() => {
        setMode(id);
      }}
      disabled={mode === "edit"}
    >
      <ActionIcon id={id} />
      <span className={``}>{actionText(id)}</span>
    </button>
  );
};

export const SubmitButton = ({ mode, handleUpdateComment, handleAddComment }) => {
  const handleButtonSubmit = (e) => {
    e.preventDefault();
    if (mode === "edit") {
      return handleUpdateComment();
    }
    if (!mode || mode === "reply") {
      return handleAddComment();
    }
  };
  const actionText = () => {
    if (mode === "reply") {
      return "REPLY";
    }
    if (mode === "edit") {
      return "UPDATE";
    }
    if (!mode) {
      return "SEND";
    }
  };
  return (
    <button
      onClick={handleButtonSubmit}
      className={`bg-purple600 hover:bg-purple200 text-white py-2 px-5 rounded-md  cursor-pointer`}
    >
      {actionText()}
    </button>
  );
};

// export default ActionButton;
