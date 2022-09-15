import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { data } from '../../data/data';
import Note from '../../types/Note';
import { findDates, getFullDate } from '../../utils/utils';

type NotesState = {
  notesList: Note[];
  showForm: boolean;
  isUpdated: boolean;
};

const initialState: NotesState = {
  notesList: data,
  showForm: false,
  isUpdated: false,
};

const notesListSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNewNote: (state, action: PayloadAction<Note>) => {
      const id = +new Date();
      const creationDate = getFullDate();
      const dates = findDates(action.payload.content) || '';
      const newNote = { ...action.payload, creationDate, dates, id };
      state.notesList.push(newNote);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const { name, id, content, category } = action.payload;
      const dates = findDates(content);

      state.notesList = state.notesList.map((note) => {
        if (note.id === id) {
          return { ...action.payload, name, content, category, dates };
        } else {
          return note;
        }
      });
    },
    archiveNote: (state, action: PayloadAction<number>) => {
      state.notesList = state.notesList.map((note) => {
        if (note.id === action.payload) {
          return { ...note, active: true };
        } else {
          return note;
        }
      });
    },
    activateNote: (state, action: PayloadAction<number>) => {
      state.notesList = state.notesList.map((note) => {
        if (note.id === action.payload) {
          return { ...note, active: false };
        } else {
          return note;
        }
      });
    },

    deleteNote: (state, action: PayloadAction<number>) => {
      state.notesList = state.notesList.filter(
        (note) => note.id !== +action.payload
      );
    },
    toogleForm: (state, action: PayloadAction<boolean>) => {
      state.showForm = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateNote,
  createNewNote,
  deleteNote,
  archiveNote,
  activateNote,
  toogleForm,
} = notesListSlice.actions;

export default notesListSlice.reducer;
