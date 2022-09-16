import React from "react";
import Note from "../types/Note";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import {
  activateNote,
  archiveNote,
  deleteNote,
  changeEditNoteId,
  toogleForm,
  isUpdating,
} from "../redux/slices/notesSlice";

type props = {
  item: Note;
  showSummary?: boolean;
};

const Row: React.FC<props> = ({ item, showSummary = false }) => {
  const dispatch = useAppDispatch();

  const toggleActive = (id: number) => {
    !item.active ? dispatch(archiveNote(id)) : dispatch(activateNote(id));
  };

  const update = (id: number) => {
    dispatch(changeEditNoteId(id));
    dispatch(toogleForm(true));
    dispatch(isUpdating(true));
  };

  if (showSummary) {
    return <div>Its summary</div>;
  }

  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.creationDate}</td>
      <td>{item.category}</td>
      <td>{item.content}</td>
      <td>{item.dates}</td>
      <td>
        <div>
          <button onClick={() => update(item.id)} className="btn" type="button">
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
