import React from 'react';
import Note from '../types/Note';
import { useAppDispatch, useAppSelector } from '../hooks/hook';
import {
  activateNote,
  archiveNote,
  deleteNote,
  editNote,
} from '../redux/slices/notesSlice';

type props = {
  item: Note;
};

const Row: React.FC<props> = ({ item }) => {
  const dispatch = useAppDispatch();

  const toggleActive = (id: number) => {
    !item.active ? dispatch(archiveNote(id)) : dispatch(activateNote(id));
  };

  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.creationDate}</td>
      <td>{item.category}</td>
      <td>{item.content}</td>
      <td>{item.dates}</td>
      <td>
        <div>
          <button
            onClick={() => dispatch(editNote(item))}
            className="btn"
            type="button"
          >
            Edit
          </button>
          <button
            onClick={() => dispatch(deleteNote(item.id))}
            className="btn"
            type="button"
          >
            Delete
          </button>
          <button
            onClick={() => toggleActive(item.id)}
            className="btn"
            type="button"
          >
            Archive
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Row;
