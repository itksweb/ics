import { createSlice } from "@reduxjs/toolkit";
import { getRandomNumberExcluding } from "../assets/utils";

const genSlice = createSlice({
  name: "gen",
  initialState: {
    comments: [],
    currentUser: {},
  },
  reducers: {
    setComments(state, action) {
      state.comments = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    editComment(state, action) {
      const { index, text } = action.payload;
      let parentIndex = action.payload.parentIndex;
      let workData = [];
      if (parentIndex) {
        workData = state.comments.filter((item, i) => i !== parentIndex);
        let workItem = { ...state.comments[parentIndex] };
        let workingData = [...workItem.replies].filter(
          (item, i) => i !== index
        );
        let repl = { ...workItem.replies[index] };
        repl.content = text;
        workingData.splice(index, 0, repl);
        workItem = { ...workItem, replies: [...workingData] };
        workData.splice(parentIndex, 0, workItem);
        state.comments = [...workData];
      } else {
        workData = state.comments.filter((item, i) => i !== index);
        let workItem = { ...state.comments[index] };
        workItem.content = text;
        workData.splice(index, 0, workItem);
        state.comments = [...workData];
      }
    },
    changeScore(state, action){
      const { index, sign } = action.payload;
      let parentIndex = action.payload.parentIndex;
      let workData = [];
      if (parentIndex) {
        workData = state.comments.filter((item, i) => i !== parentIndex);
        let workItem = state.comments[parentIndex];
        let workingData = [...workItem.replies].filter(
          (item, i) => i !== index
        );
        let repl = { ...workItem.replies[index] };
        repl.score = sign === "plus" ? (repl.score += 1) : (repl.score -= 1);
        workingData.splice(index, 0, repl);
        workItem = { ...workItem, replies: [...workingData] };
        workData.splice(parentIndex, 0, workItem);
        state.comments = [...workData];
        // dispatch(setComments([...workData]));
      } else {
        workData = state.comments.filter((item, i) => i !== index);
        let workItem = { ...state.comments[index] };
        workItem.score = sign === "plus" ? (workItem.score += 1) : (workItem.score -= 1);
        workData.splice(index, 0, workItem);
        state.comments = [...workData];
        // dispatch(setComments([...workData]));
      }
    },
    deleteComment(state, action) {
      const { id, username } = action.payload;
      if (state.currentUser.username === username) {
        const hasConfirmed = confirm(
          "Are you sure you want to delete this comment?"
        );
        if (hasConfirmed) {
          const newComments = state.comments.filter((item) => id !== item.id);
          // localStorage.setItem("comments", JSON.stringify(newComments));
          state.comments = [...newComments];
        }
      }
    },
    addComment(state, action) {
      const currentIds = state.comments.map((item) => item.id);
      const id = getRandomNumberExcluding(1, 20, currentIds);
      const newComment = {
        id,
        content: action.payload,
        createdAt: Date.now(),
        score: 0,
        replies: [],
        user: {
          image: {
            png: state.currentUser.image.png,
            webp: state.currentUser.image.webp,
          },
          username: state.currentUser.username,
        },
      };
      // console.log(newComment)
      state.comments = [...state.comments, newComment];
      // localStorage.setItem(
      //   "comments",
      //   JSON.stringify([...comments, newComment])
      // );
    },
    replyComment(state, action) {
      const { index, text, replyingTo } = action.payload;
      let workData = [];

      const currentIds = state.comments.map((item) => item.id);
      const id = getRandomNumberExcluding(1, 20, currentIds);
      const newReply = {
        id,
        content: text,
        createdAt: Date.now(),
        score: 0,
        replyingTo,
        user: {
          image: {
            png: state.currentUser.image.png,
            webp: state.currentUser.image.webp,
          },
          username: state.currentUser.username,
        },
      };
      workData = state.comments.filter((item, i) => i !== index);
      let workItem = { ...state.comments[index] };
      workItem.replies = [...workItem.replies, { ...newReply }];
      workData.splice(index, 0, workItem);
      state.comments = [...workData];
    },
  },
});

export const {
  setComments,
  setCurrentUser,
  editComment,
  addComment,
  deleteComment,
  replyComment,
  changeScore
} = genSlice.actions;
export default genSlice.reducer;
