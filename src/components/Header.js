import { motion } from "framer-motion";
import logo from '../assets/near_apac.png'
import ConnectButton from "./ConnectButton";

const Header = () => {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="bg-white py-2 shadow-b shadow-2xl shadow-blue-300"
    >
      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-5 gap-x-4 max-w-[1440px] mx-auto lg:w-[90%] px-2 py-2 z-10"
      >
        {/* Left */}
        <motion.div
          variants={itemVariants}
          className="flex space-x-8 items-center justify-start"
        >
          <a href="https://nearapac.org/" className="flex items-center space-x-2 z-10">
            <img src={logo} alt="logo" className="" width={250} height={90}/>
          </a>
        </motion.div>
        <ul className="col-span-3 hidden lg:flex text-gray-800 font-bold space-x-4 justify-between items-center">
          <a href="https://nearapac.org/" className="hover:text-cyan-500">
            Why attend
          </a>
          <a href="https://nearapac.org/" className="hover:text-cyan-500">
            Agenda
          </a>
          <a href="https://nearapac.org/" className="hover:text-cyan-500">
            Speakers
          </a>
          <a href="https://nearapac.org/" className="hover:text-cyan-500">
            Partners
          </a>
          <a href="https://nearapac.org/" className="hover:text-cyan-500">
            Hackfest
          </a>
          <a href="https://nearapac.org/" className="hover:text-cyan-500">
            Get involed
          </a>
          <a href="https://nearapac.org/" className="hover:text-cyan-500">
            About
          </a>
        </ul>

        {/* Right */}
        <div className="flex space-x-4 items-center justify-end">
          <ConnectButton />
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
