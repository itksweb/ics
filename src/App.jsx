import { useEffect, useState } from "react";
import CommentCard from "./components/CommentCard";
import Response from "./components/Response";
import { useSelector, useDispatch } from "react-redux";
import { setComments, setCurrentUser } from "./store/generalSlice";
import { sortedArray } from "./assets/utils";

function App() {
  const dispatch = useDispatch();
  const { comments, currentUser } = useSelector((state) => state.gen);

  useEffect(() => {
    const fetchfromDb = async () => {
      try {
        const res = await fetch("data.json");
        const db = await res.json();
        // console.log("REST", db.currentUser);
        localStorage.setItem("currentUser", JSON.stringify(db.currentUser));
        localStorage.setItem("comments", JSON.stringify(db.comments));
        if (!currentUser.username) dispatch(setCurrentUser(db.currentUser));
        if (!comments.length) dispatch(setComments(db.comments));
        console.log("from db");
      } catch (error) {
        console.error("Error fetching comments data:", error);
      }
    };
    const fetchFromLocal = () => {
      if (localStorage.getItem("currentUser")) {
        dispatch(
          setCurrentUser(JSON.parse(localStorage.getItem("currentUser")))
        );
      }
      if (localStorage.getItem("comments")) {
        dispatch(setComments(JSON.parse(localStorage.getItem("comments"))));
      }
      
      
      console.log("from local");
    };
    localStorage.getItem("currentUser") && localStorage.getItem("comments")
      ? fetchFromLocal()
      : fetchfromDb();
  }, []);

  return (
    <div className=" flex flex-col gap-4 py-4 bg-grey50 h-full max-w-3xl px-5">
      {comments.length && (
        <div className="flex flex-col gap-4 pb-5 ">
          {" "}
          {sortedArray([...comments]).map((comment, i) => (
            <CommentCard key={comment.id} comment={comment} index={i} />
          ))}{" "}
        </div>
      )}
      {currentUser.username && <Response />}
    </div>
  );
}

export default App;
