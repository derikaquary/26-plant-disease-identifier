"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdHome } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { FaLeaf } from "react-icons/fa";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={navRef}
      className="absolute bottom-5 right-5 flex flex-col items-end gap-[5px]">
      {isOpen && (
        <div className="rounded-xl bg-white/20 backdrop-blur-md w-[50px] flex flex-col gap-3 items-center justify-center px-3 py-3">
          <Link href="/plant_analyzer">
            <FaLeaf color="white" size={40} />
          </Link>
          <Link href="/">
            <MdHome color="white" size={40} />
          </Link>
          <Link href="/about">
            <FaInfoCircle color="white" size={40} />
          </Link>
        </div>
      )}
      <BsThreeDotsVertical
        onClick={() => setIsOpen(!isOpen)}
        size={30}
        color="white"
      />
    </div>
  );
}

export default Navigation;
