import axios from "axios";

const BASE = "https://hacker-news.firebaseio.com/v0";

export const fetchTopStories = async () => {
  const { data } = await axios.get(`${BASE}/topstories.json`);
  return data.slice(0, 30);
};

export const fetchItem = async (id) => {
  const { data } = await axios.get(`${BASE}/item/${id}.json`);
  return data;
};