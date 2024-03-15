import React, { useState, useEffect, useRef } from "react";
import DOMPurify from "dompurify";
import "./NotesList.scss";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [editingNoteIndex, setEditingNoteIndex] = useState(-1);
  const [editingNote, setEditingNote] = useState("");
  const modalRef = useRef();

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingNoteIndex(-1);
    setEditingNote("");
  };

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
    setEditingNoteIndex(index);
    setEditingNote(notes[index]);
  };

  const updateNote = () => {
    if (editingNote.trim() !== "") {
      const updatedNotes = [...notes];
      updatedNotes[editingNoteIndex] = editingNote;
      setNotes(updatedNotes);
      setEditingNoteIndex(-1);
      setEditingNote("");
    }
  };

  const cancelEdit = () => {
    setEditingNoteIndex(-1);
    setEditingNote("");
  };

  const handleChange = (event) => {
    if (event.target.value.length <= 100) {
      setNewNote(event.target.value);
    }
  };

  const handleEditingNoteChange = (event) => {
    if (event.target.value.length <= 100) {
      setEditingNote(event.target.value);
    }
  };

  const sanitizeHTML = (html) => {
    const sanitizedHTML = DOMPurify.sanitize(html);
    return { __html: sanitizedHTML };
  };

  return (
    <div>
      <button onClick={openModal} className="modal-btn">
        Notes
      </button>
      {modalOpen && (
        <div className="modal">
          <div ref={modalRef} className="modal-content">
            <h2>Notes</h2>
            <section className="script-note">
              <textarea
                value={newNote}
                onChange={handleChange}
                placeholder="Ecrit ta note (100 caractères max)"
                maxLength={100}
              />
              <button onClick={addNote} className="add-button">
                Enregistrer
              </button>
              <button onClick={closeModal} className="close-button">
                Fermer
              </button>
            </section>
            <section className="notes-list">
              <ul>
                {notes.map((note, index) => (
                  <li key={index}>
                    {editingNoteIndex === index ? (
                      <>
                        <div>
                          <textarea
                            value={editingNote}
                            onChange={handleEditingNoteChange}
                            className="saved-note"
                            maxLength={100}
                          />

                          <button onClick={updateNote}>Sauvegarder</button>
                          <button onClick={cancelEdit}>Annuler</button>
                        </div>
                      </>
                    ) : (
                      <>
                        <span dangerouslySetInnerHTML={sanitizeHTML(note)} />
                        <button onClick={() => editNote(index)}>
                          Modifier
                        </button>
                        <button onClick={() => deleteNote(index)}>
                          Supprimer
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesList;
