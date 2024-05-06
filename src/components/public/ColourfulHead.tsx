import { FaArrowRight } from "react-icons/fa6"

const ColourfulHead = () => {
    return (
        
        <div
            className="div h-auto pb-10 w-1/2 bg-bgaccent m-auto my-4 rounded-[1em] relative group p-2 z-0 overflow-hidden"
        >
            <div
                className="h-full w-[20%] bg-[#FDEE00] absolute left-0 bottom-full z-[-1] group-hover:translate-y-full duration-[400ms]"
            ></div>
            <div
                className="h-full w-[20%] bg-[#7CFC00] absolute left-[20%] top-full z-[-1] group-hover:-translate-y-full duration-[400ms] delay-[50ms]"
            ></div>
            <div
                className="h-full w-[20%] bg-[#007FFF] absolute left-[40%] bottom-full z-[-1] group-hover:translate-y-full duration-[400ms] delay-[100ms]"
            ></div>
            <div
                className="h-full w-[20%] bg-[#FF5800] absolute left-[60%] top-full z-[-1] group-hover:-translate-y-full duration-[400ms] delay-[150ms]"
            ></div>
            <div
                className="h-full w-[20%] bg-[#FF66CC] absolute left-[80%] bottom-full z-[-1] group-hover:translate-y-full duration-[400ms] delay-[200ms]"
            ></div>
            
            <button
                className="text-[0.8em] absolute bottom-[1em] left-[1em] text-[#6C3082] group-hover:text-white duration-100"
            >
                <div className="flex items-center">
                <span 
                    className="relative before:h-[0.16em]  before:absolute before:w-full before:content-[''] before:bg-[#6C3082] group-hover:before:bg-white duration-100 before:bottom-0 before:left-0"
                >More Info</span    
                >
                <FaArrowRight />
            </div>
            </button>

            <h1
                className="z-20 font-bold font-Poppin text-[1.4em]  duration-100"
            >
                Be a Part of the Journey, Become a Host
            </h1>
            <h1
                className="z-20 font-bold font-Poppin text-[1.4em] duration-100"
            >
                Share Your Space, Earn Extra Income
            </h1>
            <h1
                className="z-20 font-bold font-Poppin text-[1.4em] duration-100"
            >
                Turn Your Home into a Destination"
            </h1>
        </div>

    )
}

export default ColourfulHead
