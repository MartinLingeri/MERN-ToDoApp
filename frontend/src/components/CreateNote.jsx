import React, { useState, useEffect } from "react";
import axios from "axios";
import { useMatch } from "react-router-dom";

import "./CreateNote.css";
import miscInfo from "../misc.json";

const NUMBER_PORT = parseInt(miscInfo.PORT);

const CreateNote = () => {
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: new Date(),
    editing: false,
    _id: "",
  });

  let matchEdit = useMatch("/edit/:id");

  useEffect(() => {
    async function editingNote() {
      if (matchEdit.params.id) {
        console.log(matchEdit.params.id);
        const res = await axios.get(
          `http://localhost:${NUMBER_PORT}/api/notes/` + matchEdit.params.id
        );
        console.log(res.data);
        setNote({
          title: res.data.title,
          content: res.data.content,
          date: new Date(res.data.date),
          _id: res.data._id,
          editing: true,
        });
      }
    }
    editingNote();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(note);
    if (note.editing) {
      const updatedNote = {
        title: note.title,
        content: note.content,
        date: note.date,
      };
      await axios.put(
        `http://localhost:${NUMBER_PORT}/api/notes/` + note._id,
        updatedNote
      );
    } else {
      const newNote = {
        title: note.title,
        content: note.content,
        date: note.date,
      };
      axios.post(`http://localhost:${NUMBER_PORT}/api/notes`, newNote);
    }
    window.location.href = "/";
  };

  return (
    <div className="box-container">
      <div className="create-note-container">
        <div className="content-container">
          <h4>Create a Note</h4>
          <form className="form" onSubmit={(e) => handleSubmit(e)}>
            {/* Note Title */}
            <div>
              <input
                className="inputs title input-border-radius"
                type="text"
                placeholder="Title"
                onChange={(e) => handleChange(e)}
                name="title"
                value={note.title}
                autoCapitalize="sentences"
                required
              />
            </div>
            {/* Note Content */}
            <div>
              <textarea
                className="inputs content input-border-radius"
                type="text"
                placeholder="Content"
                name="content"
                onChange={(e) => handleChange(e)}
                value={note.content}
                autoCapitalize="sentences"
                required
              ></textarea>
            </div>
            {/* Note Date */}
            <div>
              <input
                className="inputs date input-border-radius"
                name="date"
                type="date"
                selected={note.date}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <button type="submit" className="btn-create">
              Save Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
