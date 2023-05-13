import { motion } from "framer-motion";

const Hero = ({children}) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="relative flex flex-col items-center justify-center max-w-[1440px] mx-auto text-gray-700 pt-8 px-2"
    >
      <h1 className="font-bold text-2xl ">{children}</h1>
      {/* <div className="flex font-bold text-xl pt-8">
        <button className="bg-gray-300/70 px-4 py-6 rounded-t-3xl">
          BUY TICKETS WITH TOKEN
        </button>
        <button className="bg-blue-400 text-white px-4 py-6 rounded-t-3xl">
          BUY TICKETS WITH FIAT/VISA
        </button>
      </div> */}
    </motion.section>
  );
};

export default Hero;
