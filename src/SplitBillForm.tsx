import React, { useEffect, useMemo, useState } from "react";
import { SplitBillProps, SplitFormData } from "./types";
import Button from "./Button";

const initialSplitFormData: SplitFormData = {
  billValue: 0,
  myExpense: 0,
  friendExpense: 0,
  payingPerson: "you",
};

const SplitBillForm = function ({
  friendWithWhomToSplit,
  onSplit,
}: SplitBillProps) {
  const [splitBillFormData, setSplitBillFormData] =
    useState<SplitFormData>(initialSplitFormData);

  useEffect(() => {
    setSplitBillFormData(initialSplitFormData);
  }, [friendWithWhomToSplit]);

  useEffect(() => {
    setSplitBillFormData((currData) => ({
      ...currData,
      friendExpense: splitBillFormData.billValue,
      myExpense: 0,
    }));
  }, [splitBillFormData.billValue]);

  useEffect(() => {
    const finalMyExpense =
      splitBillFormData.myExpense > splitBillFormData.billValue
        ? splitBillFormData.billValue
        : splitBillFormData.myExpense;
    setSplitBillFormData((currData) => ({
      ...currData,
      friendExpense: splitBillFormData.billValue - finalMyExpense,
      myExpense: finalMyExpense,
    }));
  }, [splitBillFormData.myExpense, splitBillFormData.billValue]);

  const handleChange = function (
    evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof SplitFormData,
    type: "number" | "text"
  ) {
    setSplitBillFormData((currData) => ({
      ...currData,
      [field]: type === "number" ? +evt.target.value : evt.target.value,
    }));
  };

  const handleSubmit = function (evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (!splitBillFormData.billValue) {
      return;
    }
    onSplit?.(
      splitBillFormData.payingPerson === "you"
        ? splitBillFormData.friendExpense
        : -splitBillFormData.myExpense
    );
    setSplitBillFormData(initialSplitFormData);
  };

  const billPayingPersons = useMemo(
    () => [
      { label: "You", value: "you" },
      {
        label: friendWithWhomToSplit.friendName,
        value: friendWithWhomToSplit.friendName,
      },
    ],
    [friendWithWhomToSplit.friendName]
  );

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {friendWithWhomToSplit.friendName}</h2>

      <label htmlFor="add-bill-value">💰Bill value</label>
      <input
        id="add-bill-value"
        type="number"
        value={splitBillFormData.billValue.toString()}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(evt, "billValue", "number")
        }
      />

      <label htmlFor="add-your-expense">🕴️Your expense</label>
      <input
        id="add-your-expense"
        type="number"
        value={splitBillFormData.myExpense.toString()}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(evt, "myExpense", "number")
        }
      />

      <label htmlFor={`add-${friendWithWhomToSplit.friendName}-expense`}>
        👯{friendWithWhomToSplit.friendName}'s expense
      </label>
      <input
        id={`add-${friendWithWhomToSplit.friendName}-expense`}
        type="number"
        value={splitBillFormData.friendExpense.toString()}
        disabled
      />

      <label htmlFor="add-bill-paying-person">🤑Who is paying the bill?</label>
      <select
        id="add-bill-paying-person"
        value={splitBillFormData.payingPerson}
        onChange={(evt: React.ChangeEvent<HTMLSelectElement>) =>
          handleChange(evt, "payingPerson", "text")
        }
      >
        {billPayingPersons.map((person) => (
          <option key={person.value} value={person.value}>
            {person.label}
          </option>
        ))}
      </select>
      <Button type="submit">Split bill</Button>
    </form>
  );
};

export default SplitBillForm;
