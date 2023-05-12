import { motion } from "framer-motion";

const Premium = () => {
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
      className="pt-8 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 max-w-[1440px] w-3/4 mx-auto"
    >
      {/* Standard */}
      {/* PREMIUM TICKET */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="px-4 lg:col-start-2 bg-gradient-to-br from-[#9750FD] via-[#45A3C3] to-[#4AF986] flex flex-col items-center justify-center rounded-3xl py-8 divide-y-[0.5px] divide-dashed divide-gray-200/50"
      >
        <div className="">
          <h1 className="font-bold text-2xl text-white text-center">
            General Admissions
          </h1>
          <h2 className="flex items-center justify-center">
            <div className="flex items-center">
              <span className="font-bold text-[30px]">$</span>
              <span className="font-bold text-[50px] flex items-center">
                0
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-[14px]">,00</span>
            </div>
            <span className="text-[20px] px-4">-</span>
            <div className="flex items-center">
              <span className="font-bold text-[30px]">$</span>
              <span className="font-bold text-[50px] flex items-end">
                999
              </span>
            </div>
            <span className="text-[14px]">,00</span>
          </h2>
        </div>
        <div className="text-lg py-2 items-center justify-center">
          <ul className="px-4 py-2 space-y-4 list-disc items-center justify-center">
            <li>
              Access to exhibition hall
            </li >
            <li>
              Access to cocktail reception
            </li>
            <li>
              Access to small stages in convention hall
            </li>
          </ul>
        </div>

        <button className="mx-auto w-1/2 text-md font-bold py-2 bg-white text-gray-800 rounded-full hover:scale-105 transition-all duration-200">
          Buy Premium
        </button>
      </motion.div>
    </motion.section>
  );
};

export default Premium;
