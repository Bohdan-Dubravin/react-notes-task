import { useState } from "react";
import Table from "../components/Table";
import { useAppSelector } from "../hooks/hook";

const listHead = ["NAME", "CREATED", "CATEGORY", "CONTENT", "DATES", "ACTIONS"];
const summaryHead = ["CATEGORY", "ACTIVE", "ARCHIVED"];

const Notes = () => {
  const [show, setShow] = useState(false);
  const notesList = useAppSelector((state) => state.notes.notesList);
  const activeNotes = notesList.filter((note) => !note.active);
  const archivedNotes = notesList.filter((note) => note.active);

  const toggleArchive = () => {
    setShow(!show);
  };

  return (
    <div>
      <Table headContent={listHead} list={activeNotes} />
      <button>Create Note</button>
      <button onClick={toggleArchive}>Show archive notes</button>
      {show && <Table headContent={listHead} list={archivedNotes} />}
      {/* <Table headContent={summaryHead} list={notesList} /> */}
    </div>
  );
};

export default Notes;
