"use client";

import React, { useState } from "react";
import Button from "./ui/Button";
import FormField from "./ui/FormField";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChevronDown } from "lucide-react";
import ZohoForm from "./ui/EnquiryForm";

const OpeningHours = () => {
  const [expanded, setExpanded] = useState(true);

  const schedule = [
    { day: "Mon", hours: "13:00 - 19:00" },
    { day: "Tue", hours: "16:00 - 20:00" },
    { day: "Wed", hours: "16:00 - 20:00" },
    { day: "Thu", hours: "13:00 - 19:00" },
    { day: "Fri", hours: "16:00 - 20:00" },
    { day: "Sat", hours: "13:00 - 20:00" },
    { day: "Sun", hours: "09:00 - 14:00" },
  ];

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

const Form = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    query: "",
  });

  // State to track form submission status
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    setIsSubmitted(true);

    // Reset form fields
    setFormData({
      fullName: "",
      email: "",
      query: "",
    });

    // Hide success message after a few seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="lg:maxWSec flex-1 px-6 py-6 flex flex-col gap-8">
      <div className="text-center">
        <h4 className="leading-normal h4">Contact us!</h4>
        <p className="text-gray-600 text-sm">if you need more information</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative grid gap-x-2 gap-y-4  grid-cols-1 sm:grid-cols-2"
      >
        {/* Success message */}
        {isSubmitted && (
          <motion.div
            className="absolute z-[1000] inset-[-5px] bg-white p-6 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-green-100 text-green-800 text-center px-4 py-12 rounded-md shadow-md text-sm">
              Your form has been submitted successfully. <br />
              We'll get back to you soon!
            </div>
          </motion.div>
        )}

        {/* Full Name */}
        <FormField
          label="Full Name"
          name="fullName"
          placeholder="e.g. John Doe"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        {/* Email */}
        <FormField
          label="Email"
          name="email"
          placeholder="e.g. johndoe@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Query */}
        <div className="col-span-full">
          <FormField
            label="Your Query"
            name="query"
            placeholder="Write your message here..."
            textarea
            value={formData.query}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-full text-center">
          <Button
            size="s"
            variant="primary"
            icon={Send}
            className="ring ring-black/30"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
};

const Enquiry = () => {
  return (
    <>
      {/* <ZohoForm /> */}
      <section className="p-sec sm:!pt-0">
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
            <Form />
          </div>
        </div>
      </section>
    </>
  );
};

export default Enquiry;
