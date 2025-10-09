"use client";
import React, { useState } from "react";

const Ressources = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return;

    setStatus("sending");

    // Simulate API call
    setTimeout(() => {
      console.log("Email submitted:", email);
      setStatus("sent");
      setEmail("");

      // Reset after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    }, 1000);
  };

  return (
    <section className="p-sec sm:pt-0! max-sm:mb-6">
      <div className="maxWSec mx-auto px-2 md:px-8 flex flex-col items-center gap-6 text-center">
        {/* Title */}
        <h1 className="font-bebas h1">
          Get Free Learning <span className="text-main">Resources</span>
        </h1>

        {/* Description */}
        <p className="text-gray-600 max-w-2xl text-sm sm:text-base">
          Sign up with your email to receive free Maths and English resources,
          tips from our expert tutors, and exclusive updates directly to your
          inbox.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg flex items-center gap-2 border border-gray-300 rounded-2xl p-2 shadow-sm bg-white max-sm:text-sm"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-2 py-1 sm:py-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring focus:ring-main transition text-xs sm:text-sm"
          />

          <button
            type="submit"
            disabled={status === "sending"}
            className={`${
              status === "sent"
                ? "bg-sec"
                : status === "sending"
                ? "bg-gray-400"
                : "bg-main hover:bg-black"
            } text-white whitespace-nowrap px-6 py-3 rounded-xl font-medium transition-all duration-300 text-xs sm:text-sm`}
          >
            {status === "sending"
              ? "Sending..."
              : status === "sent"
              ? "Sent!"
              : "Get Resources"}
          </button>
        </form>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400">
          By subscribing, you agree to receive occasional emails from us. You
          can unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default Ressources;
