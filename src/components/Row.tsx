import React from 'react';
import Note from '../types/Note';
import { useAppDispatch } from '../hooks/hook';
import {
  activateNote,
  archiveNote,
  deleteNote,
  changeEditNoteId,
  toogleForm,
  isUpdating,
} from '../redux/slices/notesSlice';

type props = {
  item: Note;
};

const Row: React.FC<props> = ({ item }) => {
  const dispatch = useAppDispatch();

  const toggleActive = (id: number) => {
    !item.active ? dispatch(archiveNote(id)) : dispatch(activateNote(id));
  };

  const update = (id: number) => {
    dispatch(changeEditNoteId(id));
    dispatch(toogleForm(true));
    dispatch(isUpdating(true));
  };

  return (
    <tr>
      <td className="tr-content">{item.name}</td>
      <td>{item.creationDate}</td>
      <td>{item.category}</td>
      <td className="tr-content">{item.content}</td>
      <td>{item.dates}</td>
      <td>
        <div className="actions-container">
          <button
            onClick={() => update(item.id)}
            className="btn-action"
            type="button"
          >
            Edit
          </button>
          <button
            onClick={() => dispatch(deleteNote(item.id))}
            className="btn-action"
            type="button"
          >
            Delete
          </button>
          <button
            onClick={() => toggleActive(item.id)}
            className="btn-action"
            type="button"
          >
            {item.active ? 'Archive' : 'Activate'}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Row;
