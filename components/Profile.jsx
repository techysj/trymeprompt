import EmptyFeed from "./EmptyFeed";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-center sm:text-left">
        <span className="blue_gradient">Hey, {name}</span>
      </h1>
      <p className="desc text-center sm:text-left">{desc}</p>

      {data.length ? (
        <div className="mt-10 prompt_layout">
          {data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      ) : (
        <EmptyFeed
          text="Seems like there's nothing here yet! Feel free to add some personality to your profile."
          align="sm:items-start items-center"
          textAlign="text-center sm:text-left"
        />
      )}
    </section>
  );
};

export default Profile;
