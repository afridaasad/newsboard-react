import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchItem } from "../api/newApi.js";
import useNewsStore from "../store/useNewsStore.js";

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [startTime, setStartTime] = useState(null);

  const { addBookmark, removeBookmark, bookmarks, addHistory } = useNewsStore();

  const isBookmarked = bookmarks.some(a => a.id === article?.id);

  useEffect(() => {
    loadArticle();
    setStartTime(Date.now());
  }, [id]);

  useEffect(() => {
    return () => {
      if (!article || !startTime) return;

      const timeSpent = Math.floor((Date.now() - startTime) / 1000);

      addHistory({
        id: article.id,
        title: article.title,
        timeSpent,
        date: new Date().toISOString(),
      });
    };
  }, [article, startTime]);

  const loadArticle = async () => {
    const data = await fetchItem(id);
    setArticle(data);
  };

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto p-6 animate-pulse">
        <div className="h-8 bg-[#e7dccb] rounded mb-4" />
        <div className="h-4 bg-[#e7dccb] rounded w-1/2 mb-6" />
        <div className="h-10 bg-[#e7dccb] rounded w-40" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">

      <div className="paper-card p-6">

        <h1 className="text-3xl md:text-4xl font-semibold leading-snug mb-4">
          {article.title}
        </h1>

        <div className="paper-meta flex justify-between mb-4">
          <div className = "paper-meta mb-2"> 
            {article.url && new URL(article.url).hostname}
          </div>
          <span>By {article.by}</span>
          <span>{article.score} points</span>
        </div>

        <div className="h-px bg-[#bfa27a] my-4" />

{article.text ? (
  <div
    className="text-sm leading-relaxed mb-6 text-[#2b2b2b]"
    dangerouslySetInnerHTML={{ __html: article.text }}
  />
) : (
  <div className="mb-6">

    <p className="text-[#2b2b2b] leading-relaxed mb-3">
      {article.title}
    </p>

    <p className="text-[#7a6a58] text-sm">
      This article is hosted externally. Click below to read the full story.
    </p>

  </div>
)}

        <div className="flex gap-3 flex-wrap">

          <button
            onClick={() =>
              isBookmarked
                ? removeBookmark(article.id)
                : addBookmark(article)
            }
            className="px-4 py-2 rounded-lg border border-[#bfa27a]
            bg-[#f8f1e4] hover:bg-[#efe4d1] transition"
          >
            {isBookmarked ? "🔖 Saved" : "📑 Bookmark"}
          </button>

          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 bg-black text-white rounded-lg
            hover:opacity-90 transition"
          >
            Read full article
          </a>

        </div>

      </div>

    </div>
  );
}

export default ArticleDetail;