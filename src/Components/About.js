import React,{ useContext } from "react";
import notecontext from '../Context/notes/NoteContext';

function About() {
    const a=useContext(notecontext)

    return (
        <div>
              <h1> This is About </h1>
        </div>
    )
}

export default About
