"use client";
import React, { useState } from "react";
import SideMenuButton from "./SideMenuButton";
import SideMenuNav from "./SideMenuNav";
import { motion } from "framer-motion";

export default function SideMenuWrapper() {
  const [isActive, setIsActive] = useState(false);

  const menu = {
    open: {
      width: "480px",
      height: "450px",
      top: "-25px",
      right: "-25px",
      transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
    },

    closed: {
      width: "125px",
      height: "50px",
      top: "0px",
      right: "0px",
      transition: {
        duration: 0.75,
        delay: 0.35,
        type: "tween",
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <>
      <motion.div
        variants={menu}
        animate={isActive ? "open" : "closed"}
        initial="closed"
        className={`w-[480px] h-[450px] bg-primary-500 relative rounded-3xl`}
      >
        {isActive && <SideMenuNav/>}
      </motion.div>
      <SideMenuButton
        isActive={isActive}
        toggleMenu={() => setIsActive(!isActive)}
      />
    </>
  );
}
