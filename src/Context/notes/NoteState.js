import noteContext from './NoteContext'
import { useState } from 'react'

const NoteState=(props)=>{
    const host="http://localhost:4000"
    const n=[]

const [state, setstate] = useState(n)

//Get all Notes

const getnote=async()=>{
    //Api calls
    const response=await fetch(`${host}/api/note/fetchnotes`,{
        method:"GET",
        headers:{
            "content-Type":"application/json",
            "auth-token":localStorage.getItem('token')
        }
    })
    const json=await response.json()
    // console.log(json)
    setstate(json)
}

//Add a Note

const addnote=async (title, description, tag)=>{
    //Api calls
    const response=await fetch(`${host}/api/note/createnote`,{
        method:"POST",
        headers:{
            "auth-token":localStorage.getItem('token'),
            "content-Type":"application/json"
        },
        body: JSON.stringify({title, description, tag})
    })
    const json= await response.json()
    console.log(json)

    //Adding a Note
    const note= json
    setstate(state.concat(note))
}

//Delete a Note

//APi CallS
const deletenote=async(id)=>{
    //Api calls
    const response=await fetch(`${host}/api/note/deletenote/${id}`,{
        method:"DELETE",
        headers:{
            "auth-token":localStorage.getItem('token'),
            "content-Type":"application/json"
        },
    })
    const json=await response.json()
    // console.log(json)
//Deleting a Note
console.log("Deleting id"+id)
const newnotes=state.filter((note)=>{ return (note._id!==id)})
setstate(newnotes)
}



//Edit a Note
const editnote=async (id, title, description, tag )=>{
    //Api calls
    const response=await fetch(`${host}/api/note/updatenote/${id}`,{
    method:"PUT",
    headers:{
        "auth-token":localStorage.getItem('token'),
        "content-Type":"application/json"
    },
    body: JSON.stringify({title, description, tag})
})
const json=response.json()
console.log(json)

let newnote=JSON.parse(JSON.stringify(state))
//Logic to edit in client
for (let index = 0; index < newnote.length; index++) {
        const element = newnote[index];
        if(element._id===id){
            newnote[index].title=title
            newnote[index].description=description
            newnote[index].tag=tag
            break;
        }
    }
    setstate(newnote)
    console.log(newnote)
}

    return(
        <noteContext.Provider value={{state, addnote, deletenote, editnote, getnote}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState