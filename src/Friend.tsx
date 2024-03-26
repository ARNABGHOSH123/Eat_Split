import React from "react";
import { FriendData } from "./types";
import Button from "./Button";

type FriendProps = FriendData & {
  isSelected: boolean;
  onOpenSplitForm: () => void;
  onCloseSplitForm: () => void;
};

const Friend = function ({
  id,
  isSelected,
  friendProfilePhoto,
  friendName,
  balance,
  onOpenSplitForm,
  onCloseSplitForm,
}: FriendProps) {
  const handleSelect = function () {
    isSelected ? onCloseSplitForm() : onOpenSplitForm();
  };

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friendProfilePhoto} alt="Friend img" />
      <h3>{friendName}</h3>
      <p className={balance > 0 ? "green" : balance < 0 ? "red" : ""}>
        {balance > 0
          ? `${friendName} owes you ${Math.abs(balance)}€`
          : balance < 0
          ? `You owe ${friendName} ${Math.abs(balance)}€`
          : `You and ${friendName} are even`}
      </p>
      <Button onClick={handleSelect}>{isSelected ? "Close" : "Select"}</Button>
    </li>
  );
};

export default Friend;
