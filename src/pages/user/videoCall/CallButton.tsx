// CallButton.tsx
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../context/SocketContext';
import { MdVideoCall } from 'react-icons/md';

interface CallButtonProps {
    recipientId: string;
}

const CallButton: FC<CallButtonProps> = ({ recipientId }) => {
    const navigate = useNavigate();
    const { socket } = useSocket();

    const handleStartCall = () => {
        navigate(`/user/video-call?id=${recipientId}&senderId=${recipientId}&roomID=6Set9`)
      };

    return (
        <button onClick={handleStartCall}>
            <MdVideoCall />
        </button>
    );
};

export default CallButton;