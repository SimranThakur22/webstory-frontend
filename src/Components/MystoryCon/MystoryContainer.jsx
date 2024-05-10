import React from 'react'
import { Link } from 'react-router-dom'
import './mystorycontainer.css'
import { TbEdit } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
const MystoryContainer = (props) => {
    const navigate = useNavigate();
    return (
        <div className='MystoryContainer'>
            <div className='storytemplate' >
                <div className="imagWrapper">
                    <Link to={`/${props.id}`} ><img src={props.image_url}></img></Link>
                </div>
                <div className="textDesc">
                    <h2 className='storytemplate-details'>{props.name}</h2>
                    <p className='storytemplate-details'>{props.description}</p>
                </div>
            </div>
            <div className="editMystory" onClick={() => navigate('/editStory', { state: { id: props.id } })}>
                <TbEdit />
                <span>edit</span>
            </div>
        </div>
    )
}

export default MystoryContainer
