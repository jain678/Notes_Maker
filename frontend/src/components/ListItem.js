import React from "react";
import { Link } from "react-router-dom";

let getTime = (note) => {
    return new Date(note.updated).toLocaleDateString()
}

let getTitle = (note) => {
    let title = note.body.split('\n')[0]
    if(title.length > 40){
        return title.slice(0,40)
    }
    return title
}

let getContent = (note) => {
    let title = getTitle(note)
    let content = note.body.replaceAll('\n', ' ')
    content = content.replaceAll(title, '')

    if(content.length > 40){
        return content.slice(0,40) + '...'
    }
    else{
        return content
    }
}

export default function ListItem({note}){   

    return (
        <Link to={`/note/${note.id}`}>
            <div className="notes-list-item">
                <h3>{getTitle(note)}</h3>
                <p><span>{getTime(note)}</span>{getContent(note)}</p>
            </div>
            {/* <h3>{props.note.body}</h3> */}
        </Link>
        
    )
}