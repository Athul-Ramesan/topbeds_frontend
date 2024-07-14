// import { useEffect } from "react";

// interface IProps {
//     time: number;
//     setTime: React.Dispatch<React.SetStateAction<number>>;
// }

// const OTPTimer: React.FC<IProps> = ({ time, setTime }) => {
//     useEffect(() => {
//         let intervalId: NodeJS.Timeout;

//         if (time > 0) {
//             intervalId = setInterval(() => {
//                 setTime((prevTime) => prevTime - 1);
//             }, 1000);
//         }

//         return () => clearInterval(intervalId);
//     }, [time, setTime]);

//     return (
//         <div>
//             <p className="text-red-500">00:{time < 10 ? `0${time}` : time}</p>
//         </div>
//     );
// }

// export default OTPTimer;
