import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Context/notes/NoteContext";
import Addnote from "./Addnote";
import Noteitems from "./Noteitems";

function Notes(props) {
  const context = useContext(noteContext);
  const { state, getnote,editnote } = context;
  useEffect(() => {
    getnote();
  }, []);
  const ref = useRef(null);
  const refclose = useRef(null);
  const [notes, setnotes] = useState({id:"",etitle: "",edescription:"",etag:""})
  const updatenote = (cnote) => {
    ref.current.click();
    setnotes({id: cnote._id, etitle: cnote.title, edescription: cnote.description, etag: cnote.tag})
  };

  //Define clickupdate
  const clickupdate=(event)=>{
    console.log("updatting note",notes)
    refclose.current.click();
    editnote(notes.id,notes.etitle,notes.edescription,notes.etag)
    event.preventDefault();
    props.showAlert("Updated Successfully","success");
}

//Define liveconsole
const liveconsole=(event)=>{
setnotes({...notes, [event.target.name]: event.target.value})
}

  return (
    <>
      <Addnote showAlert={props.showAlert} />

      <button
        ref={ref}
        type="button"
        class="btn btn-primary d-none"      //D-none for set display to none
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Update Your Note
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form className="my-3">
                <div class="form-group" className="my-3">
                  <label htmlfor="title">Title</label>
                  <input
                    type="text"
                    class="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    placeholder="Enter Note Title"
                    value={notes.etitle}
                    minLength={5}
                    required
                    onChange={liveconsole}
                  />
                </div>
                <div class="form-group" className="my-3">
                  <label htmlfor="description">Description</label>
                  <input
                    type="text"
                    class="form-control"
                    id="edescription"
                    name="edescription"
                    placeholder="Note description"
                    value={notes.edescription}
                    minLength={5}
                    required
                    onChange={liveconsole}
                  />
                </div>
                <div class="form-group" className="my-3">
                  <label htmlfor="tag">Tag</label>
                  <input
                    type="text"
                    class="form-control"
                    id="etag"
                    name="etag"
                    placeholder="Note Tag"
                    value={notes.etag}
                    minLength={2}
                    required
                    onChange={liveconsole}
                  />
                </div>
              </form>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refclose}
              >
                Discard
              </button>
              <button disabled={notes.etitle.length<5 || notes.edescription.length<5 || notes.etag.length<2} type="button" class="btn btn-primary" onClick={clickupdate}> 
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <h1>Preview your Note</h1>
        <div className="container mx-2">
          {state.length===0 && "No Notes to Display. Please Add some"}
        </div>
        {state.map((note) => {
          return (
            <Noteitems key={note._id} updatenote={updatenote} showAlert={props.showAlert} note={note} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
