"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger);

const Steps = [
  {
    title: "Our shared mission",
    detail: [
      "Our mission is to empower students to achieve academic excellence in Maths and English through personalised and engaging tuition.",
      "Our proven formula combines expert tuition with a deep understanding of individual learning styles to unlock your child's potential. We're not just teaching subjects; we're nurturing confidence, building skills, and laying the groundwork for a bright future.",
    ],
  },
  {
    title: "Our people",
    detail: [
      "Our commitment to your child's success is at the heart of everything we do. We believe that every child has the potential to excel in Maths and English, and our team is dedicated to unlocking that potential.",
      "Our expert tutors are passionate about education and have a proven track record of helping students achieve their goals.",
      "We work closely with parents to create a supportive learning environment where children can thrive.",
    ],
  },
  {
    title: "Learning method",
    detail: [
      "At Wimbledon Learning Centre, we offer high-quality Maths and English tuition in a supportive learning environment. Our classes are held at our centre on Arthur Road, Wimbledon Park. To ensure your child receives the individual attention they deserve, we limit our class sizes to a maximum of eight students. This allows our expert tutors to provide tailored support and guidance, helping your child achieve their full potential.",
    ],
    cards: [
      {
        title: "Knowledge Assessment",
        detail:
          "Assessing your child's baseline knowledge and Skill Mapping to identify strengths and developments areas.",
      },
      {
        title: "Personalised Learning Plans",
        detail:
          "We believe every child is unique. Our learning approach allows us to create highly personalised learning plans. By carefully assessing your child's strengths and weaknesses, we tailor our tuition to their specific needs. This ensures that they are challenged but not overwhelmed, maximising their learning potential.",
      },
      {
        title: "Continuous Assessment",
        detail:
          "We employ a continuous assessment model to track your child's progress closely. Regular assessments help us identify areas where they excel and where they need additional support. This approach allows us to adjust our teaching methods and resources accordingly, ensuring optimal learning outcomes.",
      },
      {
        title: "Data-Driven Insights",
        detail:
          "We believe that data is key to unlocking your child's potential. By carefully analysing your child's performance, we gain valuable insights into their learning patterns. This information enables us to make informed decisions about the best teaching strategies and resources to use.",
      },
      {
        title: "Collaborative Partnerships for Success",
        detail:
          "We believe in the power of partnership. By working closely with parents and students, we create a supportive learning environment. We encourage open communication and value your input. Together, we set clear goals and track progress, ensuring that your child is on the right path to academic success. Your involvement is crucial to your child's learning journey, and we are committed to working together to achieve the best possible outcomes.",
      },
      {
        title: "Focus on the Individual",
        detail:
          "Our tuition goes beyond simply teaching subjects. We focus on understanding your child as an individual learner. By combining our expertise with Bayesian learning principles, we create a supportive and nurturing environment where your child can thrive. Our goal is to build confidence and develop a lifelong love of learning.",
      },
    ],
    // link: {
    //   title: "see all",
    //   url: "/Curriculum/EarlyYears",
    // },
  },
];

const CardDetail = ({ detail }) => {
  const [expanded, setExpanded] = useState(false);
  const toggle = () => setExpanded(!expanded);

  return (
    <div className="flex flex-col">
      <p
        className={`text-gray-500 text-xs leading-snug transition-all duration-200 ${
          expanded ? "line-clamp-none" : "line-clamp-1"
        }`}
      >
        {detail}
      </p>
      {detail.length > 80 && ( // show button only if text is long
        <button
          onClick={toggle}
          className="ml-auto text-sec text-xs font-medium mt-1 opacity-60 hover:opacity-100"
        >
          {expanded ? "See less" : "See all"}
        </button>
      )}
    </div>
  );
};

const AboutUs = () => {
  const container = useRef();
  const progressLine = useRef();
  const progressRedLine = useRef();
  const iconsArray = useRef([]);
  const [isActive, setIsActive] = useState(-1);

  useGSAP(
    () => {
      const timeline = gsap.timeline();

      function SetProgressHeight(prog) {
        if (progressRedLine.current && prog) {
          gsap.to(progressRedLine.current, {
            height: `${100 * prog}%`,
            duration: 0.1,
          });
        }
      }

      ScrollTrigger.create({
        trigger: container.current,
        start: `top 50%`,
        end: `bottom 60%`,
        animation: timeline,
        scrub: 1,
        onUpdate: (self) => {
          let progress = self.progress;
          let bottomPos = 0;
          SetProgressHeight(progress);

          if (progressLine.current) {
            const progressLineT =
              progressLine.current.getBoundingClientRect().top;

            const progressLineH =
              progressLine.current.getBoundingClientRect().height * progress;

            bottomPos = progressLineH + progressLineT;
            if (iconsArray.current) {
              iconsArray.current.forEach((iconRef, index) => {
                if (iconRef) {
                  const topPos = iconRef.getBoundingClientRect().top;
                  if (bottomPos > topPos && index > isActive) {
                    setIsActive(index);
                  }
                }
              });
            }
          }
        },
      });
    },
    { scope: container, dependencies: [] }
  );

  return (
    <section
      id="Timeline"
      ref={container}
      className="maxWSec flex flex-col lg:flex-row p-sec"
    >
      <div className="w-full lg:w-fit flex-shrink-0 px-6 py-7 sm:px-12 sm:py-11 relative">
        <div className="sticky top-28 flex flex-col max-lg:items-center max-lg:text-center">
          <h2 className="font-bebas h2 w-fit">
            About <span className="text-main">Us</span>
          </h2>
          <Image
            src={"/about_us.webp"}
            alt="about us"
            width={500}
            height={500}
            className="w-full lg:w-80 aspect-video lg:aspect-square mt-6 rounded-xl object-cover object-center shadow-lg"
          />
        </div>
      </div>

      <div className="flex-grow flex sm:px-4 lg:px-0 ">
        {/* Progress */}
        <div className="w-9 flex-shrink-0 p-4 lg:py-12 flex justify-center">
          <div
            ref={progressLine}
            className="relative w-1 rounded-lg bg-gray-100 my-1 overflow-hidden"
          >
            <div
              ref={progressRedLine}
              className="absolute w-full left-0 top-0 bg-sec"
            ></div>
          </div>
        </div>

        {/* Steps */}
        <div className="flex-grow p-4 lg:p-12 flex flex-col gap-6 sm:gap-12">
          {Steps.map((item, i) => {
            return (
              <div key={i} className="relative">
                <div
                  ref={(el) => (iconsArray.current[i] = el)}
                  className={`w-5 aspect-square z-10 absolute -left-6 lg:-left-14 -translate-x-full top-0 bg-main border-solid rounded-full flex justify-center items-center flex-col transition-all duration-200 ${
                    isActive >= i && isActive != -1
                      ? "border-sec border-4 scale-125"
                      : "border-transparent border-4"
                  }`}
                >
                  {item.icons &&
                    item.icons.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={
                            index != item.icons?.length - 1 ? "-mb-1" : ""
                          }
                        >
                          <Image
                            src={item}
                            width={20}
                            height={20}
                            alt={"logo"}
                          ></Image>
                        </div>
                      );
                    })}

                  {item.icon && item.icon}
                </div>

                <div className="flex">
                  <div className="flex flex-col gap-3">
                    <h3 className="h3 w-full">{item.title}</h3>
                    {item.detail && (
                      <p className="text-gray-500 space-y-3 text-sm sm:text-base leading-normal w-full">
                        {item.detail &&
                          item.detail.map((detailText, detailIndex) => {
                            return (
                              <span className="block" key={detailIndex}>
                                {detailText}
                              </span>
                            );
                          })}
                      </p>
                    )}
                    {item.cards && (
                      <ul className=" w-full grid md:grid-cols-2 gap-4 mt-2">
                        {item.cards.map((card, i) => {
                          return (
                            <li
                              key={i}
                              className="leading-snug border rounded-lg p-2"
                            >
                              <h5 className="text-foreground font-medium text-base mb-1">
                                {card?.title}
                              </h5>
                              <CardDetail detail={card.detail} />
                            </li>
                          );
                        })}
                      </ul>
                    )}
                    {item.link && (
                      <Link
                        href={item.link.url}
                        name="detail link"
                        className="w-fit text-sec text-base flex items-center gap-2 hover:gap-4 hover:underline transition-all duration-300"
                      >
                        <span>{item.link.title}</span>
                        <svg
                          className="h-auto w-4"
                          viewBox="0 0 18 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M17.7604 6.15482C18.0799 6.47301 18.0799 6.9889 17.7604 7.30709L12.5535 12.4923C12.234 12.8105 11.7159 12.8105 11.3964 12.4923C11.0769 12.1741 11.0769 11.6582 11.3964 11.34L15.2066 7.54574L0.818181 7.54574C0.366311 7.54574 -1.42215e-06 7.18095 -1.38281e-06 6.73096C-1.34347e-06 6.28097 0.366311 5.91618 0.818181 5.91618L15.2066 5.91618L11.3964 2.12187C11.0769 1.80368 11.0769 1.28779 11.3964 0.969602C11.7159 0.651411 12.234 0.651411 12.5535 0.969602L17.7604 6.15482Z"
                            fill="#0098DB"
                          />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
