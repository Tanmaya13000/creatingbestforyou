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
import HomePage4 from "@/Components/LandingPages/HomePage4/HomePage4";


export default function index() {
  return (
    <div className="w-full h-full">
      <Home />
      <Tagline />
      <Stickycards />
      <HomePage4 />
    </div>
  );
}
