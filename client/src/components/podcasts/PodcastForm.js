import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import ErrorList from "../ErrorList.js";
import translateServerErrors from "../../services/translateServerErrors.js";
const PodcastForm = (props) => {
  const [podcastRecord, setPodcastRecord] = useState({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const handleInputChange = (event) => {
    setPodcastRecord({
      ...podcastRecord,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    addPodcast(podcastRecord);
  };

  const clearForm = (event) => {
    event.preventDefault();
    setPodcastRecord({
      name: "",
      description: "",
    });
  };

  const addPodcast = async (podcastPayload) => {
    event.preventDefault();
    const { genreId } = props.match.params.id;
    try {
      const response = await fetch(`/api/vi/genres/${genreId}/podcasts`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(podcastPayload),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setPodcastRecord(body.podcast);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };
  return (
    <form className="callout" onSubmit={onSubmitHandler}>
      <label htmlFor="name" />
      Podcast Name:
      <input type="text" name="name" onChange={handleInputChange} value={podcastRecord.name} />
      <label htmlFor="description" />
      Podcast Description:
      <input
        type="text"
        name="description"
        onChange={handleInputChange}
        value={podcastRecord.description}
      />
      <div className="button-group">
        <button className="button" onClick={clearForm}>
          Clear
        </button>
        <input className="button" type="submit" value="Submit" />
      </div>
    </form>
  );
};
export default PodcastForm;
