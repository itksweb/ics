import { useEffect, useState } from "react";
import { SubmitButton } from "./Buttons";
import { useSelector, useDispatch } from "react-redux";
import { addComment, replyComment } from "../store/generalSlice";
import { useFocus } from "../assets/utils";


const Response = ({ mode, replyingTo, index, setMode }) => {
  const [input, setInput] = useState("");
  const [inputRef, setInputRef] = useFocus();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.gen);

  useEffect(() => {
    if (mode === "reply") {
      console.log(`${replyingTo.length}`);
      setInput(`@${replyingTo} `);
      setInputRef();
    }
  }, [mode]);

  const handleAddComment = (e) => {
    if (input.trim()) {
      if (!mode) {
        dispatch(addComment(input));
      }
      if (mode === "reply") {
        let text = input;
        if (input.startsWith(`@${replyingTo}`)) {
          text = input.slice(replyingTo.length + 1).trim();
        }
        dispatch(replyComment({ index, text, replyingTo }));
        setMode("");
      }
    }
  };

  return (
    <div
      className={` ${
        mode === "reply" ? "-mt-2" : ""
      } flex flex-col sm:flex-row gap-5 items-start p-5 bg-white max-sm:text-sm text-grey500 rounded-md`}
    >
      <img
        src={currentUser.image.png}
        alt={currentUser.username}
        className="size-10 shrink-0 max-sm:hidden"
      />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a comment"
        rows={3}
        className="w-full px-3 py-1.5 cursor-pointer"
        ref={inputRef}
      />
      <div className="flex justify-between items-center max-sm:w-full">
        <img
          src={currentUser.image.png}
          alt={currentUser.username}
          className="size-10 shrink-0 sm:hidden"
        />
        <SubmitButton mode={mode} handleAddComment={handleAddComment} />
      </div>
    </div>
  );
};

export default Response;
