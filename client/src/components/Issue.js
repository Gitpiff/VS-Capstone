import React from "react"
import Comment from "./Comment"


export default function Issue(props){
    const { title, description, imgUrl, _id } = props

    return(
        <div className="issue">
            <h1>{title}</h1>
            <h3>{description}</h3>
            <img src={imgUrl} alt={imgUrl} width={300} />
            <Comment _id={_id}/>
        </div>
    )
}
