"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const splitTitle = new SplitText(titleRef.current, { type: "chars" });

      gsap.from(splitTitle.chars, {
        opacity: 0,
        y: 80,
        stagger: 0.05,
        ease: "power4.out",
        duration: 1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%",
          scrub: true,
          pin: true,
        },
      });

      if (!isMobile) {
        tl.to(imgRef.current, {
          xPercent: -80,
          scale: 1.5,
          borderRadius: "1.5rem",
          width: "32rem",
          height: "24rem",
          boxShadow: "0 0 80px rgba(231, 211, 147, 0.4)",
          ease: "expo.inOut",
          duration: 2,
        });

        tl.to(
          titleRef.current,
          { xPercent: 80, ease: "expo.inOut", duration: 2 },
          "<"
        );
      } else {
        tl.to(imgRef.current, {
          scale: 1.1,
          borderRadius: "1rem",
          width: "20rem",
          height: "16rem",
          boxShadow: "0 0 40px rgba(231, 211, 147, 0.3)",
          ease: "expo.inOut",
          duration: 1.5,
        });
      }

      const splitText = new SplitText(textRef.current, { type: "lines" });
      gsap.set(splitText.lines, {
        opacity: 0,
        xPercent: isMobile ? 0 : 80,
        y: 80,
        color: "#6b7280",
      });

      tl.to(splitText.lines, {
        opacity: 1,
        y: 40,
        xPercent: isMobile ? 0 : 80,
        color: "#e7d393",
        stagger: 0.2,
        duration: 1.2,
        ease: "power2.out",
      }).to(splitText.lines, {
        color: "#efefef",
        duration: 1,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden"
    >
      <div className="relative flex flex-col items-center justify-center text-center">
        <h1
          ref={titleRef}
          className="text-5xl md:text-9xl font-modern-negra text-white tracking-wide"
        >
          ABOUT US
        </h1>
        <div
          ref={imgRef}
          className="relative w-56 h-56 md:w-72 md:h-72 mt-8 overflow-hidden rounded-2xl"
        >
          <Image
            src="/images/adogan-dish.jpg"
            alt="Adogan Dish"
            fill
            className="object-cover"
          />
        </div>

        <p
          ref={textRef}
          className="mt-10 max-w-md md:max-w-2xl text-base md:text-xl leading-relaxed font-sans relative md:absolute"
        >
          At <span className="font-modern-negra text-yellow">Adogan </span>
          Restaurant, we don’t just serve food – we celebrate it. Founded with a
          passion for authentic flavors, exceptional hospitality, and the joy of
          sharing meals, Adogan has grown into a place where every bite tells a
          story. Our mission is simple: to bring people together through food
          that nourishes the body and soul. We believe that great food is more
          than just ingredients; it’s about love, tradition, and creativity.
          That’s why our chefs carefully craft each dish using the freshest
          local ingredients, combining time-honored recipes with innovative
          culinary techniques. From the bold and spicy to the rich and
          comforting, our menu is a journey through flavors that satisfy every
          craving.
        </p>
      </div>
    </section>
  );
}
