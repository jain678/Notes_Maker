import React from "react";
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";
import { Link } from "react-router-dom";


export default function NotesListPage(){
    const [notes,setNotes] = React.useState([])

    const fetchData = () => {
    return fetch("http://127.0.0.1:8000/api/notes")
          .then((response) => response.json())
          .then((data) => setNotes(data));
    }

    React.useEffect(() => {
        fetchData();
    },[])

    return (
        <div className="notes">

            <div className="notes-header">
                <h2 className="notes-title">&#9782; Notes</h2>
                <p className="notes-count">{notes.length}</p>
            </div>
            <div className="notes-list">
                {notes.map((note,index) => 
                    <ListItem note={note} key={index}/>
                )}
            </div>
                
                <AddButton /> 
                          
        </div>
    )
}