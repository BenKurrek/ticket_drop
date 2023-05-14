import { getPubFromSecret, getKeyInformation, getDropInformation } from "@keypom/core";
import React, { useState } from 'react'
import { useEffect } from "react";


const KeyInfo = ({ contractId, privKey, curUse, setCurUse, pubKey, setPubKey }) => {
  const [data, setData] = useState()
  // These functions will run anytime the component is re-rendered 
  useEffect(() => {
    async function getUsesRemaining(privKey) {
      let tempKey = await getPubFromSecret(privKey);
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
      var publicKey = await getPubFromSecret(privKey);
      var keyInfo = await getKeyInformation({ publicKey })
      let data = getDropInformation({
        dropId: keyInfo.drop_id,
        publicKey: publicKey,
        withKeys: true,
      });
      data.then((data) => { setData(data.fc.methods[1][0].args) })
    }
    getKeyinfo()
  }, [privKey])

  if (curUse === 1) {
    return (
      <div className="flex flex-col items-center">
        {data == "ELITE" &&
          <button
            className="mt-4 border bg-gradient-to-tr from-cyan-400 to-blue-700 text-white border-gray-600 px-4 py-2 rounded-xl hover:bg-gray-300 hover:border-b-4 hover:border-r-4 transition-all duration-300 font-medium"
          >
            {data} Ticket
          </button>
        }
        {data == "PREMIUM" &&
          <button
            className="mt-4 border bg-gradient-to-tr from-red-500 to-pink-800 text-white border-gray-600 px-4 py-2 rounded-xl hover:bg-gray-300 hover:border-b-4 hover:border-r-4 transition-all duration-300 font-medium"
          >
            {data} Ticket
          </button>
        }
      </div>
    )
  }
  else {
    console.log(curUse)
    return
  }

}

export default KeyInfo

