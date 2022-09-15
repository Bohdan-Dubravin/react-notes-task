import React, { useState } from 'react';
import '../styles/NoteForm.css';
import { useAppDispatch, useAppSelector } from '../hooks/hook';
import {
  toogleForm,
  updateNote,
  createNewNote,
} from '../redux/slices/notesSlice';
import Note from '../types/Note';

const NoteForm = () => {
  const dispatch = useAppDispatch();
  const { isUpdated } = useAppSelector((state) => state.notes);
  const form = {
    name: '',
    content: '',
    category: '',
    creationDate: '',
    active: true,
    id: 0,
    dates: '',
  };
  const [note, setNote] = useState(form);
  const [showOptions, setShowOptions] = useState(false);

  console.log(note);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNote((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleOption = (value: string) => {
    setNote((prev) => {
      return {
        ...prev,
        category: value,
      };
    });
    setShowOptions(false);
  };

  const createNote = (note: Note) => {
    const { name, content, category } = note;

    if (name && content && category) {
      isUpdated ? dispatch(updateNote(note)) : dispatch(createNewNote(note));
      dispatch(toogleForm(false));
    }
  };

  return (
    <div className="add-note-container">
      <div className="form-container">
        <div onClick={() => dispatch(toogleForm(false))} className="close-btn">
          X
        </div>
        <label className="input-label" htmlFor="name">
          Note name
        </label>
        <input
          className="input-name"
          value={note.name}
          onChange={(e) => handleChange(e)}
          type="text"
          name="name"
          id="name"
        />
        <label className="input-label" htmlFor="content">
          Note content
        </label>
        <textarea
          className="input-content"
          value={note.content}
          onChange={(e) => handleChange(e)}
          name="content"
          id="content"
          cols={40}
          rows={10}
        ></textarea>
        <div
          className="options-container"
          onClick={() => setShowOptions(!showOptions)}
        >
          {note.category || 'Select Category'}
          {showOptions && (
            <ul className="input-options">
              <li className="options-item" onClick={() => handleOption('Idea')}>
                Idea
              </li>
              <li className="options-item" onClick={() => handleOption('Task')}>
                Task
              </li>
              <li
                className="options-item"
                onClick={() => handleOption('Random Thoughts')}
              >
                Random Thoughts
              </li>
            </ul>
          )}
        </div>
        <button
          onClick={() => createNote(note)}
          className="create-button"
          type="button"
        >
          ADD NOTE
        </button>
      </div>
    </div>
  );
};

export default NoteForm;
