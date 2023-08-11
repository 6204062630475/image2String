import React, { useEffect, useRef } from 'react';

function App() {
  const videoRef = useRef(null);

  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const captureFrame = () => {
    const canvas = document.createElement('canvas');
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64String = canvas.toDataURL('image/jpeg').replace('data:image/jpeg;base64,', '');
    console.log('Base64String:', base64String);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline></video>
      <br /><br />

      <button onClick={captureFrame}>
        Capture and Convert
      </button>
    </div>
  );
}

export default App;
