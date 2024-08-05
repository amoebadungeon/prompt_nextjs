import PromptCard from "./PromptCard";

const Profiles = ({ name, desc, data, handleEdit, handleDelete }) => {
  // Ensure data is always an array and filter out null or undefined posts
  const validData = Array.isArray(data) ? data.filter((post) => post != null) : [];
  console.log("daa",validData)
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      
      <div className="mt-10 prompt_layout">
        {validData.length > 0 ? (
          validData.map((post) => (
            <PromptCard
              key={post._id} // Ensure post is a valid object
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))
        ) : (
          <p>No posts available.</p> // Display a message if there are no posts
        )}
      </div>
    </section>
  );
};

export default Profiles;
