"use client";

import { useState } from "react";

const ZohoSubscribeForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    // Hidden iframe
    const iframe = document.createElement("iframe");
    iframe.name = "zoho_iframe";
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    // Create real Zoho form
    const form = document.createElement("form");
    form.method = "POST";
    form.target = "zoho_iframe";
    form.action =
      "https://crm.zoho.eu/crm/WebForm?rid=1a409e3561f4ed98610beee216b9a7e1";
    form.style.display = "none";

    const fields = {
      xnQsjsdp:
        "74f3a4b0309e693c8eb0483031c9f266e150910c03b800297b17cfb717c361d1",
      xmIwtLD:
        "8cad7cec3ebca01da9b83c4a6571770f9bed1934f1410bb86ff6f3d3bdd86fa1316740dc6b00088404d23b17f569b4c2",
      actionType: "Q3VzdG9tTW9kdWxlNA==",
      returnURL: "https://wimbledonlearningcentre.com",
      NAME: email,
      zc_gad: "",
    };

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);

    // Submit via iframe
    form.submit();

    // Visual confirmation
    setTimeout(() => setStatus("sent"), 1200);
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
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
          ? "Sending…"
          : status === "sent"
          ? "Sent!"
          : "Get Resources"}
      </button>
    </form>
  );
};

export default ZohoSubscribeForm;
