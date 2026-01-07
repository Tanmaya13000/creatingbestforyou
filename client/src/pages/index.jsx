import Earth from "@/Components/CommonPages/Earth";
import MenuShape from "@/Components/CommonPages/Shape";
import Home from "@/Components/LandingPages/Home";
import Loading from "@/Components/LandingPages/Loading";
import Plans from "@/Components/LandingPages/Plans";
import Tagline from "@/Components/LandingPages/Tagline";
import Page2 from "@/Components/Plans/Page2";
import React from "react";
import Shape from "@/Components/CommonPages/Shape.jsx"
import Stickycards from "@/Components/LandingPages/Stickycards/Stickycards.jsx"


export default function index() {
  return (
    <div className="w-full h-full">
      <Home />
      <Tagline />
      <Stickycards />
    </div>
  );
}
