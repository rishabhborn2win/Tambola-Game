import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <div id="wrapper" style={{display: "flex", justifyContent:"center", alignItems: "center"}}>
            <Link to="/">
            <img style ={{width:"50%"}} src="https://miro.medium.com/max/5120/1*DeBkx8vjbumpCO-ZkPE9Cw.png" />
            </Link>
        </div >
    )
}

export default PageNotFound