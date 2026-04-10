import { Link } from "react-router-dom";
import useNewsStore from "../store/useNewsStore.js";

function ArticleCard({ article }) {
  const { bookmarks } = useNewsStore();
  const isBookmarked = bookmarks.some(a => a.id === article.id);

  return (
    <Link
      to={`/article/${article.id}`}
      className="block paper-card p-5 group"
    >
      <div className="flex justify-between items-start mb-3">

        <span className="paper-meta">
          Hacker News
        </span>

        <div className="bookmark">
          {isBookmarked ? "🔖" : ""}
        </div>

      </div>

      <h2 className="paper-title text-lg font-semibold group-hover:text-[#6b4f2a] transition">
        {article.title}
      </h2>

      <div className="mt-4 flex justify-between paper-meta">
        <span>{article.by}</span>
        <span>{article.score} pts</span>
      </div>
    </Link>
  );
}

export default ArticleCard;