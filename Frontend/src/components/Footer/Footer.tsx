import Link from "next/link";
import React from "react";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import { FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between px-4 py-12 mx-auto max-w-7xl md:flex-row">
      <p className="mb-8 text-sm text-center text-gray-700 md:text-left md:mb-0">
      Turning coffee into code ☕️ | Follow me.
      </p>
      <div className="flex items-center space-x-6">
        <Link href="https://x.com/Sid060402">
          <FaXTwitter />
        </Link>
        <Link href="https://github.com/Siddhantg2002">
          <FaGithub />
        </Link>
        <Link href="https://www.linkedin.com/in/siddhant-gupta-885384239/">
          <FaLinkedin />
        </Link>
        <Link href="https://www.instagram.com/siddhant.xo/">
          <FaInstagram />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
