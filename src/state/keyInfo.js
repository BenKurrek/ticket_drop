import { getPubFromSecret, getKeyInformation, getDropInformation } from "@keypom/core";
import React, { useState } from 'react'
import { useEffect } from "react";


const KeyInfo = ({ contractId, privKey, curUse, setCurUse, pubKey, setPubKey }) => {
  const [data, setData] = useState()
  // These functions will run anytime the component is re-rendered 
  useEffect(() => {
    async function getUsesRemaining(privKey) {
      let tempKey = getPubFromSecret(privKey);
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
      var publicKey = getPubFromSecret(privKey);
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

  if (curUse === 1) {
    return (
      <div className="flex flex-col items-center">
        <button className="px-8 py-2 bg-gradient-to-r from-cyan-300 to-cyan-300 text-gray-700 rounded-2xl">
          <h1 className="text-xl font-bold">{data} TICKET</h1>
        </button>
      </div>
    )
  }
  else {
    console.log(curUse)
    return
  }

}

export default KeyInfo

