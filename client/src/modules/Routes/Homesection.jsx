import React from "react";


import Home from "../Pages/Home";
import Servcies from "../Pages/Services";
import StatsSection from "../Pages/StatsSection";
import LuxuryOverview from "../Pages/LuxuryOverview";
import Whychoose from "../Pages/Whychoose";
import UserFeedback from "../Pages/Reviews";
import OurBrands from "../Pages/OurBrands";
const Homesection = () => {
  return (
    <div>
      <Home />
      <Servcies/>
      <StatsSection/>
      <LuxuryOverview/>
      <Whychoose/>
      <UserFeedback/>
      <OurBrands/>
    </div>
  );
};

export default Homesection;
