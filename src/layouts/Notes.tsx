import { useState } from 'react';
import '../styles/Notes.css';
import NoteForm from '../components/NoteForm';
import Table from '../components/Table';
import { useAppDispatch, useAppSelector } from '../hooks/hook';
import { toogleForm } from '../redux/slices/notesSlice';

const listHead = ['NAME', 'CREATED', 'CATEGORY', 'CONTENT', 'DATES', 'ACTIONS'];
const summaryHead = ['CATEGORY', 'ACTIVE', 'ARCHIVED'];

const Notes = () => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const { notesList, showForm } = useAppSelector((state) => state.notes);
  const activeNotes = notesList.filter((note) => note.active);
  const archivedNotes = notesList.filter((note) => !note.active);

  const toggleArchive = () => {
    setShow(!show);
  };

  return (
    <div className="container">
      <Table headContent={listHead} list={activeNotes} />
      <button onClick={() => dispatch(toogleForm(true))}>Create Note</button>
      <button onClick={toggleArchive}>Show archive notes</button>
      {show && <Table headContent={listHead} list={archivedNotes} />}
      {showForm && <NoteForm />}
      {/* <Table headContent={summaryHead} list={notesList} /> */}
    </div>
  );
};

export default Notes;
