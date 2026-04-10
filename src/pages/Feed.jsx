import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard.jsx";
import { fetchTopStories, fetchItem } from "../api/newApi.js";
import SearchBar from "../components/SearchBar.jsx";

function Feed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(
    window.innerWidth < 640 ? 6 : 12
  );
  const [search, setSearch] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(false);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    loadNews();
    const interval = setInterval(loadNews, 60000);
    return () => clearInterval(interval);
  }, []);

  const loadNews = async () => {
    setError(false);
    try {
      const ids = await fetchTopStories();
      const promises = ids.slice(0, 50).map(id => fetchItem(id));
      const data = await Promise.all(promises);

      setArticles(data);
      setLastUpdated(new Date());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-gray-700">
          Failed to load news
        </p>

        <button
          onClick={loadNews}
          className="mt-4 px-5 py-2.5 bg-black text-white rounded-lg
          hover:opacity-90 transition shadow-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  const categorized = articles.filter(article => {
    if (category === "high") return article.score > 200;
    if (category === "medium") return article.score > 100;
    if (category === "low") return article.score <= 100;
    if (category === "ask") return article.title?.startsWith("Ask HN");
    return true;
  });

  const filtered = categorized.filter(article =>
    article.title?.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    let result;

    if (sort === "newest") {
      result = b.time - a.time;
    } else {
      result = b.score - a.score;
    }

    return order === "asc" ? -result : result;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* toolbar */}
      <div className="flex flex-col gap-3 mb-4">

        <SearchBar onSearch={setSearch} />

        <div className="flex flex-wrap gap-2 items-center justify-between">

          {/* category pills */}
          <div className="flex gap-2 flex-wrap">
            {["all","high","medium","low","ask"].map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-full text-sm border
                ${category === c
                  ? "bg-black text-white"
                  : "bg-[#f8f1e4] border-[#bfa27a]"
                }`}
              >
                {c === "all" && "All"}
                {c === "high" && "High"}
                {c === "medium" && "Medium"}
                {c === "low" && "Low"}
                {c === "ask" && "Ask HN"}
              </button>
            ))}
          </div>

          {/* sort controls */}
          <div className="flex gap-2 items-center">

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="paper-select"
            >
              <option value="newest">Newest</option>
              <option value="top">Top</option>
            </select>

            <button
              onClick={() =>
                setOrder(order === "asc" ? "desc" : "asc")
              }
              className="px-3 py-2 border border-[#bfa27a] rounded-lg
              bg-[#f8f1e4]"
            >
              {order === "asc" ? "↑" : "↓"}
            </button>

          </div>

        </div>

      </div>

      <div className="paper-meta mb-4">
        Last updated: {lastUpdated?.toLocaleTimeString()}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-2xl bg-[#e7dccb] animate-pulse"
              />
            ))
          : sorted.slice(0, visibleCount).map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
      </div>

      {!loading && visibleCount < sorted.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setVisibleCount(prev => prev + 5)}
            className="px-6 py-3 bg-black text-white rounded-xl
            hover:opacity-90 transition shadow-sm"
          >
            Load More
          </button>
        </div>
      )}

    </div>
  );
}

export default Feed;