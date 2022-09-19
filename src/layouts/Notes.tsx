import { useState } from 'react';
import '../styles/Notes.css';
import NoteForm from '../components/NoteForm';
import Table from '../components/Table';
import { useAppDispatch, useAppSelector } from '../hooks/hook';
import {
  changeEditNoteId,
  isUpdating,
  toogleForm,
} from '../redux/slices/notesSlice';
import { getSummaryes } from '../utils/utils';

const listHead = ['NAME', 'CREATED', 'CATEGORY', 'CONTENT', 'DATES', 'ACTIONS'];
const summaryHead = ['CATEGORY', 'ACTIVE', 'ARCHIVED'];

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
    <div className="container">
      <Table headContent={listHead} list={activeNotes} />
      <button className="btn" onClick={openForm}>
        Create Note
      </button>
      <button className="btn" onClick={toggleArchive}>
        Show archive notes
      </button>
      {show && <Table headContent={listHead} list={archivedNotes} />}
      {showForm && <NoteForm />}
      <Table headContent={summaryHead} list={notesList} summary={summary} />
    </div>
  );
};

export default Notes;
