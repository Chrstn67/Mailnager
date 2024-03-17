import React, { useState, useEffect, useRef } from "react";
import DOMPurify from "dompurify";
import "./NotesList.scss";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editingNote, setEditingNote] = useState("");
  const [editingNoteIndex, setEditingNoteIndex] = useState(-1);
  const editingNoteRef = useRef(null);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  useEffect(() => {
    window.onbeforeunload = () => {
      localStorage.setItem("notes", JSON.stringify(notes));
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, [notes]);

  const addNote = () => {
    if (newNote.trim() !== "") {
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      setNewNote("");
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const editNote = (index) => {
    setEditingNote(notes[index]);
    setEditingNoteIndex(index);
  };

  const saveEditedNote = () => {
    if (editingNote.trim() !== "") {
      const updatedNotes = [...notes];
      updatedNotes[editingNoteIndex] = editingNote;
      setNotes(updatedNotes);
      setEditingNote("");
      setEditingNoteIndex(-1);
    }
  };

  const handleChange = (event) => {
    if (event.target.value.length <= 100) {
      setNewNote(event.target.value);
    }
  };

  const handleEditChange = (event) => {
    if (event.target.value.length <= 100) {
      setEditingNote(event.target.value);
    }
  };

  const handleEditBlur = () => {
    if (editingNoteRef.current) {
      const updatedNote = editingNoteRef.current.textContent;
      setEditingNote(updatedNote);
    }
  };

  const sanitizeHTML = (html) => {
    const sanitizedHTML = DOMPurify.sanitize(html);
    return { __html: sanitizedHTML };
  };

  return (
    <div className="notes-container">
      <h2>Notes</h2>
      <section className="script-note">
        <input
          type="text"
          value={newNote}
          onChange={handleChange}
          placeholder="Ecrivez votre note (100 caractères max)"
          maxLength={100}
          className="note-input"
        />
        <button onClick={addNote} className="add-button">
          Enregistrer
        </button>
      </section>
      <section className="notes-list">
        <ul>
          {notes.map((note, index) => (
            <li key={index}>
              {editingNoteIndex === index ? (
                <>
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    maxLength={100}
                    onInput={handleEditChange}
                    onBlur={handleEditBlur}
                    ref={editingNoteRef}
                    dangerouslySetInnerHTML={sanitizeHTML(editingNote)}
                    className="note-input"
                  />
                  <div className="commandes">
                    <button onClick={saveEditedNote}>Enregistrer</button>
                    <button onClick={() => setEditingNoteIndex(-1)}>
                      Annuler
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span dangerouslySetInnerHTML={sanitizeHTML(note)} />
                  <div className="commandes">
                    <button onClick={() => editNote(index)}>Modifier</button>
                    <button onClick={() => deleteNote(index)}>Supprimer</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default NotesList;
