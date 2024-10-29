import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import VideoControls from './components/VideoControls';

const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [controlsVisible, setControlsVisible] = useState(true);
  const timeoutRef = useRef<number | null>(null);

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const showControls = () => {
    setControlsVisible(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setControlsVisible(false), 3000);
  };

  useEffect(() => {
    const handleMouseMove = () => showControls();

    const videoContainer = videoRef.current?.parentElement;
    if (videoContainer) videoContainer.addEventListener('mousemove', handleMouseMove);

    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) setControlsVisible(true);
    });

    return () => {
      videoContainer?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="app">
      <div className="video-wrapper">
        <div className="video-title-container">
          <i className="video-icon">🎥</i>
          <h1 className="video-title">My Video Player</h1>
        </div>
        <div className="video-container">
          <video
            ref={videoRef}
            className="video"
            controls={false}
            onClick={handleVideoClick}
            onDoubleClick={handleFullScreen} 
          >
            <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" />
            Your browser does not support the video tag.
          </video>
          <div className={`controls-wrapper ${controlsVisible ? 'visible' : 'hidden'}`}>
            <VideoControls videoRef={videoRef} onFullScreen={handleFullScreen} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
