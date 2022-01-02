import { useState } from "react";
import NoteContex from "./NoteContext";

const NoteState = (props)=>{
   const host = "http://localhost:5000"
   const notesinitial =[]

   const [notes, setnotes] = useState(notesinitial)


  //  GET NOTES
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    // console.log(json)
    setnotes(json)
  }


  //  ADD function
 const addNote = async(title,description,tag)=>{

  //  TODO: API  CALLS
  const response = await fetch(`${host}/api/notes/addnote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')
    },
    body: JSON.stringify({title, description, tag})
  });
  const note = await response.json();
  setnotes(notes.concat(note))
  // console.log(json)


  // console.log("Addig a New Note");
  //  let note = {
  //   "_id": "61c9e20609fc54edzted04deddb058e417",
  //   "user": "61c98093cab13ce87da9cae3",
  //   "title": title,
  //   "description": description,
  //   "tag": tag,
  //   "date": "2021-12-27T15:55:50.174Z",
  //   "__v": 0
  // }
  // // Concat returns an Array. WhereAs Push updates an array.
  // //  setnotes(notes.push(note))
 }

  // Edit function  
  
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    // console.log(json)

     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setnotes(newNotes);
  }

  
  // Delete Function
  
  const deleteNote = async(id)=>{
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      
    });

    const json = response.json();
    // console.log(json);

    // console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note)=>{return note._id!==id})
    setnotes(newNotes)
  }

 return(
    <NoteContex.Provider value={{notes,addNote,editNote,deleteNote,getNotes}}>
       {props.children};
       </NoteContex.Provider >
   
 )
}

export default NoteState;