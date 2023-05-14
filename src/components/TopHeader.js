import React from "react";
import { motion } from "framer-motion";

const HeaderTop = () => {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="bg-[#222222] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      <div className="max-w-[1440px] mx-auto w-full lg:w-[90%] px-3 text-md py-1 font-light leading-6 tracking-wider">
        <motion.ul
          className="flex justify-end space-x-2 items-center text-center"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.li className="" variants={itemVariants}>
            <a href="https://beta.nearapac.org/travel-guide/" className="">
              Travel Guide
            </a>
          </motion.li>
          <p>|</p>
          <motion.li className="" variants={itemVariants}>
            <a href="https://beta.nearapac.org/contact/">Contact</a>
          </motion.li>
        </motion.ul>
      </div>
    </motion.div>
  );
};

export default HeaderTop;
