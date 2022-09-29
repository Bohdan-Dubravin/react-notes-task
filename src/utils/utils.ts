import Note from '../types/Note';
import Summary from '../types/Summary';

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
  const summary = arr.reduce<Summary[]>((acc, note) => {
    const category = acc.find((cat) => cat.categoryName === note.category);
    if (!category) {
      return [
        ...acc,
        {
          categoryName: note.category,
          active: note.active ? 1 : 0,
          archived: note.active ? 0 : 1,
        },
      ];
    }
    note.active ? category.active++ : category.archived++;
    return acc;
  }, []);

  return summary;
};
