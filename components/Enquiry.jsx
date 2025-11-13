"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChevronDown } from "lucide-react";
import ZohoEnquiryForm from "./ui/ZohoEnquiryForm";
import schedule from "@/constants/schedule";

const OpeningHours = () => {
  const [expanded, setExpanded] = useState(true);

  const todayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  const today = todayIndex === 0 ? 6 : todayIndex - 1; // adjust so Mon=0
  const todaySchedule = schedule[today];

  return (
    <section className="w-fit border border-black/10 rounded-xl shadow-sm px-3 py-2">
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <Clock className="text-main size-4" />
          <p className="text-base font-semibold text-gray-800">
            Open Today <span className="text-main">{todaySchedule.hours}</span>
          </p>
        </div>

        <motion.button
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="m-1 p-1 rounded-full hover:bg-gray-100 transition"
        >
          <ChevronDown className="size-5" />
        </motion.button>
      </div>

      {/* Expandable Schedule with Animation */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="schedule"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden mt-3 border-t border-gray-200 pt-3"
          >
            {schedule.map((item, index) => (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex justify-between py-1.5 px-3 rounded-lg text-xs ${
                  index === today
                    ? "bg-main/10 text-main font-medium"
                    : "text-gray-700"
                }`}
              >
                <span>{item.day}</span>
                <span>{item.hours}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};


const Enquiry = () => {
  return (
    <>
      {/* <ZohoForm /> */}
      <section id="enquiry"  data-lenis-scroll-to className="p-sec sm:!pt-0">
        <div className="maxWSec mx-auto ">
          <h2 className="font-bebas h2 sm:mb-8 text-center">
            Have an <span className="text-main">Enquiry?</span>
          </h2>
          <div className="flex max-lg:flex-col sm:gap-6">
            {/* Detail */}
            <div className="flex-1 px-6 py-6 flex flex-col gap-8 items-center text-center">
              <div>
                <h4 className="h4">Let us help!</h4>
                <p className="text-gray-600 mt-1 max-w-[54ch] text-sm">
                  If you're unsure about what type of tuition will work best for
                  you, just tell us a little more about your needs. We will get
                  back to you as soon as possible with the answers you need!
                </p>
              </div>
              <div>
                <h4 className="h4">Wimbledon Learning Centre</h4>
                <p className="text-gray-600 mt-1 max-w-[54ch] text-sm">
                  hello@wimbledonlearningcentre.com
                </p>
              </div>

              <OpeningHours />
            </div>

            <div className="max-lg:hidden w-px min-h-full py-12">
              <div className="w-full h-full bg-main/20"></div>
            </div>

            {/* Form */}
            <ZohoEnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default Enquiry;
