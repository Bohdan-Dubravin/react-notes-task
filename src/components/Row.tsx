import React from "react";
import Note from "../types/Note";

type props = {
  item: Note;
};

const Row: React.FC<props> = ({ item }) => {
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.creationDate}</td>
      <td>{item.category}</td>
      <td>{item.content}</td>
      <td>{item.dates}</td>
      <td>
        <div>actions</div>
      </td>
    </tr>
  );
};

export default Row;
