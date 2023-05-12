import { getPubFromSecret, getKeyInformation, getDropInformation } from "@keypom/core";
import React, { useState } from 'react'
import { useEffect } from "react";


const KeyInfo = ({ contractId, privKey, curUse, setCurUse, pubKey, setPubKey }) => {
  const [data, setData] = useState()
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

  useEffect(() => {
    async function getKeyinfo() {
      var publicKey = await getPubFromSecret(privKey)
      var keyInfo = await getKeyInformation({ publicKey })
      let data = getDropInformation({
        dropId: keyInfo.drop_id,
        publicKey: publicKey,
        withKeys: true,
      });
      data.then((data) => {setData(data.fc.methods[1][0].args)})
    }
    getKeyinfo()
  },[privKey])

  if (curUse == 1) {
    return (
      <div>
        <div>Public Key: {pubKey}</div>
        <div>Current Key Use: {curUse}</div>
        <div>{data}</div>
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

