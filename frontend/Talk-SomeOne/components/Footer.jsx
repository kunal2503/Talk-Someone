import React from "react";
import { FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-12 shadow-inner ">
      <div className="container mx-auto px-6 flex flex-col md:flex-col  justify-between items-center">
        <p className="text-sm md:text-base mb-2">&copy; {new Date().getFullYear()} TalkSomeOne. All rights reserved.</p>

        <div className="flex space-x-8 mt-5 md:mt-0">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 group transition-colors duration-300 hover:text-white"
          >
            <FaGithub
              size={22}
              className="transform group-hover:scale-110 transition-transform duration-300"
            />
            <span className="font-semibold tracking-wide group-hover:underline">
              GitHub
            </span>
          </a>

          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 group transition-colors duration-300 hover:text-blue-400"
          >
            <FaTwitter
              size={22}
              className="transform group-hover:scale-110 transition-transform duration-300"
            />
            <span className="font-semibold tracking-wide group-hover:underline">
              Twitter
            </span>
          </a>

          <a
            href="mailto:support@talksomeone.com"
            className="flex items-center space-x-2 group transition-colors duration-300 hover:text-red-400"
          >
            <FaEnvelope
              size={22}
              className="transform group-hover:scale-110 transition-transform duration-300"
            />
            <span className="font-semibold tracking-wide group-hover:underline">
              Contact
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
