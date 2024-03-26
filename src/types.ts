export type FriendData = {
  id: number;
  friendProfilePhoto: string;
  friendName: string;
  balance: number;
};

export type AddFriendProps = {
  onAddFriend: (newFriend: FriendData) => void;
};

export type SplitFormData = {
  billValue: number;
  myExpense: number;
  friendExpense: number;
  payingPerson: string;
};

export type SplitBillProps = {
  friendWithWhomToSplit: FriendData;
  onSplit: (updatedBalance: number) => void;
};
