"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import Image from "next/image";
import EmptyFeed from "./EmptyFeed";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-10 prompt_layout ">
      {data.map((post) => (
        <PromptCard
          key={post?._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };
  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const clearSearch = () => {
    setSearchText("");
    const searchResult = filterPrompts("");
    setSearchedResults(searchResult);
  };
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch("/api/promt");
        const data = await res.json();
        if (res.ok) {
          setPosts(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);

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
        {searchText && (
          <span
            className="absolute right-2 cursor-pointer"
            onClick={clearSearch}
          >
            <Image
              src="/assets/icons/close.svg"
              width={18}
              height={18}
              alt="close"
            />
          </span>
        )}
      </form>

      {posts.length ? (
        searchText ? (
          <PromptCardList
            data={searchedResults}
            handleTagClick={handleTagClick}
          />
        ) : (
          <PromptCardList data={posts} handleTagClick={handleTagClick} />
        )
      ) : (
        <EmptyFeed
          text="Oops! Looks like we're in uncharted territory. Please try again or
        explore something new!"
          align="items-center"
          textAlign="text-center"
        />
      )}
    </section>
  );
};

export default Feed;