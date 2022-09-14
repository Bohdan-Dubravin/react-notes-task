interface Note {
  id: number;
  name: string;
  creationDate: string;
  content: string;
  dates: string | null;
  category: string;
  active: boolean;
}

export default Note;
