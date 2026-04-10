import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const linkStyle = (path) =>
    `px-3 py-2 text-base transition ${
      pathname === path
        ? "font-semibold text-black"
        : "text-[#2b2b2b]"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#C7A575] border-b border-[#d8cbb5]">

      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* logo */}
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          NewsBoard
        </h1>

        {/* desktop nav */}
        <div className="hidden md:flex gap-6">
          <Link to="/" className={linkStyle("/")}>Feed</Link>
          <Link to="/bookmarks" className={linkStyle("/bookmarks")}>Bookmarks</Link>
          <Link to="/history" className={linkStyle("/history")}>History</Link>
        </div>

        {/* hamburger */}
        <button
          className="md:hidden text-xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </div>

      {/* mobile nav */}
      {open && (
        <div className="md:hidden border-t border-[#d8cbb5] px-4 py-2 flex flex-col gap-2">
          <Link to="/" onClick={()=>setOpen(false)} className={linkStyle("/")}>
            Feed
          </Link>

          <Link to="/bookmarks" onClick={()=>setOpen(false)} className={linkStyle("/bookmarks")}>
            Bookmarks
          </Link>

          <Link to="/history" onClick={()=>setOpen(false)} className={linkStyle("/history")}>
            History
          </Link>
        </div>
      )}

    </header>
  );
}

export default Header;