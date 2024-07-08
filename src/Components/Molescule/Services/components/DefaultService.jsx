import React from "react";
import { motion } from "framer-motion";
import petCover from "assets/images/pet-cover.webp";

export default function DefaultService() {
  return (
    <div className="flex justify-center items-center flex-row space-x-4">
      <div>
        <img
          src={'https://st4.depositphotos.com/1606449/29590/i/450/depositphotos_295901926-stock-photo-dogs-and-cats-looking-up.jpg'}
          alt="Pet Cover"
          className="w-full hidden md:block"
        />
      </div>
    </div>
  );
}
