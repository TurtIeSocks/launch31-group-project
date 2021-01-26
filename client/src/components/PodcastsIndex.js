import React, { useState, useEffect } from "react";
import PodcastTile from "./PodcastTile";

const PodcastsIndex = (props) => {
  const [podcasts, setPodcasts] = useState([]);

  const getPodcasts = async () => {
    try {
      const response = await fetch("api/v1/podcasts");
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const body = await response.json();
      setPodcasts(body.podcasts);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getPodcasts();
  }, []);

  const podcastTiles = podcasts.map((podcast, index) => {
    return (
      <div>
        <PodcastTile key={index} podcast={podcast} />
      </div>
    );
  });

  return <div>{podcastTiles}</div>;
};

export default PodcastsIndex;
