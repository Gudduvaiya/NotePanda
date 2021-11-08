import React from "react";
import noteContext from "../Context/notes/NoteContext";
import { useContext } from "react";

function Noteitems(props) {
  const context=useContext(noteContext)
  const {state, setstate, deletenote} = context
  const { note,updatenote } = props;
  return (
    <div className="col-md-3">
      <div class="card my-3" >
        <div class="card-body">
          <h5 class="card-title">{note.title}</h5>
          <p class="card-text">
            {note.description}
          </p>
          <h6 class="card-title">{note.tag}</h6>
            <i class="fas fa-marker " style={{cursor: "pointer"}} onClick={()=>{updatenote(note)
            }}></i>
            <i class="fas fa-calendar-times mx-3" style={{cursor: "pointer"}} onClick={()=>{deletenote(note._id);props.showAlert("Deleted Successfully","success");}}></i>
        </div>
      </div>
    </div>
  );
}

export default Noteitems;
