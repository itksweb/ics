import { useRef, useCallback } from "react";

export const getPath = (id) => {
  const editPath =
    "M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z";

  const deletePath =
    "M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667z";

  const replyPath =
    "M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z";
  let iconPath = "";
  switch (id) {
    case "delete":
      iconPath = deletePath;
      break;
    case "reply":
      iconPath = replyPath;
      break;
    case "edit":
      iconPath = editPath;
      break;
    default:
      iconPath = "";
      break;
  }
  return iconPath;
};

export const getRandomNumberExcluding = (min, max, exclude) => {
  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (exclude.includes(randomNumber));
  return randomNumber;
};

export const formatTime = (time) => {
  if (typeof time === "number") {
    const diff = Date.now() - time;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    if (days >= 1) {
      return days + ` day${days > 1 ? "s":""} ago`;
    }
    if (hours >= 1) {
      return hours + ` hour${hours > 1 ? "s":""} ago`;
    }
    if (minutes >= 1) {
      return minutes + ` minute${minutes > 1 ? "s":""} ago`;
    }
    if (seconds >= 1) {
      return seconds + ` second${seconds > 1 ? "s":""} ago`;
    }
  } else if (typeof time === "string") {
    return time;
  }

  // console.log(
  //   `${days} days, ${hours} hours ${minutes} minutes, ${seconds} seconds`
  // );

  // return { days, hours, minutes, seconds };
};

export const useFocus = () => {
  const ref = useRef(null);
  const setFocus = useCallback(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);
  return [ref, setFocus];
};
export const deproxify = (x) => JSON.parse(JSON.stringify(x));

export const sortedArray = (gh) => {
  gh.sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    }
    if (a.score > b.score) {
      return -1;
    }
    return 0;
  });
  return gh
}