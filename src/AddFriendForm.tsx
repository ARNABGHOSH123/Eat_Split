import React, { useState } from "react";
import { AddFriendProps, FriendData } from "./types";
import Button from "./Button";

const initialFriendData: FriendData = {
  balance: 0,
  friendName: "",
  friendProfilePhoto: "",
  id: 0,
};

const AddFriendForm = function ({ onAddFriend }: AddFriendProps) {
  const [friendData, setFriendData] = useState<FriendData>(initialFriendData);

  const handleFriendData = function (
    evt: React.ChangeEvent<HTMLInputElement>,
    field: keyof FriendData
  ) {
    setFriendData((currData) => ({ ...currData, [field]: evt.target.value }));
  };

  const handleSubmit = function (evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (!friendData.friendName || !friendData.friendProfilePhoto) {
      return;
    }
    onAddFriend?.({ ...friendData, id: Math.trunc(7 * Math.random() + 1) });
    setFriendData(initialFriendData);
  };

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label htmlFor="add-friend-name">👯Friend name</label>
      <input
        id="add-friend-name"
        type="text"
        value={friendData.friendName}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
          handleFriendData(evt, "friendName")
        }
      />
      <label htmlFor="add-friend-photo">🌇Image URL</label>
      <input
        id="add-friend-photo"
        type="text"
        value={friendData.friendProfilePhoto}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
          handleFriendData(evt, "friendProfilePhoto")
        }
      />
      <Button type="submit">Add</Button>
    </form>
  );
};

export default AddFriendForm;
