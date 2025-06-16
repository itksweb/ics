import React from 'react'

const User = ({avatar, username}) => {
  return (
    <div className="user flex gap-2 ">
      <img
        src={avatar}
        alt={username}
        className="size-7 shrink-0"
      />
      <p>{username}</p>
    </div>
  );
}

export default User
