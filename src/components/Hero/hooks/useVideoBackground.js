import { useState, useEffect, useRef } from 'react';

const useVideoBackground = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set video source immediately
    const source = video.querySelector('source');
    if (source) {
      source.src = isMobile 
        ? "/videos/backgroundheroivideo-mobile.mp4" 
        : "/videos/backgroundheroivideo.mp4";
      video.load();
    }

    // Handle video events
    const handleCanPlay = () => {
      setIsVideoLoaded(true);
      // Ensure video plays
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error('Video playback failed:', error);
          // If autoplay is blocked, still show the video
          setIsVideoLoaded(true);
        });
      }
    };

    const handleLoadedMetadata = () => {
      // Try to play as soon as metadata is loaded
      video.play().catch(() => {
        // If autoplay fails, still show the video
        setIsVideoLoaded(true);
      });
    };

    const handleError = (error) => {
      console.error('Video loading error:', error);
      setIsVideoLoaded(false);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleError);
    };
  }, [isMobile]);

  return {
    videoRef,
    isVideoLoaded,
    isMobile
  };
};

export default useVideoBackground; 