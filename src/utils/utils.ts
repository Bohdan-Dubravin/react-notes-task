import Note from '../types/Note';

export const getFullDate = () => {
  const today = new Date();
  const month = today.toLocaleString('default', { month: 'long' }),
    day = today.getDate(),
    year = today.getFullYear();

  return `${month} ${day}, ${year}`;
};

export const findDates = (str: string) => {
  const dates =
    str.match(/(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)\d{2}/g) || '';
  return dates.toString() || '';
};

export const getSummaryes = (arr: Note[]) => {
  const categories = [
    {
      category: 'Task',
      activeCount: 0,
      archiveCount: 0,
    },
    {
      category: 'Idea',
      activeCount: 0,
      archiveCount: 0,
    },
    {
      category: 'Random Thought',
      activeCount: 0,
      archiveCount: 0,
    },
  ];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].category === 'Task') {
      arr[i].active
        ? (categories[0].activeCount += 1)
        : (categories[0].archiveCount += 1);
    } else if (arr[i].category === 'Idea') {
      arr[i].active
        ? (categories[1].activeCount += 1)
        : (categories[1].archiveCount += 1);
    } else if (arr[i].category === 'Random Thought') {
      arr[i].active
        ? (categories[2].activeCount += 1)
        : (categories[2].archiveCount += 1);
    }
  }

  return categories;
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
