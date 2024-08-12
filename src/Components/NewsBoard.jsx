import { useState, useEffect, useRef } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = () => {
  const [articles, setArticles] = useState([]);
  const inputRef = useRef();
  const BASE_URL = `https://newsapi.org/v2/everything?`;

  function reload() {
    const inputText = inputRef.current.value;
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
      console.error("API key is not available");
      return;
    }
    const url = `${BASE_URL}q=${inputText ? inputText : "All"}&apiKey=${apiKey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setArticles(data.articles));
  }

  useEffect(() => {
    reload();
  }, []);

  return (
    <div>
    <h2 className="text-center">Latest <span className="badge bg-danger">News </span></h2>
    <div className="d-flex" role="search">
      <input className="form-control me-2" ref={inputRef} type="search" placeholder="Search" aria-label="Search" />
      <button className="btn btn-outline-success" onClick={reload} type="submit">Search</button>
    </div>
    {articles?.map((news, index) => {
      return <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url} />;
    })}
  </div>
  );
};

export default NewsBoard;