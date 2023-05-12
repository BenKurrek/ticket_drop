import logo from '../assets/near_apac.png'
import tele from '../assets/telegram-nearapac.png'
import { FaFacebook, FaTwitter, FaTelegram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-cyan-200 to-gray-100 text-gray-800 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center pt-12">
        <div>
          <h2 className="font-bold text-xl">
            HCMC VIETNAM | SEP 8 - 12 <br /> THYSKYHALL CONVENTION
          </h2>
          <h3 className="py-2 text-xl">Tickets Available Soon</h3>

          <a
            href="/"
            className="flex space-x-2 z-10 flex items-center justify-center py-4"
          >
            <img src={logo} width={180} height={100} alt="logo" />
          </a>
        </div>
        <div>
          <h3 className="font-bold text-lg">Join NearApac Vietnam</h3>
          <h4>For the fastest updates & upcoming news!</h4>

          <a
            href="https://t.me/near_apac"
            passHref
            className="flex space-x-2 z-10 flex items-center justify-center py-4"
          >
            <img
              src={tele}
              width={140}
              height={140}
              alt="logo"
            />
          </a>
          <div className="flex items-center justify-center text-[30px] space-x-4 text-cyan-500 pb-4">
            <a passHref href="https://www.facebook.com/nearapac">
              <FaFacebook />
            </a>
            <a passHref href="https://twitter.com/NearVietnamHub">
              <FaTwitter />
            </a>
            <a passHref href="https://t.me/near_apac">
              <FaTelegram />
            </a>
            <a passHref href="https://www.youtube.com/@VBIBlockchainAcademy">
              <FaYoutube />
            </a>
          </div>
        </div>
        <div className="hidden lg:flex flex-col items-center text-left">
          <h1 className="font-bold text-xl">Navigation</h1>
          <a href="#" className="hover:text-cyan-500 cursor-pointer">
            About
          </a>
          <a href="#" className="hover:text-cyan-500 cursor-pointer">
            Contract
          </a>
          <a href="#" className="hover:text-cyan-500 cursor-pointer">
            FAQ
          </a>
          <a href="#" className="hover:text-cyan-500 cursor-pointer">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-cyan-500 cursor-pointer">
            Terms of Use
          </a>
          <a href="#" className="hover:text-cyan-500 cursor-pointer">
            Cookie
          </a>
        </div>
      </div>
      <div className=" border-t border-white flex items-center justify-center">
        <h1 className="text-gray-900 py-4 font-semibold text-center">
          © 2023 Copyright Near APAC. All Reserved.
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
