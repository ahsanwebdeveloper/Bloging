import React ,{useEffect,useState} from 'react'
import { Container , PostCard } from '../components'
import appwriteService from '../appwrite/config'

function AllPost() {
    const [posts,setposts]=useState(null)
    useEffect(()=>{},[])
    appwriteService.getPost([]).then((posts)=>{
        if(posts){
            setposts(posts.documents)
        }
    })
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'> 
            {posts.map((post)=>(
                <div key={post.$id} className='p-2 w-1/2'> 
                <PostCard post={post}/>
                 </div>
            ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPost