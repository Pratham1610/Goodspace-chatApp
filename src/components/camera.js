import React, { useRef, useEffect, useState } from 'react';

const Camera = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
      }
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject;
      const audioTracks = stream?.getAudioTracks();

      if (audioTracks && audioTracks.length > 0) {
        audioTracks[0].enabled = !audioTracks[0].enabled;
        setIsMuted(!audioTracks[0].enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject;
      const videoTracks = stream?.getVideoTracks();

      if (videoTracks && videoTracks.length > 0) {
        videoTracks[0].enabled = !videoTracks[0].enabled;
        setIsVideoOn(!videoTracks[0].enabled);
      }
    }
  };

  return (
    <div className="w-96 h-72 bg-white bg-opacity-20 backdrop-blur relative">
      <video ref={videoRef} className="w-full h-full" autoPlay playsInline muted={isMuted} />
      <div className="absolute top-2 right-2 flex items-center space-x-2">
        <button onClick={toggleMute} className="text-white">
          {isMuted ? '🔊' : '🔇'}
        </button>
        <button onClick={toggleVideo} className="text-white">
          {isVideoOn ? '📷' : '🚫'}
        </button>
      </div>
    </div>
  );
};

export default Camera;
