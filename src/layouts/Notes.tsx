import { useEffect, useState } from 'react';
import '../styles/Notes.css';
import NoteForm from '../components/NoteForm';
import Table from '../components/Table';
import { useAppDispatch, useAppSelector } from '../hooks/hook';
import {
  changeEditNoteId,
  isUpdating,
  toogleForm,
} from '../redux/slices/notesSlice';
import Note from '../types/Note';
import { getSummaryes } from '../utils/utils';

const listHead = ['NAME', 'CREATED', 'CATEGORY', 'CONTENT', 'DATES', 'ACTIONS'];
const summaryHead = ['CATEGORY', 'ACTIVE', 'ARCHIVED'];

type summary = { category: string; count: number };

const Notes = () => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const { notesList, showForm } = useAppSelector((state) => state.notes);
  const activeNotes = notesList.filter((note) => note.active);
  const archivedNotes = notesList.filter((note) => !note.active);

  useEffect(() => {}, [notesList]);

  const toggleArchive = () => {
    setShow(!show);
  };

  const openForm = () => {
    dispatch(changeEditNoteId(0));
    dispatch(toogleForm(true));
    dispatch(isUpdating(false));
  };

  let summary = getSummaryes(notesList);

  useEffect(() => {
    // summary = getSummary(notesList);
    console.log(summary);
  }, [notesList]);

  return (
    <div className="container">
      <Table headContent={listHead} list={activeNotes} />
      <button onClick={openForm}>Create Note</button>
      <button onClick={toggleArchive}>Show archive notes</button>
      {show && <Table headContent={listHead} list={archivedNotes} />}
      {showForm && <NoteForm />}
      <Table headContent={summaryHead} list={notesList} summary={summary} showSummary={true} />
    </div>
  );
};

export default Notes;
