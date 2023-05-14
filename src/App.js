import React, { useEffect } from "react";
import { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import * as nearAPI from "near-api-js";
import { initKeypom, formatLinkdropUrl } from '@keypom/core'
import QrCode from "./components/qrcode";
import KeyInfo from "./state/keyInfo";
import { Scanner } from "./components/scanner";
import Tickets from "./components/Ticket";
import Hero from "./components/Hero";
import Premium from "./components/PremiumTicket";
import { useDispatch } from "react-redux";
import { initWallet } from "./features/walletSlice";
import TicketOnwer from "./components/TicketOwner";
const { keyStores, connect } = nearAPI;

const NETWORK_ID = "testnet";

async function connectNear(privateKey, contractId) {
  const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();
  const connectionConfig = {
    networkId: NETWORK_ID,
    keyStore: myKeyStore,
    nodeUrl: `https://rpc.${NETWORK_ID}.near.org`,
    walletUrl: `https://wallet.${NETWORK_ID}.near.org`,
    helperUrl: `https://helper.${NETWORK_ID}.near.org`,
    explorerUrl: `https://explorer.${NETWORK_ID}.near.org`,
  };

  const nearConnection = await connect(connectionConfig);

  await initKeypom({
    near: nearConnection,
    network: NETWORK_ID,
    keypomContractId: contractId
  });
}

let contractId;
let privKey;
let qrText;
function setup() {
  // Setting contract id, priv key and link state variables.
  const urlSplit = window.location.href.split("/");

  if (urlSplit.length > 3) {
    contractId = urlSplit[3]
    privKey = urlSplit[4]
    qrText = `${contractId}/${privKey}`
  }
  if (contractId) {
    connectNear(contractId)
  }
}


setup()

function App() {
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const transactionHash = urlParams.get('transactionHashes');

  useEffect(() => {
    dispatch(
      initWallet({
        contractId: process.env.REACT_APP_CONTRACT_ID,
        network: "testnet",
      }),
    );
  }, []);

  const [curUse, setCurUse] = useState(0);
  const [pubKey, setPubKey] = useState("");

  const homepath = `/${contractId}/${privKey}`
  const scannerpath = `/${contractId}/scanner`


  // rendering stuff

  if (curUse === 1) {
    // QR code
    console.log("scenario 1, QR code")
    return (

      <div className="bg-white">
        <Routes>
          <Route path={scannerpath} element={<Scanner />} />
          <Route path={homepath} element={
            <section className="pt-20">
              <div className="text-center font-bold py-2 ">
                <h1>🎟️This is your ticket🔑</h1>
                <h4>Screenshot and show me at the door</h4>
              </div>
              <div className="flex items-center justify-center pb-2">
                <QrCode link={qrText}  />
              </div>
              <KeyInfo contractId={contractId} privKey={privKey} curUse={curUse} setCurUse={setCurUse} pubKey={pubKey} setPubKey={setPubKey} />
            </section>} />
        </Routes>
      </div>

    );
  }
  else if (curUse === 2) {
    // Direct user to claim POAP
    let link = formatLinkdropUrl({
      customURL: "https://testnet.mynearwallet.com/linkdrop/CONTRACT_ID/SECRET_KEY",
      secretKeys: privKey
    });
    return (

      <div className="bg-white">
        <Routes>
          <Route path={scannerpath} element={<Scanner />} />
          <Route path={homepath} element={
            <>
              <h1>You're all set! Enjoy the event</h1>
              <a href={link} target="_blank" rel="noopener noreferrer"><button className="onboard_button">Claim your POAP</button></a>
              <KeyInfo contractId={contractId} privKey={privKey} curUse={curUse} setCurUse={setCurUse} pubKey={pubKey} setPubKey={setPubKey} />
            </>} />
        </Routes>
      </div>
    );
  }
  else if (curUse === 0 && transactionHash) {
    return (
      <div className="bg-white text-gray-800 flex flex-col items-center justify-center text-center pt-20">
        <div className="text-center font-bold py-2 ">
          <h1>🎟️This is your ticket🔑</h1>
          <h4>Screenshot and show me at the door</h4>
        </div>
        <TicketOnwer/>
        <Routes>
          <Route path={homepath} element={"/"}></Route>
        </Routes>
      </div>
    );
  }

  else if (curUse === 0 && !contractId && !privKey) {
    // Event Landing Page
    return (
      <div className="bg-white text-white">
        <Hero />
        <Premium />
        <Tickets />
        <Routes>
          <Route path={homepath} element={"/"}></Route>
        </Routes>
      </div>
    );
  }

  else if (curUse === 0) {
    return (
      <div className="bg-white">
        <Routes>
          <Route path={scannerpath} element={<Scanner />} />
          <Route path={homepath} element={
            <div className="flex flex-col text-center items-center font-bold">
              <h1>Now that you have a wallet...</h1>
              <a href={"https://nearapac.org/"} target="_blank" rel="noopener noreferrer"><button className="onboard_button">Continue your journey into NEAR</button></a>
              <KeyInfo contractId={contractId} privKey={privKey} curUse={curUse} setCurUse={setCurUse} pubKey={pubKey} setPubKey={setPubKey} />
            </div>} />
        </Routes>
      </div>

    );
  }
}



export default App
// ReactDOM.render(<AppRouter />, document.getElementById("root"));
