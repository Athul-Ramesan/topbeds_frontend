import { FC, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSocket } from "../../../context/SocketContext";

function randomID(len: number): string {
  let result = '';
  if (result) return result;
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  const maxPos = chars.length;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  console.log("🚀 ~ randomID ~ result:🥶🥶🥶🥶🥶", result)
  return result;
}

export function getUrlParams(url: string = window.location.href): URLSearchParams {
  const urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

const VideoCall: FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const senderId = queryParams.get('senderId');
  const { socket } = useSocket();
  const roomID = getUrlParams().get('roomID') || randomID(5);
  const meetingContainerRef = useRef<HTMLDivElement>(null);
  const zegoRef = useRef<any>(null);

  useEffect(() => {
    if (meetingContainerRef.current && !zegoRef.current) {
      initializeZegoCloud();
    }

    return () => {
      // Clean up when component unmounts
      if (zegoRef.current) {
        zegoRef.current.destroy();
      }
    };
  }, [socket, id, senderId]);

  const initializeZegoCloud = async () => {
    const appID = Number(import.meta.env.VITE_REACT_APP_APPID);
    const serverSecret = import.meta.env.VITE_REACT_APP_SERVERSECRET;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));
    
    zegoRef.current = ZegoUIKitPrebuilt.create(kitToken);
    
    zegoRef.current.joinRoom({
      container: meetingContainerRef.current,
      sharedLinks: [
        {
          name: 'Copy link',
          url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });

    

    const data = {
      id: id,
      senderId: senderId,
      link: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
    };

    socket?.emit("videoCall", data);
  };

  return (
    <div
      className="myCallContainer"
      ref={meetingContainerRef}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
};

export default VideoCall;