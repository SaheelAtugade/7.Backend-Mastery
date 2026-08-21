import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/notes");
      setNotes(res.data.notes);
    } catch (err) {
      if (err.response) {
        console.log("server error",err.response.status);
      }else if(err.request){
        console.log("Network error");
      }else{
        console.log("Somthing went wrong");
      }
    } finally {
      setIsloading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.patch("http://localhost:3000/api/notes/" + editingId, {
        title: title,
        desc: desc,
      });
      setEditingId(null);
    } else {
      const res = await axios.post("http://localhost:3000/api/notes", {
        title: title,
        desc: desc,
      });
      console.log(res.data);
    }

    fetchNotes();
    setTitle("");
    setDesc("");
  };

  const deleteNoteHandler = async (noteId) => {
    await axios.delete("http://localhost:3000/api/notes/" + noteId);
    fetchNotes();
  };

  const updateNoteHandler = async (note) => {
    setEditingId(note._id);
    setTitle(note.title);
    setDesc(note.desc);
  };

  useEffect(() => {
    
    fetchNotes();
  }, []);

  return (
    <main>
      <form className="note-create-form" onSubmit={handleSubmit}>
        <div className="input-field">
          <label>title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div className="input-field">
          <label>description:</label>
          <textarea
            name="desc"
            id="desc"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          ></textarea>
        </div>

        <button type="submit">
          {editingId === null ? "Create note" : "Update note"}
        </button>
      </form>

      <div className="notes">
        {isloading
          ? "Loading notes..."
          : notes.map((note) => {
              return (
                <div key={note._id} className="note">
                  <h2>{note.title}</h2>
                  <p>{note.desc}</p>
                  <div className="btns">
                    <button
                      onClick={() => {
                        updateNoteHandler(note);
                      }}
                    >
                      edit
                    </button>
                    <button
                      onClick={() => {
                        deleteNoteHandler(note._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
    </main>
  );
}

export default App;
