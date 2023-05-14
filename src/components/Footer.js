import logo from '../assets/near_apac.png'
import tele from '../assets/telegram-nearapac.png'
import { FaFacebook, FaTwitter, FaTelegram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#9ADEFE] to-white text-gray-800 pt-40 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center pt-12 max-w-[1440px] w-[90%] mx-auto space-y-12 md:space-y-0">
        <div className="text-center md:text-left">
          <h2 className="font-bold text-xl">
            HCMC VIETNAM | SEP 8 - 12 <br /> THYSKYHALL CONVENTION
          </h2>
          <h3 className="py-2 text-xl">Tickets Available Soon</h3>

          <a
            href="https://nearapac.org/"
            className="z-10 flex"
          >
            <img src={logo} alt="logo" className="flex w-[50%] mx-auto items-center md:w-[70%] md:ml-0 pt-8" />
          </a>
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="font-bold text-lg">Join NearApac Vietnam
            For <span className="font-light text-sm">the fastest updates & upcoming news!</span></h3>
          <a
            href="https://t.me/near_apac"
            passHref
            className="flex space-x-2 z-10 py-4"
          >
            <img
              src={tele}
              width={140}
              height={140}
              alt="logo"
            />
          </a>
          <div className="flex text-[30px] space-x-4 text-cyan-500 pb-4">
            <a passHref href="https://www.facebook.com/nearapac" className="hover:text-gray-600">
              <FaFacebook />
            </a>
            <a passHref href="https://twitter.com/NearVietnamHub" className="hover:text-gray-600">
              <FaTwitter />
            </a>
            <a passHref href="https://t.me/near_apac" className="hover:text-gray-600">
              <FaTelegram />
            </a>
            <a passHref href="https://www.youtube.com/@VBIBlockchainAcademy" className="hover:text-gray-600">
              <FaYoutube />
            </a>
          </div>
        </div>
        <div className="hidden lg:flex flex-col items-start text-center px-20 space-y-2">
          <h1 className="font-bold text-xl">Navigation</h1>
          <a href="/#about" className="hover:text-cyan-500 cursor-pointer">
            About
          </a>
          <a href="/#contract" className="hover:text-cyan-500 cursor-pointer">
            Contract
          </a>
          <a href="/#FAQ" className="hover:text-cyan-500 cursor-pointer">
            FAQ
          </a>
          <a href="/#Privacy" className="hover:text-cyan-500 cursor-pointer">
            Privacy Policy
          </a>
          <a href="/Terms" className="hover:text-cyan-500 cursor-pointer">
            Terms of Use
          </a>
          <a href="/#Cookie" className="hover:text-cyan-500 cursor-pointer">
            Cookie
          </a>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto w-[90%] border-t border-white/40 mt-8 flex items-start justify-start text-left">
        <h1 className="text-gray-900 py-8 font-semibold text-center">
          © 2023 Copyright Near APAC. All Reserved.
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
