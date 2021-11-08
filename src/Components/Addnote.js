import React from "react";
import { useContext } from "react";
import { useState } from "react";
import noteContext from "../Context/notes/NoteContext";

function Addnote(props) {
  const context = useContext(noteContext);
  const { state, setstate, addnote } = context;
  const [notes, setnotes] = useState({ title: "", description: "", tag: "" });
  //Define clicksubmit
  const clicksubmit = (event) => {
    event.preventDefault();
    addnote(notes.title, notes.description, notes.tag);
    setnotes({ title: "", description: "", tag: "" });
    props.showAlert("Note Added Successfully","success")
  };

  //Define liveconsole
  const liveconsole = (event) => {
    setnotes({ ...notes, [event.target.name]: event.target.value });
  };
  return (
    <div className="container">
      <h1 className="my-1">Add a Note</h1>
      <form className="my-3">
        <div class="form-group" className="my-3">
          <label htmlfor="title">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            placeholder="Enter Note Title"
            minLength={5}
            required
            value={notes.title}
            onChange={liveconsole}
          />
        </div>
        <div class="form-group" className="my-3">
          <label htmlfor="description">Description</label>
          <input
            type="text"
            class="form-control"
            id="description"
            name="description"
            placeholder="Note description"
            minLength={5}
            required
            value={notes.description}
            onChange={liveconsole}
          />
        </div>
        <div class="form-group" className="my-3">
          <label htmlfor="tag">Tag</label>
          <input
            type="text"
            class="form-control"
            id="tag"
            name="tag"
            placeholder="Note Tag"
            minLength={2}
            required
            value={notes.tag}
            onChange={liveconsole}
          />
        </div>

        <button
          disabled={
            notes.title.length < 5 ||
            notes.description.length < 5 ||
            notes.tag.length < 2
          }
          type="submit"
          class="btn btn-primary my-2"
          onClick={clicksubmit}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}

export default Addnote;
