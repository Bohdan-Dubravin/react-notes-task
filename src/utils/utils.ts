import Note from "../types/Note";

export const getFullDate = () => {
  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" }),
    day = today.getDate(),
    year = today.getFullYear();

  return `${month} ${day}, ${year}`;
};

export const findDates = (str: string) => {
  const dates =
    str.match(/(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)\d{2}/g) || "";
  return dates.toString() || "";
};

// export const summary = (arr: Note[]) => {
//   return arr.reduce((acc, note) => {
//     if (!acc[note.category]) {
//       return {
//         ...acc,
//         [note.category]: {
//           archived: note.active ? 1 : 0,
//           active: !note.active ? 1 : 0,
//         },
//       };
//     } else {
//       const isActive = note.active ? "archived" : "active";
//       return {
//         ...acc,
//         [note.category]: {
//           ...acc[note.category],
//           [isActive]: acc[note.category][isActive] + 1,
//         },
//       };
//     }
//   }, {});
// };
