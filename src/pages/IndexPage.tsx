import CardWithIconAndDescription from "../components/public/CardWithIconAndDescription"
import { FaMoon } from "react-icons/fa";
import { FaTag } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import DummyArt from "../components/public/DummyArt";
import SearchByCalender from "../components/public/SearchByCalender";
import ColourfulHead from "../components/public/ColourfulHead";
import CountShow from "../components/public/CountShow";
import FindYourPropertyAd from "../components/public/FindYourPropertyAd";
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'
import { useCallback } from "react";




const IndexPage = () => {
  const particlesInit = useCallback(async (engine: any) => {
    console.log(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: any | undefined) => {
    return new Promise<void>((resolve) => {
      console.log(container);
      // Additional initialization logic can go here
      resolve(container);
    });
  }, []);
  return (
    <div className="px-10">
      
      <div className='h-auto  bg-blue'>
        <div className=''>
          <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
              background: {
                color: {
                  value: ""
                },
              },
              fpsLimit: 960,
              interactivity: {
                events: {
                  onClick: {
                    enable: true,
                    mode: "push",
                  },
                  onHover: {
                    enable: true,
                    mode: "repulse",
                  },
                  resize: true,
                },
                modes: {
                  push: {
                    quantity: 1,
                  },
                  repulse: {
                    distance: 5,
                    duration: 0.4,
                  },
                },
              },
              particles: {
                color: {
                  value: "#197195",
                },
                links: {
                  color: "#197195",
                  distance: 150,
                  enable: true,
                  opacity: 0.7,
                  width: 1,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "bounce",
                  },
                  random: false,
                  speed: 4,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    area: 800,
                  },
                  value: 30,
                },
                opacity: {
                  value: 1,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 5 },
                },
              },
              detectRetina: true,
            }}
            className='particles' />
        </div>
        <div className=" w-full flex m-10 items-center gap-4 bg-primaryTint rounded-xl p-4 px-10">
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
    </div>
  )
}

export default IndexPage
