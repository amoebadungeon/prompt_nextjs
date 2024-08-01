"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard"; 

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]); // Ensure the initial state is an array

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/prompt");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        
        const data = await response.json();
        // Check if data is an array
        if (data) {
          setPosts([data]);  // Use the data directly if it's a non-empty array
        } else {
          setPosts([]);  // Ensure posts is an empty array if there's no data
        }

      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);  // Set posts to an empty array if an error occurs
      }
    };

    fetchPosts();
  }, []); // Dependency array ensures the effect runs only once on component mount

  const handleTagClick = (tag) => {
    // Handle tag click logic here
    console.log("Tag clicked:", tag);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <div className="mt-16 prompt-layout">
        { posts.length > 0 ? (  // Check if there are posts to display
          posts.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}

export default Feed;
