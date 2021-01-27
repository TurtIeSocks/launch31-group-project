import React from "react";
import { Link } from "react-router-dom";

const PodcastTile = ({ podcast }) => {
  return (
    <Link to={`/podcasts/${podcast.id}`}>
      <div className="callout primary">
        <h1>{podcast.name}</h1>
        <p>{podcast.description}</p>
      </div>
    </Link>
  );
};

export default PodcastTile;
