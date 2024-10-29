// src/components/VideoControls.tsx
import React, { RefObject } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaForward, FaBackward, FaExpand } from 'react-icons/fa';
import './VideoControls.css';

interface VideoControlsProps {
  videoRef: RefObject<HTMLVideoElement>;
  onFullScreen: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({ videoRef, onFullScreen }) => {
  const handlePlay = () => videoRef.current?.play();
  const handlePause = () => videoRef.current?.pause();

  return (
    <div className="controls-container">
      <FaBackward className="icon" onClick={() => videoRef.current!.currentTime -= 10} />
      <FaPlay className="icon" onClick={handlePlay} />
      <FaPause className="icon" onClick={handlePause} />
      <FaForward className="icon" onClick={() => videoRef.current!.currentTime += 10} />
      <FaVolumeUp className="icon" onClick={() => (videoRef.current!.volume = Math.min(videoRef.current!.volume + 0.1, 1))} />
      <FaExpand className="icon fullscreen-icon" onClick={onFullScreen} />
    </div>
  );
};

export default VideoControls;
