import React, { useEffect, useState } from "react";
import '../assets/css/newsfeed.css';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail?: string;
}

const RSS_URL =
  "https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/news/rss.xml";

const NewsFeed: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(RSS_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }

        const data = await response.json();
        setNews(data.items);
      } catch (err) {
        setError("Unable to load news feed.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div className="newsfeed-loading">Loading BBC News...</div>;
  }

  if (error) {
    return <div className="newsfeed-error">{error}</div>;
  }

  const makePostId = (s: string) => {
    // deterministic short id from string
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = (h << 5) - h + s.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h).toString().slice(0, 6);
  };

  const formatPoster = (index: number) => {
    const trip = (index % 97).toString(36).toUpperCase();
    return `Anonymous !${trip}`;
  };

  return (
    <div className="newsboard">
      <header className="board-header">
        <div className="board-title">/news/ — Retro Feed</div>
        <div className="board-sub">2008 style • Futuristic skin</div>
      </header>

      <div className="board-list">
        {news.map((item, index) => (
          <article className="post" key={index}>
            <div className="post-left">
              <div className="poster">{formatPoster(index)}</div>
              <div className="postid">No.{makePostId(item.title + item.pubDate)}</div>
            </div>

            <div className="post-body">
              <h3 className="post-title">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </h3>

              <div className="post-meta">
                <span className="post-time">{new Date(item.pubDate).toLocaleString()}</span>
              </div>

              <div className="post-text" dangerouslySetInnerHTML={{ __html: item.description }} />
            </div>

            {item.thumbnail && (
              <div className="post-thumb-wrap">
                <img src={item.thumbnail} alt={item.title} className="post-thumb" />
              </div>
            )}
          </article>
        ))}
      </div>

      <footer className="board-footer">/end/ — welcome to the future</footer>
    </div>
  );
};

export default NewsFeed;