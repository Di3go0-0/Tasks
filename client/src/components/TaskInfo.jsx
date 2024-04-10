import React from 'react'
import { Params } from 'react-router-dom'

export default function TaskInfo() {

    const params = useParams();


  return (
    <div>
      {params}
    </div>
  )
}
