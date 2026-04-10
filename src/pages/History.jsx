import useNewsStore from "../store/useNewsStore.js";
import { formatTime } from "../utils/formatTime.js";
import { Link } from "react-router-dom";

function History() {
  const { history, clearHistory } = useNewsStore();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">
          Reading History
        </h1>

        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="px-4 py-2 bg-black text-white rounded-lg
            hover:opacity-90 transition"
          >
            Clear
          </button>
        )}
      </div>

      {history.length === 0 && (
        <p className="paper-meta">
          No reading history yet
        </p>
      )}

      <div className="space-y-3">
        {history.map(item => (
          <div
            key={item.date}
            className="paper-card p-4"
          >
            <Link to={`/article/${item.id}`}>
              <h2 className="font-semibold leading-snug hover:underline">
                {item.title}
              </h2>
            </Link>

            <div className="paper-meta mt-2 flex justify-between">
              <span>
                Time spent: {formatTime(item.timeSpent)}
              </span>

              <span>
                {new Date(item.date).toLocaleDateString()}
              </span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default History;