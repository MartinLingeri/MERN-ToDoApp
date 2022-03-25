import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import miscInfo from "../misc.json";
import { format } from 'date-fns'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import "./NotesList.css";

const NUMBER_PORT = parseInt(miscInfo.PORT);

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const res = await axios.get(`http://localhost:${NUMBER_PORT}/api/notes`);
    setNotes(res.data);
  };

  const deleteNote = async (noteId) => {
    await axios.delete(`http://localhost:${NUMBER_PORT}/api/notes/` + noteId);
    getNotes();
  };

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <div className="card" key={note._id}>
          <div className="card-header">
            <h5>{note.title}</h5>
            <Link to={"/edit/" + note._id} className="btn btn-edit">
              <FontAwesomeIcon className="edit-icon" icon={faPencil} />
            </Link>
          </div>
          <div className="card-body">
            <p>{note.content}</p>
          </div>
          <div className="card-footer">
            <div className="time">
              {format(new Date(note.date), 'yyyy-MM-dd')}
            </div>
            <button
              className="btn btn-delete"
              onClick={() => deleteNote(note._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
