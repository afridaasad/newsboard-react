import { Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed.jsx"
import ArticleDetail from "./pages/ArticleDetail.jsx";
import Bookmarks from "./pages/Bookmarks.jsx";
import Header from "./components/Header.jsx";
import History from "./pages/History.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/history" element={<History />} />

      </Routes>
    </div>
  );
}

export default App;