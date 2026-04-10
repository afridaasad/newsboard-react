import { useState, useEffect } from "react";

function SearchBar({ onSearch }) {
  const [text, setText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(text);
    }, 500);

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <input
      type="text"
      placeholder="Search articles..."
      value={text}
      onChange={(e) => setText(e.target.value)}
      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
    />
  );
}

export default SearchBar;