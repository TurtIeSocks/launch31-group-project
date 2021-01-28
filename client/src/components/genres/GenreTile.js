import React from 'react'
import { Link } from 'react-router-dom'

const GenreTile = props => {
  return (
    <div className='callout'>
      <h2>
        <Link to={`/genres/${props.id}`}>{props.name}</Link>
      </h2>
    </div>
  )
}

export default GenreTile