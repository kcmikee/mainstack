import {
  ProductIcon,
  ProductIcon2,
  ProductIcon3,
  ProductIcon4,
} from "@/constants";
import Image from "next/image";
import React from "react";

function SideOptions() {
  const icons = [ProductIcon, ProductIcon2, ProductIcon3, ProductIcon4];
  return (
    <div className="sticky  top-3/7 left-4 inline-block p-1 items-start shadow-AppBar rounded-full bg-white h-min">
      {icons.map((icon, i) => (
        <div key={i} className="p-2 grayscale hover:grayscale-0 cursor-pointer">
          <Image src={icon} alt="side-nav" width={24} height={24} />
        </div>
      ))}
    </div>
  );
}

export default SideOptions;
