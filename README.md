# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic 


## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [solution URL](https://github.com/itksweb/interactive-comment-section)
- Live Site URL: [live site URL](https://ics-nine.vercel.app/)

## My process

### Built with

- [React](https://reactjs.org/) - JS library
- [Tailwind CSS](https://tailwindcss.com/)
- Redux toolkit & React redux for state management

### What I learned



```js
editComment(state, action) {
      const { index, text, parentIndex } = action.payload;
      let commentsCopy = [...state.comments];
      Number.isInteger(parentIndex)
        ? (commentsCopy[parentIndex].replies[index].content = text)
        : (commentsCopy[index].content = text);
      state.comments = [...commentsCopy];
    }
```

```js
useEffect(() => {
  if (mode === "reply") {
    setInput(`@${replyingTo} `);
    setInputRef();
  }
}, [mode]);
```


### Useful resources


## Author

- WhatsApp - [here](https://wa.me/2348060719978)
- LinkedIn - [here](https://www.linkedin.com/in/kingsleyikpefan)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/itksweb)
