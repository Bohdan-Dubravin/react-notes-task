import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import {
  toogleForm,
  updateNote,
  createNewNote,
} from "../redux/slices/notesSlice";
import Note from "../types/Note";

const form = {
  name: "",
  content: "",
  category: "",
  creationDate: "",
  active: true,
  id: 0,
  dates: "",
};

const NoteForm = () => {
  const dispatch = useAppDispatch();
  const { isUpdated, notesList, updateNoteId } = useAppSelector(
    (state) => state.notes
  );

  const [note, setNote] = useState<Note>(form);
  const [showOptions, setShowOptions] = useState(false);
  const [errorText, setErrorText] = useState("");

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
        throw Error("Fill in all the fields");
      }

      isUpdated ? dispatch(updateNote(note)) : dispatch(createNewNote(note));
      dispatch(toogleForm(false));
      setErrorText("");
    } catch (error) {
      setErrorText((error as Error).message);
    }
  };

  return (
    <div className="fixed flex bg-slate-500 bg-opacity-50 justify-center items-center w-full h-full inset-0 z-50 outline-none focus:outline-none ">
      <div className="relative p-5 bg-white flex-col rounded-xl">
        <h3 className="font-bold text-red-600">{errorText}</h3>
        <div
          onClick={() => dispatch(toogleForm(false))}
          style={{ height: "30px", width: "30px" }}
          className="absolute cursor-pointer font-bold -top-1 w-15 h-15 -right-1 p-2 rounded-full bg-green-lig text-white flex items-center justify-center"
        >
          X
        </div>
        <label className="font-semibold" htmlFor="name">
          Note name
        </label>
        <input
          className="block focus:outline-none border-b-2 p border-transparent bg-gray-100 focus:border-b-2 focus:border-green-lig w-full px-3 py-1"
          value={note.name}
          onChange={(e) => handleChange(e)}
          type="text"
          name="name"
          id="name"
        />
        <label className="font-semibold" htmlFor="content outline-none">
          Note content
        </label>
        <textarea
          className="block resize-none focus:outline-none border-b-2 border-transparent bg-gray-100 focus:border-b-2 focus:border-green-lig px-3 py-1"
          value={note.content}
          onChange={(e) => handleChange(e)}
          name="content"
          id="content"
          cols={40}
          rows={10}
        ></textarea>
        <label className="font-semibold mb-3" htmlFor="content">
          Category
        </label>
        <div
          className="bg-green-lig text-white w-1/2 text-center rounded-xl pt-1 pb-1 relative cursor-pointer"
          onClick={() => setShowOptions(!showOptions)}
        >
          {note.category || "Select Category"}
          {showOptions && (
            <ul className="absolute bg-white pl-4 pr-4 text-black text-left top-10 rounded-xl border-solid border-2 border-light-blue-500">
              <li
                className="hover:text-white hover:bg-green-lig"
                onClick={() => handleOption("Idea")}
              >
                Idea
              </li>
              <li
                className="hover:text-white hover:bg-green-lig"
                onClick={() => handleOption("Task")}
              >
                Task
              </li>
              <li
                className="hover:text-white hover:bg-green-lig"
                onClick={() => handleOption("Random Thought")}
              >
                Random Thought
              </li>
            </ul>
          )}
        </div>
        <button
          onClick={() => createNote(note)}
          className="block bg-green-lig text-white ml-auto p-2 rounded-xl"
          type="button"
        >
          {!isUpdated ? "ADD NOTE" : "UPDATE NOTE"}
        </button>
      </div>
    </div>
  );
};

export default NoteForm;
