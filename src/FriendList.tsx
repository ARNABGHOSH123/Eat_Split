import React from "react";
import Friend from "./Friend";
import { FriendData } from "./types";

type FriendListProps = {
  friends: FriendData[];
  currFriendWithWhomToSplit?: FriendData;
  onOpenSplitForm: (friend: FriendData) => void;
  onCloseSplitForm: () => void;
};

const FriendList = function ({
  friends,
  currFriendWithWhomToSplit,
  onOpenSplitForm,
  onCloseSplitForm,
}: FriendListProps) {
  return (
    <ul>
      {friends.map(({ id, balance, friendName, friendProfilePhoto }) => {
        return (
          <Friend
            key={id}
            {...{
              id,
              balance,
              friendName,
              friendProfilePhoto,
              isSelected: currFriendWithWhomToSplit?.id === id,
              onOpenSplitForm: () =>
                onOpenSplitForm({
                  id,
                  balance,
                  friendName,
                  friendProfilePhoto,
                }),
              onCloseSplitForm,
            }}
          />
        );
      })}
    </ul>
  );
};

export default FriendList;
