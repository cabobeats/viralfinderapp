import React, { useState } from 'react';
import './ViralVideos.css';

const ViralVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchViralVideos = async () => {
    setLoading(true);

    try {
      const response = await fetch("https://tiktok-scraper7.p.rapidapi.com/feed/list?region=us&count=10", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "tiktok-scraper7.p.rapidapi.com",
          "x-rapidapi-key": "9f9abe3d48mshbe37fee452bc816p15ff6djsna5b9b8ceafa2",
        },
      });

      const data = await response.json();
      if (data && data.data) {
        setVideos(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch viral videos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="viral-videos-generator">
      <div className="header">
        Viral <span>Videos</span>
      </div>
      <div className="generate-btn" onClick={fetchViralVideos}>
        Give me Viral Videos
      </div>
      {loading && (
        <div className="loading-text">Loading...</div>
      )}
      <div className="videos-list">
        {videos.map((video, index) => (
          <div key={index} className="video-item">
            <img src={video.cover} alt={video.title} className="video-thumbnail" />
            <div className="video-info">
              <div className="video-title">{video.title}</div>
              {video.author && (
                <div className="video-meta">Author: {video.author.nickname}</div>
              )}
              <a 
                href={`https://www.tiktok.com/@${video.author ? video.author.unique_id : 'unknown'}/video/${video.video_id}`} 
                className="video-link" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Watch on TikTok
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViralVideos;
