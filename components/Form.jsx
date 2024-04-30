import Link from "next/link";

const Form = ({ type, post, setPost, handleSubmit, submit }) => {
  return (
    <div className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            {type} your Prompt:
          </span>
          <textarea
            value={post.prompt}
            placeholder="Write your post here"
            required
            className="form_textarea "
            onChange={(e) => {
              setPost({ ...post, prompt: e.target.value });
            }}
          ></textarea>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tags (#webdev, #cybersec):
          </span>
          <input
            value={post.tag}
            placeholder="Write your tags here"
            required
            className="form_input"
            onChange={(e) => {
              setPost({ ...post, tag: e.target.value });
            }}
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submit}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submit ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Form;
