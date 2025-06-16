import { useEffect, useState } from "react";
import User from "./User";
import VoteScore from "./VoteScore";
import Response from "./Response";
import { ActionButton, SubmitButton } from "./Buttons";
import { useFocus } from "../assets/utils";
import { formatTime } from "../assets/utils";
import { useSelector, useDispatch } from "react-redux";
import { editComment, changeScore } from "../store/generalSlice";
import Modal from "./Modal";

const Feedback = ({ data, index, parentIndex }) => {
  const [mode, setMode] = useState("");
  const [editInput, setEditInput] = useState("");
  const [inputRef, setInputRef] = useFocus();
  const dispatch = useDispatch();

  const {currentUser } = useSelector((state) => state.gen);
  const you = currentUser.username === data.user.username;

  useEffect(() => {
    if (mode === "edit") {
      setEditInput(data.content);
      setInputRef();
    }
  }, [mode]);

  const updateScore = (sign) => {
    dispatch(changeScore({ sign, parentIndex, index }));
  };
  const handleUpdateComment = () => {
    if (you && editInput.trim()) {
      dispatch(editComment({ index, text: editInput, parentIndex }));
      setMode("");
    }
  };

  const ActionButtons = ({ cls }) => {
    return (
      <div className={`flex justify-end gap-4 ${cls ? cls : ""}`}>
        {!you && <ActionButton mode={mode} setMode={setMode} id="reply" />}
        {you && <ActionButton mode={mode} setMode={setMode} id="delete" />}
        {you && <ActionButton mode={mode} setMode={setMode} id="edit" />}
      </div>
    );
  };

  const MobileBottom = () => {
    return (
      <div className="flex justify-between items-center mt-3 sm:hidden">
        <VoteScore score={data.score} cls="grid-cols-3" />
        <ActionButtons />
      </div>
    );
  };

  return (
    <>
      <div className=" flex gap-5 items-start p-5 bg-white max-sm:text-sm text-grey500 rounded-md">
        <VoteScore
          score={data.score}
          cls="max-sm:hidden"
          changeScore={updateScore}
        />
        <div className="right w-full">
          <div className="top flex justify-between items-center mb-3">
            <div className="top-left flex gap-3">
              <User
                avatar={data.user.image.png}
                username={data.user.username}
              />
              {you && (
                <p>
                  <span className=" p-1 rounded-[1px] bg-purple600 text-white text-[12px] font-semibold">
                    you
                  </span>
                </p>
              )}
              <p>{formatTime(data.createdAt)}</p>
            </div>
            <ActionButtons cls="max-sm:hidden" />
          </div>
          {/* content edit or content display */}
          {mode !== "edit" ? (
            <div className="content">
              {data.replyingTo ? <span>{`@${data.replyingTo} `}</span> : null}
              {data.content}
            </div>
          ) : (
            <>
              <textarea
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
                placeholder="Add a comment"
                rows={4}
                className="w-full px-3 py-1.5 cursor-pointer"
                ref={inputRef}
              />
              <div className="flex justify-end">
                <SubmitButton
                  mode={mode}
                  handleUpdateComment={handleUpdateComment}
                />
              </div>
            </>
          )}
          <MobileBottom />
        </div>
      </div>
      {mode === "reply" ? (
        <Response
          mode={mode}
          replyingTo={data.user.username}
          index={parentIndex ? parentIndex : index}
          setMode={setMode}
        />
      ) : null}
      {mode === "delete" && <Modal />}
    </>
  );
};

const Comment = ({ comment, index }) => (
  <Feedback data={comment} index={index} />
);

const Reply = ({ rep, index, parentIndex }) => (
  <Feedback data={rep} index={index} parentIndex={parentIndex} />
);

const CommentCard = ({ comment, index }) => {
  return (
    <>
      <Comment comment={comment} index={index} />
      {comment.replies.length ? (
        <div className="sm:ml-10 border-l-2 flex flex-col gap-4 pl-4 sm:pl-10">
          {comment.replies.map((rep, i) => (
            <Reply rep={rep} key={rep.id} index={i} parentIndex={index} />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default CommentCard;
