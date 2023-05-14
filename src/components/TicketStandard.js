import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HOST = process.env.REACT_APP_HOST | "https://ticket-drop.vercel.app"

const TicketStandard = () => {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 1, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  console.log(HOST)

  return (
    <motion.section
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="pt-8 px-4 grid grid-cols-1 lg:grid-cols-5 gap-4  max-w-[1440px] md:w-[90%] mx-auto"
    >
      {/* Standard */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="flex text-black justify-center font-bold gap-4 text-white items-center rounded-full py-8 col-span-3 col-start-2 text-white"
      >
        <Link className="bg-gradient-to-r from-gray-700 to-black px-8 py-3 text-white hover:scale-105 transition-all duration-200 rounded-full" to={`https://ticket-drop.vercel.app/elite`}>ELITE TICKET</Link>
        <Link className="bg-gradient-to-r from-gray-700 to-black px-8 py-3 text-white hover:scale-105 transition-all duration-200 rounded-full" to={`https://ticket-drop.vercel.app/premium`}>PREMIUM TICKET</Link>
      </motion.div>
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="bg-[#222] shadow-xl shadow-gray-500/50 flex flex-col items-center justify-between rounded-2xl py-8 col-span-3 col-start-2 text-white"
      >
        <div>
          <h1 className="font-bold text-xl md:text-2xl text-gray-400">STANDARD</h1>
        </div>
        <div className="flex flex-col divide-y-[0.5px] divide-dashed divide-gray-200/50 text-[13px] md:text-[15px]">
          <span className="px-8 md:px-4 py-2"> - 2 Full days of conference with industry experts and joining booths and stages activities</span>
          <span className="px-8 md:px-4 py-2">
            - Join travel game to share prize pool 100 million VND
          </span>
          <span className="px-8 md:px-4 py-2">
            - Chance to upgrade to Elite ticket after completing quests
          </span>
        </div>

        <h2 className="flex items-center justify-center group relative">
          <div className="h-[8px] w-4/5 -rotate-12 bg-red-500 absolute" />
          <span className="font-bold text-[20px] md:text-[30px] ">$</span>
          <span className="font-bold text-[60px] md:text-[80px] flex items-center">0</span>
          <span className="text-[20px] md:text-[30px]">,00</span>
        </h2>
        <button className="mx-auto w-1/2 text-md mt-4 font-bold py-2 bg-gradient-to-r from-cyan-300 to-blue-800 rounded-full hover:scale-105 transition-all duration-200 border-2 border-white">
          Buy Tickets
        </button>
      </motion.div>
    </motion.section>
  );
};

export default TicketStandard
