import { useEffect, useState } from "react";
import User from "./User";
import VoteScore from "./VoteScore";
import Response from "./Response";
import { ActionButton, SubmitButton } from "./Buttons";
import { useFocus } from "../assets/utils";
import { formatTime } from "../assets/utils";
import { useSelector, useDispatch } from "react-redux";
import { editComment, changeScore, deleteComment } from "../store/generalSlice";

const Feedback = ({ data, index, parentIndex }) => {
  const [mode, setMode] = useState("");
  const [inputRef, setInputRef] = useFocus();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.gen);
  const you = currentUser.username === data.user.username;

  const updateScore = (sign) => {
    dispatch(changeScore({ sign, parentIndex, index }));
  };

  const handleDelete = () => {
    dispatch(
      deleteComment({ index, parentIndex, username: data.user.username })
    );
    setMode("")
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
        <VoteScore
          score={data.score}
          cls="grid-cols-3"
          changeScore={updateScore}
        />
        <ActionButtons />
      </div>
    );
  };
  const EditScreen = () => {
    const [editInput, setEditInput] = useState("");

    useEffect(() => {
      setEditInput(data.content);
      setInputRef();

    }, []);

    const handleUpdateComment = () => {
      if (you && editInput.trim()) {
        dispatch(editComment({ index, text: editInput, parentIndex }));
        setMode("");
      }
    };

    return (
      <>
        <textarea
          value={editInput}
          onChange={(e) => setEditInput(e.target.value)}
          placeholder="Add a comment"
          rows={4}
          className="w-full px-3 py-1.5 cursor-pointer border border-grey100 outline-0 focus:ring-0 focus:border-grey500 rounded-lg"
          ref={inputRef}
        />
        <div className="flex justify-end">
          <SubmitButton mode={mode} handleUpdateComment={handleUpdateComment} />
        </div>
      </>
    );
  };

  const DeleteScreen = () => {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
        <div className=" bg-white p-7 rounded-lg relative text-grey800 w-[400px] flex flex-col gap-5 ">
          <h1 className="text-2xl font-semibold">Delete comment</h1>
          <p className="">
            Are you sure you want to delete this comment? This will remove the
            comment and it can't be undone.
          </p>
          <div className="flex justify-between items-center">
            <button
              className="rounded-xl text-white bg-grey800 p-4 w-[45%] cursor-pointer"
              type="button"
              onClick={() => setMode("")}
            >
              NO, CANCEL
            </button>
            <button
              className="rounded-xl text-white bg-pink400 p-4 w-[45%] cursor-pointer"
              type="button"
              onClick={() => handleDelete()}
            >
              YES, DELETE
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className=" flex gap-5 items-start p-5 bg-white text-grey500 rounded-md">
        <VoteScore
          score={data.score}
          cls="max-sm:hidden"
          changeScore={updateScore}
          index={index}
          parentIndex={parentIndex}
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
            <EditScreen />
          )}
          <MobileBottom />
        </div>
      </div>
      {mode === "reply" ? (
        <Response
          mode={mode}
          replyingTo={data.user.username}
          index={index}
          parentIndex={parentIndex}
          setMode={setMode}
        />
      ) : null}
      {mode === "delete" ? <DeleteScreen /> : null}
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
        <div className="sm:ml-10 border-l-2 border-l-grey100 flex flex-col gap-4 pl-4 sm:pl-10">
          {comment.replies.map((rep, i) => (
            <Reply rep={rep} key={rep.id} index={i} parentIndex={index} />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default CommentCard;
