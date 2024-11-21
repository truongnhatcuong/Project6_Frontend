import BestSeller from "@/components/BestSeller";
import Hero from "@/components/Hero";
import LatestCollection from "@/components/LatestCollection";
import NewLetterBox from "@/components/NewLetterBox";
import OurPolicy from "@/components/OurPolicy";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewLetterBox />
    </div>
  );
};

export default page;
