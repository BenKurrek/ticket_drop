import { toast } from "react-toastify"

const keypom = require("@keypom/core")
const {
  getDropInformation,
  getPubFromSecret,
  getKeyInformation,
  hashPassword,
  claim
} = keypom

export async function allowEntry({ privKey, basePassword }) {
  const already = () => toast("Key has already been scanned. Admission denied")
  const failed = () => toast("Claim has failed, check password")
  try {
    var info;
    // Check 1: Key existence
    var publicKey = await getPubFromSecret(privKey)
    var keyInfo = await getKeyInformation({ publicKey })
    // If key does not exist, the user should not be admitted
    if (keyInfo == null) {
      console.log(`Key does not exist. Admission denied`);
      return false;
    }

    var curUse = keyInfo.cur_key_use

    // Ticket was already scanned
    if (curUse !== 1) {
      already()
      return false;
    }

    // Create password using base + pubkey + key use as string
    let passwordForClaim = await hashPassword(basePassword + publicKey + curUse.toString())

    await getDropInformation({
      dropId: keyInfo.drop_id,
      publicKey: publicKey,
      withKeys: true,
    }).then((res) => {
      info = res.fc.methods[1][0].args
    })
    const success = () => toast(`${info}`)

    // Claim with created password
    await claim({
      secretKey: privKey,
      password: passwordForClaim
    }).then(() => success())

    // Check 3: Check if claim was successful by validating that curUse incremented
    keyInfo = await getKeyInformation({ publicKey })

    if (keyInfo.cur_key_use !== 2) {
      failed()
      return false;
    }
  } catch (err) {
    console.log(`Unknown Error: ${err}. Admission denied`)
    return false;
  }

  return true
}
