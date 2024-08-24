import React from 'react'

const page = ({params}:{params:{meetingId:string}}) => {
  return (
    <div className='text-white'>meeting details for {params.meetingId}</div>
  )
}

export default page