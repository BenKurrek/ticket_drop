import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectWallet } from "../features/walletSlice";

const CONTRACT_ID = process.env.REACT_APP_CONTRACT_ID

const TicketElite = () => {
  const wallet = useSelector(selectWallet);
  const [ticketLink, setTicketLink] = useState("")
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState("")
  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 1, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const [isEliteOpen, setIsEliteOpen] = useState(false);

  const toggleElitePopup = () => {
    setIsEliteOpen(!isEliteOpen);
  };

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const popupVariants = {
    visible: { opacity: 1, y: 0, scale: 1 },
    hidden: { opacity: 0, y: -50, scale: 0.9 },
  };


  function handleAssertionError(errorMessage) {
    if (errorMessage.includes("This wallet has already purchased a ticket.")) {
      setResultMessage('You have already purchased a ticket.');
    } else if (errorMessage.includes("Not enough deposit for the ticket.")) {
      setResultMessage('Not enough deposit. Please add funds to your wallet.');
    } else if (errorMessage.includes("Ticket not available.")) {
      setResultMessage('The ticket is not available.');
    } else if (errorMessage.includes("Ticket sale limit reached.")) {
      setResultMessage('The ticket sale limit has been reached.');
    } else if (errorMessage.includes("Error: The first argument must be one of type string, Buffer")) {
      setResultMessage("Success! Please Reload The Browser!");
    } else {
      setResultMessage(errorMessage);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!wallet) {
        // Wallet not initialized, call initWallet first
        console.log("Error")
      }

      setLoading(true); // Set loading state to true during payment processing

      const args = {
        email: email ? email : "",
        telephone: telephone ? telephone : "",
      }

      const transaction = await wallet.callMethod({
        contractId: CONTRACT_ID,
        method: 'purchase_elite_ticket',
        args,
        deposit: 0
      })

      // Handle the result or perform any necessary actions
      // Retrieve transaction result
      const result = await wallet.getTransactionResult(transaction.transaction.hash);
      setResultMessage('Ticket purchased successfully. Result: ' + result);
      // Payment successful
    } catch (error) {
      handleAssertionError("Error: " + error.message)
    } finally {
      setLoading(false); // Set loading state back to false after payment processing is completed
    }

  }
  return (
    <motion.section
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="pt-8 px-4 grid grid-cols-1 lg:grid-cols-5 gap-4  max-w-[1440px] md:w-[90%] mx-auto"
    >
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="flex text-black justify-center font-bold gap-4 text-white items-center rounded-full py-8 col-span-3 col-start-2 text-white"
      >
        <Link className="bg-gradient-to-r from-gray-700 to-black px-8 py-3 text-white hover:scale-105 transition-all duration-200 rounded-full" to={`${process.env.REACT_APP_HOST}/standard`}>STANDARD TICKET</Link>
        <Link className="bg-gradient-to-r from-gray-700 to-black px-8 py-3 text-white hover:scale-105 transition-all duration-200 rounded-full" to={`${process.env.REACT_APP_HOST}/premium`}>PREMIUM TICKET</Link>
      </motion.div>
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="bg-[#222] col-span-3 col-start-2 shadow-xl shadow-cyan-400/80 items-center justify-center rounded-2xl py-8 flex flex-col text-white"
      >

        <div className="">
          <h1 className="font-bold text-xl md:text-2xl text-gray-400 text-center">
            ELITE TICKET <br />
            (PLASTIC/BRACELET)
          </h1>
        </div>
        <div className="flex flex-col divide-y-[0.5px] divide-dashed divide-gray-200/50 text-[13px] md:text-[15px]">
          <span className="px-8 md:px-4 py-2"> - 2 Full days of conference with industry experts and joining booths and stages activities</span>
          <span className="px-8 md:px-4 py-2">
            - Receive Standard Event Gift set from NEAR APAC 2023.
          </span>
          <span className="px-8 md:px-4 py-2">
            - Free food and beverage during the conference
          </span>
          <span className="px-8 md:px-4 py-2">
            - Access in some exclusive sessions during the conference.
          </span>
          <span className="px-8 md:px-4 py-2">
            - Join all games during the conference to share the the prize pool of 300 million VND
          </span>
        </div>

        <h2 className="flex items-center justify-center relative">
          <div className="h-[8px] w-4/5 -rotate-12 bg-red-500 absolute" />
          <div className="rotate-[20deg] right-0 font-bold top-3 px-4 py-1 bg-yellow-500 absolute">FREE NOW</div>
          <div className="rotate-[20deg] animate-ping right-0 font-bold top-3 px-4 py-1 bg-yellow-500 absolute">FREE NOW</div>
          <span className="font-bold text-[20px] md:text-[30px]">$</span>
          <span className="font-bold text-[60px] md:text-[80px] flex items-center">39</span>
          <span className="text-[30px]">,00</span>
        </h2>
        <button onClick={toggleElitePopup} className="mt-4 mx-auto w-2/4 text-md font-bold py-2 bg-gradient-to-r from-cyan-300 to-blue-800 rounded-full hover:scale-105 transition-all duration-200 border-2 border-white">
          Get Ticket
        </button>

        {isEliteOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            onClick={toggleElitePopup}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md z-20 backdrop-blur-md bg-opacity-80  text-gray-800 border border-gray-500/50 w-[90%] md:w-[50%] lg:w-[40%] py-4"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={popupVariants}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSubmit} className="flex flex-col space-y-2 ">
                <h1 className="flex items-center text-center justify-center font-bold text-2xl text-gray-600">Elite Ticket</h1>
                <div className="flex flex-col">
                  <h1 className="items items-start justify-start text-left semibold text-sm">Email</h1>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-md px-4 py-2 text-gray-800 border border-gray-300"
                  />
                </div>


                <div className="flex flex-col">
                  <h1 className="items items-start justify-start text-left semibold text-sm">Phone Number</h1>
                  <input
                    type="text"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    className="rounded-md px-4 py-2 text-gray-800 border border-gray-300"
                  />
                </div>
              </form>

              <button type="submit" onClick={handleSubmit} className="flex w-1/2 mx-auto text-center items-center justify-center py-2 mt-8 bg-gradient-to-r from-cyan-300 to-blue-600 text-white font-md rounded-lg shadow hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50">
                {loading ? 'Processing...' : 'Buy Ticket'}
              </button>
              <div className="flex items-center text-center justify-center font-semibold mt-6">
                {resultMessage && <p>{resultMessage}</p>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  );
};


export default TicketElite
