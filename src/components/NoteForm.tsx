import React, { useState } from "react";

const NoteForm = () => {
  const form = { name: "", content: "", category: "" };
  const [note, setNote] = useState(form)

  const handleChange = (e) => {

  }


  return (
    <div className="form">
      <input value={note.name} type="text" name="name" />
      <textarea value={note.content} name="content" id="" cols={30} rows={10}></textarea>
      <div>
        <ul>
          <li onClick={(e) =>}>Idea</li>
          <li onClick={(e) =>}>Task</li>
          <li onClick={(e) =>}>Random Thoughts</li>
        </ul>
      </div>
    </div>
  );
};

export default NoteForm;
