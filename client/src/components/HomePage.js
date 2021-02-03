import React from "react"
import PodcastsIndex from "./podcasts/PodcastsIndex.js"

const HomePage = (props) => {
  return (
    <div className="grid-x">
      <PodcastsIndex />
    </div>

    // <div className="card" styles={"width: 300px;"}>
    //   <div className="card-divider">This is a header</div>
    //   <div className="card-section">
    //     <img src="https://i.redd.it/qaifncf1hc651.png"></img>
    //     <div className="card-section">
    //       <p>It has an easy to override visual style, and is appropriately subdued.</p>
    //     </div>
    //   </div>
    // </div>
  )
}

export default HomePage
