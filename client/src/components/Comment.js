import React, { useState } from 'react'
import CommentForm from './CommentForm'

export default function Comment({_id}) {

    const [displayForm, setDisplayForm] = useState(false)

    function toggleDisplayForm() {
        setDisplayForm(!displayForm)
    }

    return (
        <div>
            <button onClick={toggleDisplayForm}>Leave a Comment</button>
            {displayForm && <CommentForm _id={_id}/>}
        </div>
    )
}
