import React, { useState, useEffect } from 'react'
// import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { useParams } from 'react-router-dom'
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
import { Link } from 'react-router-dom'
import axios from "axios"

export default function NotePage({ match, history}) {

    let {id} = useParams()
    let [note, setNote] = useState(null)

    useEffect(() => {
        getNote()
    }, [id])

    // console.log({id})

    let getNote = async () => {
        if (id === 'new') return

        let response = await fetch(`http://127.0.0.1:8000/api/notes/${id}`)
        let data = await response.json()
        setNote(data)
    }

    let createNote = async () => {
        // console.log('creating a post')
        console.log('current Note :', note)
        // fetch(`http://127.0.0.1:8000/api/notes/${id}`, {
        //     method: 'POST',
        //     headers:{
        //         'Content-Type ': 'application/json'
        //     },
        //     body: JSON.stringify(note)

        
        // })
        axios.post("http://127.0.0.1:8000/api/notes/",note)
        .then((response)=>{
            console.log(response.data)
        });
        console.log("data posted")
    }

    let updateNote = async () => {
        console.log("PUT Note",note)
        fetch(`http://127.0.0.1:8000/api/notes/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let deleteNote = async () => {
        fetch(`http://127.0.0.1:8000/api/notes/${id}`, {
            method:"DELETE",
            'headers': {
                'Content-Type': 'application/json'
            }
        })
        // history.push('/')
    }

    let handleSubmit = () => {
        console.log('NOTE:', note)
        if (id !== 'new' && note.body == '') {
            deleteNote()
        } else if (id !== 'new') {
            updateNote()
        } else if (id === 'new' && note.body !== null) {
            console.log("jayant is trying hard")
            createNote()
        }
        // history.push('/')
    }

    let handleChange = (value) => {
        setNote(note => ({...note,'body': value}))
    }
    
    return (
        <div className="note">
        <h1>my id {id}</h1>
            <div className='note-header'>
                <h3 >
                    <Link to='/'>
                        <ArrowLeft onClick={handleSubmit}/>
                    </Link>
                    
                </h3>
                <Link to='/'>
                    {id !== 'new' ? (<button onClick={deleteNote}> Delete </button>) : (<button onClick={handleSubmit}> Done </button>)}                    
                </Link>
            </div>
            <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body}></textarea>
        </div>
    )
}