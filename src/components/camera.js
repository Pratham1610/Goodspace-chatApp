import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMicrophone,
    faMicrophoneSlash,
    faVideo,
    faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";

import React, { useRef, useEffect, useState } from "react";

const Camera = () => {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(true);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing camera:", error);
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
        <div className="h-72 bg-white bg-opacity-20 backdrop-blur relative rounded-lg p-16 pt-6">
            <div className="w-92 h-60 float-left border-white border-4">
                <video
                    ref={videoRef}
                    className="w-full h-full rounded-md"
                    autoPlay
                    playsInline
                    muted={isMuted}
                />
            </div>
            <div className="float-right space-y-7 m-10">
                <button
                    onClick={toggleVideo}
                    className="text-white bg-blue-500 p-2 rounded-full flex items-center justify-center"
                    style={{ width: "60px", height: "40px" }}
                >
                    <FontAwesomeIcon
                        icon={isVideoOn ? faVideoSlash : faVideo}
                    />
                </button>
                <button
                    onClick={toggleMute}
                    className="text-white bg-blue-500 p-2 rounded-full flex items-center justify-center"
                    style={{ width: "60px", height: "40px" }}
                >
                    <FontAwesomeIcon
                        icon={isMuted ? faMicrophoneSlash : faMicrophone}
                    />
                </button>
            </div>
        </div>
    );
};

export default Camera;
