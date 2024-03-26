import React, { useState } from "react";
import FriendList from "./FriendList";
import { initialFriends } from "./mock_data";
import { FriendData } from "./types";
import AddFriendForm from "./AddFriendForm";
import SplitBillForm from "./SplitBillForm";
import Button from "./Button";

function App() {
  const [friendsList, setFriendsList] = useState<FriendData[]>(initialFriends);
  const [showAddFriendForm, setShowAddFriendForm] = useState<boolean>(false);
  const [currFriendWithWhomToSplit, setCurrFriendWithWhomToSplit] =
    useState<FriendData>();

  const handleShowAddFriendForm = function () {
    setShowAddFriendForm((currShow) => !currShow);
    setCurrFriendWithWhomToSplit(undefined);
  };

  const handleOpenSplitForm = function (friend: FriendData) {
    setCurrFriendWithWhomToSplit(friend);
    setShowAddFriendForm(false);
  };

  const handleCloseSplitForm = function () {
    setCurrFriendWithWhomToSplit(undefined);
  };

  const handleAddFriend = function (newFriend: FriendData) {
    setFriendsList((currList) => [...currList, newFriend]);
    setShowAddFriendForm(false);
  };

  const handleSplitBillWithFriend = function (updatedBalance: number) {
    setFriendsList((currList) =>
      currList.map((friend) =>
        friend.id === currFriendWithWhomToSplit?.id
          ? { ...friend, balance: updatedBalance + friend.balance }
          : friend
      )
    );
    handleCloseSplitForm();
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          {...{
            friends: friendsList,
            currFriendWithWhomToSplit,
            onOpenSplitForm: handleOpenSplitForm,
            onCloseSplitForm: handleCloseSplitForm,
          }}
        />
        {showAddFriendForm && <AddFriendForm onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriendForm}>
          {showAddFriendForm ? "Close" : "Add friend"}
        </Button>
      </div>
      {!!currFriendWithWhomToSplit && (
        <div>
          <SplitBillForm
            {...{
              friendWithWhomToSplit: currFriendWithWhomToSplit,
              onSplit: handleSplitBillWithFriend,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
