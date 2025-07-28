import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard($id , title, featuresImage) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 p-4 rounded-xl'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuresImage)} alt={title} className='rounded-xl'></img>
            </div>
            <h2 className='text-xl text-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard