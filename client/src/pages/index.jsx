import Earth from "@/Components/CommonPages/Earth";
import MenuShape from "@/Components/CommonPages/Shape";
import Home from "@/Components/LandingPages/Home";
import Loading from "@/Components/LandingPages/Loading";
import Plans from "@/Components/LandingPages/Plans";
import Tagline from "@/Components/LandingPages/Tagline";
import Page2 from "@/Components/Plans/Page2";
import React from "react";

export default function index() {
  return (
    <div className="w-full h-full">
      <Home />
      <Tagline />
      {/* <Loading /> 
      <Page2/> */}
    </div>
  );
}
