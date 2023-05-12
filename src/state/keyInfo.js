import { getPubFromSecret, getKeyInformation } from "keypom-js";
import React from 'react'
import { useEffect } from "react";


const KeyInfo = ({ contractId, privKey, curUse, setCurUse, pubKey, setPubKey }) => {
  // These functions will run anytime the component is re-rendered 
  useEffect(() => {
    async function getUsesRemaining(privKey) {
      let tempKey = await getPubFromSecret(privKey)
      setPubKey(tempKey)
      const resKeyInfo = await getKeyInformation({ publicKey: tempKey })
      if (resKeyInfo) {
        setCurUse(resKeyInfo.cur_key_use)
      } else {
        setCurUse(0)
      }
      return tempKey
    }
    getUsesRemaining(privKey)
  }, [privKey]);

  if (curUse == 1) {
    return (
      <div>
        <div>Public Key: {pubKey}</div>
        <div>Current Key Use: {curUse}</div>
        <h1></h1>
      </div>
    )
  }
  else {
    console.log(curUse)
    return
  }

}

export default KeyInfo

