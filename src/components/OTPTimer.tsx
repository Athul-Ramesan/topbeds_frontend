import { useEffect } from "react";

interface IProps {
    time: number,
    setTime: (time: number) => void
}

const OTPTimer = (props: IProps) => {
    const { time, setTime } = props;

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (time > 0) {
            console.log("🚀 ~ useEffect ~ time:", time)
            intervalId = setInterval(() => {
                
               setTime((time:number)=>{
                return time-1
               })
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [time]);

    return (
        <div>
            <p className="text-red-500">00:{time <10 ? 0 : ""}{time}</p>
        </div>
    );
}

export default OTPTimer;
