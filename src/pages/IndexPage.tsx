import CardWithIconAndDescription from "../components/public/CardWithIconAndDescription"
import { FaMoon } from "react-icons/fa";
import { FaTag } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import DummyArt from "../components/public/DummyArt";
import SearchByCalender from "../components/public/SearchByCalender";
import Modal from "../components/Modal/Modal";
import ColourfulHead from "../components/public/ColourfulHead";
import CountShow from "../components/public/CountShow";
import FindYourPropertyAd from "../components/public/FindYourPropertyAd";

const IndexPage = () => {
  return (
    <div>

      <div className=" w-full flex m-10 items-center border-2 gap-4 bg-primaryTint rounded-xl p-4">
        <h6 className="text-xl font-semibold"> Find and book your perfect stay</h6>
        <CardWithIconAndDescription icon={<FaMoon />} text="Earn rewards on every night you stay" />
        <CardWithIconAndDescription icon={<FaTag />} text="Save more with Member Prices
" />
        <CardWithIconAndDescription icon={<FaCalendarAlt />} text="Free cancellation options if plans change
" />
      </div>
      <div className="flex items-center justify-center px-36 gap-8">
        <DummyArt text="Search through 5 million properties in just a few seconds." image="/indexPage-searching.svg" header="Search simply" />
        <DummyArt text="Compare prices from 100s of sites with us." image="/indexPage-compare.svg" header="Compare confidently" />
        <DummyArt text="Discover a great deal to book on our sites." image="/IndexPage-SaveMoney.svg" header="Save big" />
      </div>
      <div className="relative m-20 ">
        <img className="rounded-xl" src="/discoverBestTime.png" alt="" />
        <p className="text-black shadow-md shadow-black
       absolute left-16 right-36 text-center top-4 text-3xl font-semibold">Discover the best time to book your next stay</p>
        <SearchByCalender />
      </div>
      <div className="flex gap-3">
        <CountShow text="Properties" count={10000} />
        <CountShow text="Properties" count={10000} />
        <CountShow text="Properties" count={10000} />
        <CountShow text="Properties" count={10000} />
      </div>
      <ColourfulHead />

      <div>
        <FindYourPropertyAd />
      </div>
    </div>
  )
}

export default IndexPage
