import React, { useEffect, useState } from 'react';
import '../styles/NoteForm.css';
import { useAppDispatch, useAppSelector } from '../hooks/hook';
import {
  toogleForm,
  updateNote,
  createNewNote,
} from '../redux/slices/notesSlice';
import Note from '../types/Note';

const form = {
  name: '',
  content: '',
  category: '',
  creationDate: '',
  active: true,
  id: 0,
  dates: '',
};

const NoteForm = () => {
  const dispatch = useAppDispatch();
  const { isUpdated, notesList, updateNoteId } = useAppSelector(
    (state) => state.notes
  );

  const [note, setNote] = useState<Note>(form);
  const [showOptions, setShowOptions] = useState(false);
  const [errorText, setErrorText] = useState('');

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

  useEffect(() => {
    if (updateNoteId && isUpdated) {
      const oldNote = notesList.find((note) => note.id === updateNoteId);

      setNote(oldNote || form);
    }
  }, [updateNoteId]);

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

    try {
      if (!name || !content || !category) {
        throw Error('Fill in all the fields');
      }

      isUpdated ? dispatch(updateNote(note)) : dispatch(createNewNote(note));
      dispatch(toogleForm(false));
      setErrorText('');
    } catch (error) {
      setErrorText((error as Error).message);
    }
  };

  return (
    <div className="add-note-container">
      <div className="form-container">
        <h3 className="error-text">{errorText}</h3>
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
        <label className="input-label" htmlFor="content">
          Category
        </label>
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
                onClick={() => handleOption('Random Thought')}
              >
                Random Thought
              </li>
            </ul>
          )}
        </div>
        <button
          onClick={() => createNote(note)}
          className="create-button"
          type="button"
        >
          {!isUpdated ? 'ADD NOTE' : 'UPDATE NOTE'}
        </button>
      </div>
    </div>
  );
};

export default NoteForm;
