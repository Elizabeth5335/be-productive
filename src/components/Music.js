import React, { useState } from "react";
import "../styles/Music.css";
import { Link } from "react-router-dom";

import { ref, onValue, update } from "firebase/database";

export default function Music(props) {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [song, setSong] = React.useState("");
  const [songUrl, setSongUrl] = React.useState("");


  const user = "admin";

  const music = ref(props.database, "users/" + user + "/music");

  let musicData = [];
  const [videoList, setVideoList] = React.useState(musicData);

  React.useEffect(() => {
    onValue(music, (snapshot) => {
      setVideoList(snapshot.val());
      console.log(snapshot.val());
    });
  }, []);

  const changeVideo = (index) => {
    setCurrentVideo(index);
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev === 0 ? videoList.length - 1 : prev - 1));
  };

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev === videoList.length - 1 ? 0 : prev + 1));
  };

  function addMusic(e) {
    e.preventDefault(e);

    const newSong = {
      name: song,
      url: songUrl,
    };

    const newSongId = videoList.length + 1;

    setVideoList((prev) => {
      return [...prev, newSong];
    });

    update(music, {
      [newSongId]: newSong,
    });

    setSong("");
    setSongUrl("");
  }

  return (
    <>
      <Link to="/nav">
        <h1 className="back-btn">{"<==="} Back</h1>
      </Link>
      <h1>Music for concentration</h1>
      {videoList.length > 0 && (
        <>
          <div className="flex">
            <ul>
              {videoList.map((video, index) => (
                <li key={index} onClick={() => changeVideo(index)}>
                  {video.name}
                </li>
              ))}
            </ul>
            <div className="videoContainer">
              <iframe
                width="560"
                height="315"
                src={videoList[currentVideo].url}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <div className="buttonContainer">
                <button className="music-button" onClick={prevVideo}>Previous</button>
                <button className="music-button" onClick={nextVideo}>Next</button>
              </div>
            </div>
          </div>
          <form onSubmit={addMusic} className="music-form">
            <input
              value={song}
              onChange={(e) => setSong(e.target.value)}
              className="name"
              type="text"
              placeholder="name"
            />
            <input
              value={songUrl}
              onChange={(e) => setSongUrl(e.target.value)}
              className="url"
              type="text"
              placeholder="url"
            />
            <button className="music-button">Submit</button>
          </form>
        </>
      )}
    </>
  );
}
