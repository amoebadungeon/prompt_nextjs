"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profiles from "@components/Profiles"


const Profile = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchaaa = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
           
            const data = await response.json();
            
            setPosts(data)
          
        };
    
        if(session?.user.id) {
            fetchaaa();
        }
    
      }, [session?.user.id]);
   
   
    const handleEdit = (post) =>{
      router.push(`/update-prompt?id=${post._id}`)
    }
    
    const handleDelete = async(post) =>{
      const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

      if(hasConfirmed){
        try {
          await fetch(`/api/prompt/${post._id.toString()}`,{
            method: "DELETE",
          });

          const filteredPost = posts.filter((p)=> p._id !== post._id);

          setPosts(filteredPost);
        } catch (error) {
          console.log(error)
        }
      }
    }
  return (
   <Profiles
    name="My"
    desc="Welcome to your personalize profile"
    data={posts}
    handleEdit= {handleEdit}
    handleDelete={handleDelete}
    />
  )
}

export default Profile