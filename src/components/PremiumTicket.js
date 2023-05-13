import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectWallet } from '../features/walletSlice';
import { motion } from 'framer-motion'; import { useRoutes } from 'react-router-dom';

const Premium = () => {
  const [couponCode, setCouponCode] = useState('');
  const [amount, setAmount] = useState(20)
  const wallet = useSelector(selectWallet);
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 1, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const dispatch = useDispatch();
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

      const transaction = await wallet.callMethod({
        contractId: wallet.createAccessKeyFor,
        method: 'purchase_ticket',
        args: { couponCode , amount},
        deposit: amount
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
      className="pt-8 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 max-w-[1440px] px-4 md:w-2/4 lg:w-3/4 mx-auto"
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
          <form onSubmit={handleSubmit}>
            <button type="submit" disabled={loading} className="mx-auto w-3/4 text-md font-bold py-2 bg-white text-gray-800 rounded-md hover:scale-105 transition-all duration-200 my-3">
              {loading ? 'Processing...' : 'Buy Ticket'}
            </button>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="rounded-md px-2 py-2 text-gray-800"
            />

            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount code"
              className="rounded-md px-2 py-2 text-gray-800"
            />
          </form>
          {resultMessage && <p>{resultMessage}</p>}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Premium;
