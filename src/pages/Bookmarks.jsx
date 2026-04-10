import useNewsStore from "../store/useNewsStore.js";
import { useState } from "react";
import { Link } from "react-router-dom";

function Bookmarks() {
  const { bookmarks, removeBookmark } = useNewsStore();

  const [sortBy, setSortBy] = useState("date");
  const [selected, setSelected] = useState([]);
  const [lastDeleted, setLastDeleted] = useState([]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const deleteSelected = () => {
    const deleted = bookmarks.filter(b =>
      selected.includes(b.id)
    );

    setLastDeleted(deleted);

    selected.forEach(id => removeBookmark(id));
    setSelected([]);

    setTimeout(() => {
      setLastDeleted([]);
    }, 5000);
  };

  const sorted = [...bookmarks].sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }

    if (sortBy === "source") {
      return (a.by || "").localeCompare(b.by || "");
    }

    return b.bookmarkedAt - a.bookmarkedAt;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      <h1 className="text-2xl font-semibold mb-4">
        Bookmarks
      </h1>

      <div className="mb-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="paper-select"
        >
          <option value="date">Sort by Date</option>
          <option value="title">Sort by Title</option>
          <option value="source">Sort by Source</option>
        </select>
      </div>

      {selected.length > 0 && (
        <div className="mb-4">
          <button
            onClick={deleteSelected}
            className="px-5 py-2 bg-black text-white rounded-lg
            hover:opacity-90 transition"
          >
            Delete Selected ({selected.length})
          </button>
        </div>
      )}

      {lastDeleted.length > 0 && (
        <div className="mb-4 flex items-center justify-between
        paper-card p-3">

          <span className="text-sm">
            Deleted {lastDeleted.length} bookmark(s)
          </span>

          <button
            onClick={() => {
              lastDeleted.forEach(item =>
                useNewsStore.getState().addBookmark(item)
              );
              setLastDeleted([]);
            }}
            className="px-4 py-1 bg-black text-white rounded-md
            hover:opacity-90 transition"
          >
            Undo
          </button>

        </div>
      )}

      {bookmarks.length === 0 && (
        <p className="paper-meta">
          No bookmarks yet
        </p>
      )}

      <div className="space-y-3">
        {sorted.map((item) => (
          <div
            key={item.id}
            className="paper-card p-4 flex gap-3 items-start"
          >
            <input
              type="checkbox"
              checked={selected.includes(item.id)}
              onChange={() => toggleSelect(item.id)}
              className="mt-1 accent-black"
            />

            <Link to={`/article/${item.id}`} className="flex-1">
              <h2 className="font-semibold leading-snug hover:underline">
                {item.title}
              </h2>

              <div className="paper-meta mt-1">
                {item.by}
              </div>
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Bookmarks;