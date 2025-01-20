import useVideoBackground from './hooks/useVideoBackground';

const VideoBackground = () => {
  const { videoRef, isVideoLoaded, isMobile } = useVideoBackground();

  return (
    <div 
      className="absolute inset-0 w-full h-full z-0"
      aria-hidden="true"
    >
      {/* Fallback image while video loads */}
      <img
        src="/videos/backgroundheroivideo-poster.jpg"
        alt="Data visualization background"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-0' : 'opacity-90'
        }`}
        loading="eager"
        role="presentation"
        aria-hidden={isVideoLoaded}
      />
      
      <video
        ref={videoRef}
        id="hero-video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/videos/backgroundheroivideo-poster.jpg"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-90' : 'opacity-0'
        }`}
        style={{ objectFit: 'cover' }}
        aria-label="Background video showing data visualization"
        role="presentation"
      >
        <source type="video/mp4" />
        <track 
          kind="descriptions" 
          src="/videos/hero-video-descriptions.vtt" 
          label="Video Descriptions" 
        />
        <track 
          kind="captions" 
          src="/videos/hero-video-captions.vtt" 
          label="English Captions" 
          srcLang="en" 
        />
        <p>Your browser doesn&apos;t support HTML5 video. Here is a 
          <a href="/videos/backgroundheroivideo.mp4">link to the video</a> instead.
        </p>
      </video>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-white/90 via-primary-50/90 to-white/90"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/10 to-transparent"></div>
      <div className="absolute inset-0 bg-mesh-pattern opacity-10"></div>

      {/* Animated Gradients - reduced complexity on mobile */}
      {!isMobile && (
        <>
          <div className="absolute -right-64 -top-64 w-[800px] h-[800px] bg-gradient-to-br from-accent-purple/15 to-primary-300/15 rounded-full blur-3xl animate-pulse-slow z-1" aria-hidden="true"></div>
          <div className="absolute -left-64 -bottom-64 w-[800px] h-[800px] bg-gradient-to-tr from-accent-cyan/15 to-primary-300/15 rounded-full blur-3xl animate-pulse-slow delay-1000 z-1" aria-hidden="true"></div>
        </>
      )}
    </div>
  );
};

export default VideoBackground; 