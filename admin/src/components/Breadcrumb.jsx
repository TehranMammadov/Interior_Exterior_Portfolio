import React from 'react'
import {Link} from 'react-router-dom'

function Breadcrumb(props) {
  return (
    <div className='breadcrumb'>
        <p>{props.pageName}</p>
    </div>
  )
}

export default Breadcrumb