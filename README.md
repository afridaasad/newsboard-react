NewsBoard — React Screening Exercise

A multi-screen news reading application built with React. Users can browse headlines, read articles, bookmark favourites, and track reading history with synchronized state across screens.

Hosted App

https://newsboard-react.vercel.app/

Tech Stack

- React + Vite
- React Router
- Zustand (global state)
- Tailwind CSS
- Hacker News API
- LocalStorage persistence

Features

Feed

- Pinterest-style responsive grid layout
- Category filtering (High / Medium / Low / Ask HN)
- Debounced search (no API calls per keystroke)
- Sort by newest / top
- Auto refresh with last updated timestamp
- Load more pagination
- Error fallback UI
- Skeleton loading state

Article Detail

- Route: "/article/:id"
- Bookmark toggle
- Reading time tracking
- Reading preview (Ask HN content supported)
- External article redirect
- History logging on exit

Bookmarks

- View all bookmarked articles
- Sort by date / title / source
- Multi-select delete
- Undo delete (5 seconds)
- Bookmark sync across screens
- Click to open article detail

Reading History

- Auto logging of visited articles
- Time spent tracking
- Human readable format (2m 14s)
- Clear history
- Persist across refresh
- Click to reopen article

State Management

Zustand store manages:

- bookmarks
- history
- persistence via localStorage

Folder Structure

src/

- components/
- pages/
- store/
- api/
- utils/

Setup

Install dependencies

npm install

Run dev server

npm run dev

Build

npm run build

Good Practices Applied

1. Global state with Zustand
   Used for bookmarks + history sync across screens.

2. Debounced search
   Implemented using useEffect timeout.

3. Persistent state
   LocalStorage integration for bookmarks & history.

Challenge Faced

Hacker News API does not provide article content for most links.

Solution

Rendered Ask HN content when available and provided preview with external link for full article.

Future Improvements

- Infinite scroll
- Article thumbnails
- Dark mode
- Animations
- Server-side caching