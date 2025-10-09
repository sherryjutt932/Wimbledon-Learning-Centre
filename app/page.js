import AboutUs from "@/components/AboutUs";
import Enquiry from "@/components/Enquiry";
import Hero from "@/components/Hero";
import Mattsapp from "@/components/Mattsapp";
import Portfolios from "@/components/Portfolios";
import Ressources from "@/components/Ressources";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <Mattsapp />
      <Ressources />
      <Portfolios />
      <Enquiry />
    </>
  );
}
