import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navigation from "./components/Navigation";
import NotesList from "./components/NotesList";
import CreateNote from "./components/CreateNote";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" exact element={<NotesList />} />
        <Route path="/edit/:id" element={<CreateNote />} />
        <Route path="/createNote" element={<CreateNote />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
