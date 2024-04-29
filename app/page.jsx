import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <div className="head_text text-center">
        <p className="">Discover and Create</p>
        <p className="orange_gradient ">AI powered prompts</p>
      </div>
      <p className="text-xl text-center mt-4">
        Try me propmt is an open source AI powered propmt tool{" "}
      </p>
      <Feed />
    </section>
  );
};

export default Home;
