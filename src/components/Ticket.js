import { motion } from "framer-motion";

const Tickets = () => {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 1, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <motion.section
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="pt-8 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  max-w-[1440px] md:w-3/4 mx-auto"
    >
      {/* Standard */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="bg-[#222] flex flex-col items-center justify-between rounded-md py-8 "
      >
        <div>
          <h1 className="font-bold text-xl md:text-2xl text-gray-400">STANDARD</h1>
          <h2 className="flex items-center justify-center">
            <span className="font-bold text-[20px] md:text-[30px]">$</span>
            <span className="font-bold text-[60px] md:text-[80px] flex items-center">0</span>
            <span className="text-[20px] md:text-[30px]">,00</span>
          </h2>
        </div>
        <div className="flex flex-col divide-y-[0.5px] divide-dashed divide-gray-200/50 text-[15px] md:text-lg">
          <span className="px-4 py-2"> - 2 Full days of event</span>
          <span className="px-4 py-2">
            - Full acess to all event activities (exclude the passport game)
          </span>
          <span className="px-4 py-2">
            - Join travel game to share prize pool 100 mollion VND
          </span>
          <span className="px-4 py-2">
            Bonus: IF: <br />Complete Quest <br />
            Upgrade to Elite ticket
          </span>
        </div>
        <button className="mx-auto w-3/4 text-md font-bold py-2 bg-gradient-to-r from-cyan-300 to-blue-800 rounded-md hover:scale-105 transition-all duration-200">
          Buy Tickets
        </button>
      </motion.div>

      {/* Elite */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="bg-[#222] flex flex-col items-center justify-between rounded-md py-8"
      >
        <div>
          <h1 className="font-bold text-xl md:text-2xl text-gray-400 text-center">
            STANDARD <br />
            (PLASTIC/BRACELET)
          </h1>
          <h2 className="flex items-center justify-center line-through">
            <span className="font-bold text-[20px] md:text-[30px]">$</span>
            <span className="font-bold text-[60px] md:text-[80px] flex items-center">39</span>
            <span className="text-[30px]">,00</span>
          </h2>
        </div>
        <div className="flex flex-col divide-y-[0.5px] divide-dashed divide-gray-200/50 text-[15px] md:text-lg">
          <span className="px-4 py-2"> - 2 Full days of event</span>
          <span className="px-4 py-2">
            - Receive Standard Event Gift set from NEAR APAC 2023.
          </span>
          <span className="px-4 py-2">
            - Full acess to all event activities
          </span>
          <span className="px-4 py-2">
            - Free tea-break full (Finger food and Beverage)
          </span>
          <span className="px-4 py-2">
            - Join lucky draw game to share the the prize pool 300 million VND
          </span>
        </div>
        <button className="mx-auto w-3/4 text-md font-bold py-2 bg-gradient-to-r from-cyan-300 to-blue-800 rounded-md hover:scale-105 transition-all duration-200">
          Buy Tickets
        </button>
      </motion.div>

      {/* PREMIUM TICKET */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-tr md:col-span-2 lg:col-span-1 from-[#30CFE5] to-[#0C4EAD] flex flex-col items-center justify-center rounded-md py-8"
      >
        <div>
          <h1 className="font-bold text-2xl text-white text-center">
            PREMIUM TICKET{" "}
          </h1>
          <h2 className="flex items-center justify-center">
            <span className="font-bold text-[20px] md:text-[30px]">$</span>
            <span className="font-bold text-[60px] md:text-[80px] flex items-center">
              999
            </span>
            <span className="text-[20px] md:text-[30px]">,00</span>
          </h2>
        </div>
        <div className="flex flex-col divide-y-[0.5px] divide-dashed divide-gray-200/50 text-[15px] md:text-lg">
          <span className="px-4 py-2">- 2 Full days of event</span>
          <span className="px-4 py-2">
            - Full access to all event activities
          </span>
          <span className="px-4 py-2">
            - Full access zone (VVIP Networking - VVIP Relax lounge - Matching
            zone)
          </span>
          <span className="px-4 py-2">
            - Join VVIP Opening party (1 day before main event)
          </span>
          <span className="px-4 py-2">- Join VVIP After party</span>
          <span className="px-4 py-2">
            - Free 2 day VIP Lunch at event (With Tickets)
          </span>
          <span className="px-4 py-2">
            - Free F&B (Snacks - Soft drink/Water)
          </span>
          <span className="px-4 py-2">
            - Receive Premium Event Gift set from NEAR APAC 2023
          </span>
          <span className="px-4 py-2">
            – Join all of games to share the the prize pool 300 million VND
          </span>
        </div>

        <button className="mx-auto w-3/4 text-md font-bold py-2 bg-white text-gray-800 rounded-md hover:scale-105 transition-all duration-200">
          Buy Tickets
        </button>
      </motion.div>
    </motion.section>
  );
};

export default Tickets;
