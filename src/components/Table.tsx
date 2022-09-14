import React from "react";
import "../styles/table.css";
import Note from "../types/Note";
import Row from "./Row";

type props = {
  headContent: string[];
  list: Note[];
};

const Table: React.FC<props> = ({ headContent, list }) => {
  return (
    <table className="styled-table">
      <thead>
        <tr>
          {headContent.map((title) => (
            <th key={title}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <Row key={item.id} item={item} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
