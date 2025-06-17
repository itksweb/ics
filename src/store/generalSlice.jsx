import { createSlice } from "@reduxjs/toolkit";
import { getRandomNumberExcluding, deproxify } from "../assets/utils";

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
      const { index, text, parentIndex } = action.payload;
      let commentsCopy = [...state.comments];
      Number.isInteger(parentIndex)
        ? (commentsCopy[parentIndex].replies[index].content = text)
        : (commentsCopy[index].content = text);
      state.comments = [...commentsCopy];
    },
    changeScore(state, action) {
      const { index, parentIndex, sign } = action.payload;
      let commentsCopy = [...state.comments];
      if (Number.isInteger(parentIndex)) {
        if (sign === "plus") {
          commentsCopy[parentIndex].replies[index].score += 1;
        } else if (sign === "minus") {
          commentsCopy[parentIndex].replies[index].score -= 1;
        }
      } else {
        console.log("parant", parentIndex);
        if (sign === "plus") {
          commentsCopy[index].score += 1;
        } else if (sign === "minus") {
          commentsCopy[index].score -= 1;
        }
      }
      state.comments = [...commentsCopy];
    },
    deleteComment(state, action) {
      const { index, parentIndex, username } = action.payload;
      let commentsCopy = [...state.comments];

      if (state.currentUser.username === username) {
        const newComments = Number.isInteger(parentIndex)
          ? commentsCopy[parentIndex].replies.filter((item, i) => i !== index)
          : commentsCopy.filter((item, i) => i !== index);
        // localStorage.setItem("comments", JSON.stringify(newComments));
        state.comments = [...newComments];
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
      state.comments = [...state.comments, { ...newComment }];
      // localStorage.setItem(
      //   "comments",
      //   JSON.stringify([...comments, newComment])
      // );
    },
    replyComment(state, action) {
      const { index, parentIndex, text, replyingTo } = action.payload;
      let ind = index;
      if (Number.isInteger(parentIndex)) {
        ind = parentIndex;
      }
      console.log("received index: ", ind);
      let commentsCopy = [...state.comments];
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
      commentsCopy[ind].replies.push({ ...newReply });
      console.log(deproxify(commentsCopy));
      state.comments = [...commentsCopy];
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
  changeScore,
} = genSlice.actions;
export default genSlice.reducer;
