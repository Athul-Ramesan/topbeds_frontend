
const FindYourPropertyAd = () => {
  return (
    <div className="relative w-full m-auto flex justify-end min-h-[230px] max-h-[380px] z-10  box-border border-2 rounded-lg  border-gray-300">
        <div className="absolute z-0 left-[-20px] bottom-[40px] h-[64px] w-[64px] bg-yellow-400 rounded-[50%]">
        </div>
        <div className="flex flex-col w-2/5 justify-center text-primaryColor">
            <p className="text-4xl font-semibold">Find homes</p>
                <p className="text-2xl font-semibold">for your next trip</p>
            <button className="hover:text-white hover:bg-primaryColor transition duration-500 h-10 rounded-lg my-5">Discover homes</button>
        </div>
        <div className="w-2/5">
            <img className="p-6" src="public/cat-sleeping-indexPage.png" alt="" />
        </div>
    </div>
  )
}

export default FindYourPropertyAd
