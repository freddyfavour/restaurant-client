"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { foodLists, drinkLists } from "../../constants/index.js";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = () => {
  const videoRef = useRef();
  const containerRef = useRef();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars, words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 2.0,
      ease: "expo.out",
      stagger: 0.06,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0);

    const startValue = "top top";
    const endValue = "bottom top";

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: startValue,
        end: endValue,
        scrub: true,
        pin: videoRef.current,
      },
    });

    videoRef.current.onloadedmetadata = () => {
      tl.to(videoRef.current, {
        currentTime: videoRef.current.duration,
      });
    };

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero-menu",
          start: "top 30%",
          end: "bottom 80%",
          scrub: true,
        },
      })
      .from("#c-left-leaf", { x: -100, y: 100 })
      .from("#c-right-leaf", { x: 100, y: 100 });
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <section id="hero" className="noisy">
        <h1 className="title max-md:mt-[40vh]">ADOGAN</h1>

        <Image
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
          width={226}
          height={461}
        />
        <Image
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
          width={228}
          height={478}
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Warm. Welcoming. Nigerian.</p>
              <p className="subtitle">
                Taste the Heart <br /> of Nigeria
              </p>
            </div>

            <div className="view-menus">
              <p className="subtitle">
                Every meal at ADOGAN is a blend of tradition, rich flavors, and
                heartfelt hospitality — crafted to bring you home.
              </p>
              <a href="#hero-menu">View special dishes</a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/output.mp4"
        />
      </div>

      {/* The menu section */}

      <section id="hero-menu" className="noisy">
        <img
          src="/images/cocktail-left-leaf.png"
          alt="l-leaf"
          id="c-left-leaf"
        />
        <img
          src="/images/cocktail-right-leaf.png"
          alt="r-leaf"
          id="c-right-leaf"
        />

        <div className="list">
          <div className="popular">
            <h2>Most popular foods:</h2>
            <ul>
              {foodLists.map(({ name, country, detail, price }) => (
                <li key={name}>
                  <div className="md:me-28">
                    <h3>{name}</h3>
                    <p>
                      {country} | {detail}
                    </p>
                  </div>
                  <span>- {price}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="loved">
            <h2>Most loved drinks:</h2>
            <ul>
              {drinkLists.map(({ name, country, detail, price }) => (
                <li key={name}>
                  <div className="me-28">
                    <h3>{name}</h3>
                    <p>
                      {country} | {detail}
                    </p>
                  </div>
                  <span>- {price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
