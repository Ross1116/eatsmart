"use client";
import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  Suspense,
} from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  useTransform,
} from "framer-motion";
import useMousePosition from "@/utils/useMousePosition";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowBigDown, ExternalLink } from "lucide-react";
import styles from "../styles/page.module.scss";
import diner from "../assets/diner-1.webp";
import Image from "next/image";
import SplineWrapper from "@/components/SplineWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from "@/components/Footer";
import arrow from "@/assets/arrow.svg";

const Character = React.lazy(() => import("@/components/Character"));
const SideMenuWrapper = React.lazy(
  () => import("@/components/SideMenu/SideMenuWrapper")
);
const NavBar = React.lazy(() => import("@/components/NavBar"));
const Loader = React.lazy(() => import("@/components/Loader"));
const Banner = React.lazy(() => import("@/components/Banner"));

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  const { x, y } = useMousePosition();

  const size = isHovered ? 500 : 40;

  const [showSplineWrapper, setShowSplineWrapper] = useState(false);

  const splineContainerRef = useRef(null);

  const timeline = useRef(null);

  const [loading, setLoading] = useState(true);

  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();

  const windowSize = useRef([
    typeof window !== "undefined" ? window.innerWidth : 0,
    typeof window !== "undefined" ? window.innerHeight : 0,
  ]);

  const scrollRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-130%"]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= windowSize.current[1]) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    timeline.current = gsap.timeline({
      scrollTrigger: {
        trigger: "#part1",
        start: "middle bottom",
        end: "bottom bottom",
        scrub: true,
      },
    })
    timeline.current.to(splineContainerRef.current, { opacity: 1, xPercent: 25 });

    timeline.current = gsap.timeline({
      scrollTrigger: {
        trigger: "#part2",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
    });
    timeline.current.to(splineContainerRef.current, { xPercent: -25 });

    timeline.current = gsap.timeline({
      scrollTrigger: {
        trigger: "#part3",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
    });
    timeline.current.to(splineContainerRef.current, { xPercent: 25 });

    timeline.current = gsap.timeline({
      scrollTrigger: {
        trigger: "#part4",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
    });
    timeline.current.to(splineContainerRef.current, { xPercent: 0 });

  }, []);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      const locomotiveScroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
      });
    })();

    const timer = setTimeout(() => {
      setShowSplineWrapper(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    loading
      ? document.querySelector("body").classList.add("loading")
      : document.querySelector("body").classList.remove("loading");
  }, [loading]);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center relative overflow-x-hidden"
      ref={scrollRef}
    >
      {loading ? (
        <motion.div key="loader">
          <Loader setLoading={setLoading} />
        </motion.div>
      ) : (
        <AnimatePresence>
          <div className="w-full h-full">
            <Suspense>
              <NavBar />
            </Suspense>

            {showSplineWrapper && (
                <div
                  className="fixed top-0 left-0 w-dvw h-dvh -z-10"
                  ref={splineContainerRef}
                >
                  <SplineWrapper />
                </div>
              )}

            <motion.div
              className={styles.mask}
              animate={{
                WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,

                WebkitMaskSize: `${size}px`,
              }}
              transition={{ duration: 0 }}
            >
              <div className="h-dvh w-full flex items-center justify-center"></div>
              <div className="h-dvh w-full flex items-center justify-center"></div>
              <div className="relative h-dvh w-full flex flex-col items-center justify-center gap-14 px-80">
                <p
                  className="absolute top-20 text-9xl font-extrabold text-center"
                  onMouseEnter={() => {
                    setIsHovered(true);
                  }}
                  onMouseLeave={() => {
                    setIsHovered(false);
                  }}
                >
                  Potential Waste by an <br />
                  Apple
                </p>
                <div className="flex justify-start items-start w-full">
                  <p
                    className="mt-56 text-7xl font-bold"
                    onMouseEnter={() => {
                      setIsHovered(true);
                    }}
                    onMouseLeave={() => {
                      setIsHovered(false);
                    }}
                  >
                    The Initial Har&apos;waste&apos;
                  </p>
                </div>
                <div>
                  <p
                    className="text-2xl text-justify font-medium w-1/2"
                    onMouseEnter={() => {
                      setIsHovered(true);
                    }}
                    onMouseLeave={() => {
                      setIsHovered(false);
                    }}
                  >
                    A significant amount of the crop is often lost or discarded
                    before ever reaching consumers. It&apos;s estimated that up to
                    25% of apples growing on trees in Victoria&apos;s orchards may
                    never be successfully picked and transported off the farm.
                  </p>
                </div>
              </div>

              <div className="relative h-dvh w-full flex flex-col items-center justify-center gap-14 px-80">
                <div className="flex justify-end items-start w-full">
                  <p
                    className="mt-40 text-7xl font-bold"
                    onMouseEnter={() => {
                      setIsHovered(true);
                    }}
                    onMouseLeave={() => {
                      setIsHovered(false);
                    }}
                  >
                    Transport Wastage
                  </p>
                </div>
                <div className="flex justify-end">
                  <p
                    className="text-2xl text-justify font-medium w-1/2"
                    onMouseEnter={() => {
                      setIsHovered(true);
                    }}
                    onMouseLeave={() => {
                      setIsHovered(false);
                    }}
                  >
                    Industry estimates suggest that up to 10% of the apple crop
                    can be lost at this stage of the supply chain. Apples can
                    become damaged or spoiled due to improper handling,
                    temperature fluctuations, and delays during the shipping
                    process.
                  </p>
                </div>
              </div>

              <div className="relative h-dvh w-full flex flex-col items-center justify-center gap-14 px-80">
                <div className="flex justify-start items-start w-full">
                  <p
                    className="mt-20 text-7xl font-bold "
                    onMouseEnter={() => {
                      setIsHovered(true);
                    }}
                    onMouseLeave={() => {
                      setIsHovered(false);
                    }}
                  >
                    The Market Waste
                  </p>
                </div>
                <div className="flex justify-start">
                  <p
                    className="text-2xl text-justify font-medium w-1/2"
                    onMouseEnter={() => {
                      setIsHovered(true);
                    }}
                    onMouseLeave={() => {
                      setIsHovered(false);
                    }}
                  >
                    Estimates suggest that up to 15% of apples may be discarded
                    at this final point of sale before reaching consumers.
                    Retailers often have strict cosmetic standards, rejecting
                    apples with minor blemishes, bruises or imperfect shapes,
                    even if the fruit is otherwise perfectly edible. Limited
                    refrigeration and display space in some smaller grocery
                    outlets can also lead to quicker spoilage and waste.
                  </p>
                </div>
              </div>

              <div className="relative h-dvh w-full flex flex-col items-center justify-center gap-14 px-80">
                <div className="flex justify-center items-start w-full">
                  <p
                    className="text-7xl font-bold"
                    onMouseEnter={() => {
                      setIsHovered(true);
                    }}
                    onMouseLeave={() => {
                      setIsHovered(false);
                    }}
                  >
                    Your Average Wastage
                  </p>
                </div>
                <div className="flex justify-center">
                  <p
                    className="text-2xl text-justify font-semibold w-1/2"
                    onMouseEnter={() => {
                      setIsHovered(true);
                    }}
                    onMouseLeave={() => {
                      setIsHovered(false);
                    }}
                  >
                    Industry studies estimate that as much as 10% of apples
                    purchased by households in Victoria may end up being
                    discarded uneaten. This wastage happens for several reasons
                    - some apples may spoil prematurely due to improper storage
                    at home, while others may be overlooked and forgotten in
                    refrigerators or fruit bowls. Additionally, some consumers
                    may be overly picky about minor cosmetic imperfections and
                    choose to throw away otherwise edible apples. <br/> <p className="text-primary-500">.</p>
                  </p>
                </div>
                <Button className="z-20 bg-text-50 rounded-full text-primary-500">
                  <Link className="flex items-center gap-2" href="/infographics">Learn More <ExternalLink/></Link>
                </Button>
              </div>
              <Footer/>
            </motion.div>

            <div className="w-dvw h-dvh flex flex-col justify-between bg-[#121405] font-extrabold px-36 leading-snug drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] relative text-text-50 dark:text-text-950">
              <motion.p
                className="absolute text-base top-[24.5%] right-[10%] w-[24%] font-medium text-end"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2 }}
              >
                Say goodbye to wasted resources and hello to informed decisions.
                Together, let&apos;s transform food waste into a thing of the
                past.
              </motion.p>

              <Suspense>
                <AnimatePresence>
                  <Banner />
                </AnimatePresence>
              </Suspense>

              {!loading && (
                <motion.div className="absolute top-[90%] flex justify-center items-start mr-36">
                  <motion.div
                    layoutId="main-image-1"
                    transition={{
                      ease: "backOut",
                      duration: 1.8,
                    }}
                  >
                    <Image
                      className="-mt-6 min-h-max bg-cover bg-[50%] bg-no-repeat rounded-3xl shadow-2xl"
                      src={diner.src}
                      alt={""}
                      width={3000}
                      height={3000}
                    />
                    <div className="absolute min-h-full inset-0 w-full overflow-hidden bg-background-50 bg-fixed opacity-75 -mt-6 rounded-3xl"></div>
                  </motion.div>

                  <motion.div
                  style={{ y: parallaxY}}
                  className="absolute bottom-1/4 left-1/2 size-6/12">
                    <svg
                      viewBox="0 0 200 200"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="fill-background-100"
                        d="M53.4,-49.8C66.4,-40.4,72.2,-20.2,69.1,-3.1C66,14,53.9,27.9,40.9,43.1C27.9,58.3,14,74.7,-1.7,76.3C-17.3,78,-34.6,64.9,-43.4,49.7C-52.3,34.6,-52.7,17.3,-55.4,-2.7C-58.1,-22.7,-63.1,-45.4,-54.2,-54.8C-45.4,-64.2,-22.7,-60.4,-1.3,-59.1C20.2,-57.8,40.4,-59.2,53.4,-49.8Z"
                        transform="translate(100 100)"
                      />
                      <text
                        x="110"
                        y="100"
                        textAnchor="middle"
                        fontSize="16"
                        className="fill-text-950"
                      >
                        Our Mission
                      </text>
                    </svg>
                  </motion.div>

                  <motion.div className="absolute text-xl font-normal text-right right-0 mr-36 w-1/3 mt-72"
                  whileInView={{opacity:1}}
                  initial={{opacity:0}}
                  transition={{duration:1}}>
                    Explore our website, Learn simple tips and tricks to reduce
                    your food waste and become a food waste warrior!
                  </motion.div>

                  <motion.div className="absolute text-2xl text-justify font-medium w-5/12 left-0 ml-36 mt-72"
                  whileInView={{y:0, opacity:1}}
                  initial={{y:100, opacity:0.5}}
                  transition={{duration: .8}}>
                    At EatSmart, we are dedicated to tackling the global issue
                    of food waste. Through engaging education, practical
                    strategies, and collaboration, we empower individuals,
                    families, and businesses to reduce food waste across the
                    entire food chain – from farm to table. We strive to create
                    a more sustainable future where food is respected, resources
                    are conserved, and hunger is alleviated.
                  </motion.div>
                </motion.div>
              )}

              <motion.div
              initial={{ scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "backOut"}}
              className="absolute bottom-8 flex items-center justify-center">
                <svg
                  width="294"
                  height="294"
                  viewBox="0 0 294 294"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-44 fill-text-100"
                >
                  <path d="M 294 147 A 147 147 0 1 1 0 147 A 147 147 0 1 1 294 147" />
                </svg>

                <motion.svg
                  viewBox="-40 -40 320 320"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-40 absolute"
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    repeat: Infinity,
                    duration: 12,
                    ease: "linear",
                  }}
                >
                  <path
                    id="curve"
                    d="M 240 120 A 120 120 0 1 1 0 120 A 120 120 0 1 1 240 120"
                    fill="none"
                  />
                  <motion.text
                    className="fill-text-950 font-outline-1"
                    fontSize="40"
                    textLength={`${Math.PI * 240 - 40}`}
                  >
                    <textPath href="#curve">SCROLL.DOWN.</textPath>
                  </motion.text>
                </motion.svg>

                <ArrowBigDown className="absolute size-12 text-text-950" />
              </motion.div>
            </div>

            <motion.div
              className="fixed z-20 right-10 top-10"
              initial={{ opacity: 1, scale: 0 }}
              animate={
                isScrolled ? { opacity: 1, y: 0, scale: 1 } : { scale: 0 }
              }
              transition={{ duration: 0.4 }}
            >
              <Suspense>
                <SideMenuWrapper />
              </Suspense>
            </motion.div>

            <div className="bg-black bg-opacity-45">
              <div className="h-dvh w-full flex items-center justify-center"></div>

              <div
                className="relative h-dvh w-full flex flex-col items-center justify-center gap-14 px-80"
                id="part1"
              >
                <p className="absolute top-20 text-9xl font-extrabold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  The Journey of an <br />
                  Apple
                </p>
                <div className="absolute bottom-[12%] left-[6%] flex justify-center items-center">
                <p className="text-2xl pt-5">hover here</p>
                  <Image className="dark:invert" src={arrow} width={100} height={60} alt="arrow" />
                </div>
                <div className="flex justify-start items-start w-full">
                  <p className="mt-60 text-7xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-justify">The Initial Harvest</p>
                </div>
                <div>
                  <Suspense>
                  <Character paragraph="Producing a single apple requires substantial resource inputs - from ample farmland and irrigation to years of labor and specialized equipment. The cultivation of each fruit represents a significant investment of land, water, nutrients, and time by the grower before it can be harvested."
                  />
                  </Suspense>
                </div>
              </div>

              <div
                className="relative h-dvh w-full flex flex-col items-center justify-center gap-14 px-80"
                id="part2"
              >
                <div className="flex justify-end items-start w-full -mt-12">
                  <p className="mt-60 text-7xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-justify w-1/2">Transport Stage</p>
                </div>
                <div className="flex justify-end">
                  <Suspense>
                  <Character paragraph="The apple must be carefully packaged, loaded onto trucks or other vehicles, and transported, often over long distances, to reach distribution centers and grocery stores. This shipping process involves the use of fossil fuels, refrigeration or climate-controlled storage, and labor to handle the apple at every step." />
                  </Suspense>         
                </div>
              </div>

              <div
                className="relative h-dvh w-full flex flex-col items-center justify-center gap-14 px-80"
                id="part3"
              >
                <div className="flex justify-start items-start w-full -mt-48">
                  <p className="mt-60 text-7xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-justify w-1/2">The Market</p>
                </div>
                <div className="flex justify-start">
                  <Suspense>
                    <Character paragraph="Grocery stores must allocate valuable retail space, temperature-controlled storage, and labor to receive, , and sell each individual apple. Energy is consumed to power the lighting, refrigeration, and other infrastructure needed to properly store and showcase the fruit. Packaging materials like bags or containers are also used."/>
                  </Suspense>                  
                </div>
              </div>

              <div
                className="bg-black bg-opacity-70 relative h-dvh w-full flex flex-col items-center justify-center gap-14 px-80"
                id="part4"
              >
                <div className="flex justify-center items-start w-full">
                  <p className="text-7xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    You! The Consumer
                  </p>
                </div>
                <div className="flex justify-center">
                  <p className="text-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-justify font-semibold w-1/2">
                    Once selected by a customer, the apple may be packaged in a
                    bag or container, consuming additional materials. The
                    customer then must transport the apple from the store to
                    their home, typically by private vehicle, further adding to
                    the energy and emissions required. While the individual
                    impact may seem small, the collective resource demands of
                    moving a single apple from the grocery aisle into the hands
                    of the end consumer can add up significantly across an
                    entire apple supply chain.
                  </p>
                </div>

                <Button className="z-20 bg-primary-500 rounded-full text-text-50">
                  <Link className="flex items-center gap-2" href="/infographics">Learn More <ExternalLink/></Link>
                </Button>
              </div>
            </div>
          </div>
          <Footer/>
        </AnimatePresence>
      )}
    </main>
  );
}
