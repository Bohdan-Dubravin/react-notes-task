import React from "react";
import Note from "../types/Note";
import { useAppDispatch } from "../hooks/hook";
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
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-1 px-6 text-left ">{item.name}</td>
      <td className="py-1 px-6 text-left ">{item.creationDate}</td>
      <td className="py-1 px-6 text-left ">{item.category}</td>
      <td className="py-1 px-6 text-left ">{item.content}</td>
      <td className="py-1 px-6 text-left ">{item.dates}</td>
      <td className="flex justify-center py-3 px-6 text-left ">
        <div className="flex">
          <button
            onClick={() => update(item.id)}
            className="mr-2 border px-1 border-transparent rounded-md  bg-green-lig text-white hover:text-green-lig hover:border-green-lig hover:bg-white"
            type="button"
          >
            Edit
          </button>
          <button
            onClick={() => dispatch(deleteNote(item.id))}
            className="mr-2 border px-1 border-transparent rounded-md  bg-green-lig text-white hover:text-green-lig hover:border-green-lig hover:bg-white"
            type="button"
          >
            Delete
          </button>
          <button
            onClick={() => toggleActive(item.id)}
            className=" border px-1 border-transparent rounded-md bg-green-lig text-white hover:text-green-lig hover:border-green-lig hover:bg-white"
            type="button"
          >
            {item.active ? "Archive" : "Activate"}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Row;
