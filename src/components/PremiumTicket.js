import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWallet } from '../features/walletSlice';
import { motion } from 'framer-motion';

const CONTRACT_ID = process.env.REACT_APP_CONTRACT_ID

const Premium = () => {
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState("")
  const wallet = useSelector(selectWallet);
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 1, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  function handleAssertionError(errorMessage) {
    if (errorMessage.includes("This wallet has already purchased a ticket.")) {
      setResultMessage('You have already purchased a ticket.');
    } else if (errorMessage.includes("Not enough deposit for the ticket.")) {
      setResultMessage('Not enough deposit. Please add funds to your wallet.');
    } else if (errorMessage.includes("Ticket not available.")) {
      setResultMessage('The ticket is not available.');
    } else if (errorMessage.includes("Ticket sale limit reached.")) {
      setResultMessage('The ticket sale limit has been reached.');
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
        email: email ?  email  :  "",
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

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const popupVariants = {
    visible: { opacity: 1, y: 0, scale: 1 },
    hidden: { opacity: 0, y: -50, scale: 0.9 },
  };

  return (
    <motion.section
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="relative pt-8 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 max-w-[1440px] px-4 md:w-2/4 lg:w-3/4 mx-auto"
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
          <h1 className="font-bold text-2xl text-white text-center">General Admissions</h1>
          <h2 className="flex items-center justify-center">
            <div className="flex items-center">
              <span className="font-bold text-[30px]">$</span>
              <span className="font-bold text-[50px] flex items-center">0</span>
            </div>
            <div className="flex items-center">
              <span className="text-[14px]">,00</span>
            </div>
            <span className="text-[20px] px-4">-</span>
            <div className="flex items-center">
              <span className="font-bold text-[30px]">$</span>
              <span className="font-bold text-[50px] flex items-end">999</span>
            </div>
            <span className="text-[14px]">,00</span>
          </h2>
        </div>
        <div className="text-lg py-2 items-center justify-center">
          <ul className="px-4 py-2 space-y-4 list-disc items-center justify-center">
            <li>Access to exhibition hall</li>
            <li>Access to cocktail reception</li>
            <li>Access to small stages in convention hall</li>
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <button type="submit" onClick={togglePopup} className="px-8 py-3 bg-white text-gray-900 rounded-full hover:bg-gray-400 font-bold focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-200">
            Buy Ticket
          </button>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={backdropVariants}
              onClick={togglePopup}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="bg-white p-6 rounded-lg shadow-md z-20 backdrop-blur-md bg-opacity-80  text-gray-800 border border-gray-500/50 w-[90%] md:w-[70%] lg:w-[50%] py-12"
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
                    <h1 className="items items-start justify-start text-left semibold">Email</h1>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-md px-2 py-2 text-gray-800 border border-gray-300"
                    />
                  </div>


                  <div className="flex flex-col">
                    <h1 className="items items-start justify-start text-left semibold">Phone Number</h1>
                    <input
                      type="text"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      className="rounded-md px-2 py-2 text-gray-800 border border-gray-300"
                    />
                  </div>
                </form>

                <button type="submit" onClick={handleSubmit} className="flex w-full text-center items-center justify-center py-2 mt-8 bg-gradient-to-r from-cyan-300 to-blue-600 text-white font-md rounded-lg shadow hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50">
                  {loading ? 'Processing...' : 'Buy Ticket'}
                </button>
                {resultMessage && <p>{resultMessage}</p>}
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Premium;
