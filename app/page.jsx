import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <div className="head_text text-center">
        <p className="">Discover and Create</p>
        <p className="orange_gradient ">AI powered prompts</p>
      </div>
      <p className="desc text-center">
        Try me prompt is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      <Feed />
    </section>
  );
};

export default Home;
