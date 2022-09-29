import { useState } from "react";
import NoteForm from "../components/NoteForm";
import Table from "../components/Table";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import {
  changeEditNoteId,
  isUpdating,
  toogleForm,
} from "../redux/slices/notesSlice";
import { getSummaryes } from "../utils/utils";

const listHead = ["NAME", "CREATED", "CATEGORY", "CONTENT", "DATES", "ACTIONS"];
const summaryHead = ["CATEGORY", "ACTIVE", "ARCHIVED"];

const Notes = () => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const { notesList, showForm } = useAppSelector((state) => state.notes);
  const activeNotes = notesList.filter((note) => note.active);
  const archivedNotes = notesList.filter((note) => !note.active);
  const summary = getSummaryes(notesList);

  const toggleArchive = () => {
    setShow(!show);
  };

  const openForm = () => {
    dispatch(changeEditNoteId(0));
    dispatch(toogleForm(true));
    dispatch(isUpdating(false));
  };

  return (
    <div className="w-screen bg-gray-100  font-sans ">
      <div className="bg-white my-6 mx-3 flex-column justify-center items-center">
        <Table headContent={listHead} list={activeNotes} />
        <button
          className="flex mb-5 items-center justify-center font-bold ml-auto mr-5 border p-2 border-transparent rounded-md  bg-green-lig text-white hover:text-green-lig hover:border-green-lig hover:bg-white"
          onClick={openForm}
        >
          Create Note
        </button>
        <button
          className="flex mb-5 items-center justify-center font-bold ml-auto mr-5 border p-2 border-transparent rounded-md  bg-green-lig text-white hover:text-green-lig hover:border-green-lig hover:bg-white"
          onClick={toggleArchive}
        >
          Show archive notes
        </button>
        {show && <Table headContent={listHead} list={archivedNotes} />}
        {showForm && <NoteForm />}
        <Table headContent={summaryHead} list={notesList} summary={summary} />
      </div>
    </div>
  );
};

export default Notes;
