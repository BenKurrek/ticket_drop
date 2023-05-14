require('dotenv').config()
const path = require("path");
const homedir = require("os").homedir();
const { UnencryptedFileSystemKeyStore } = require("@near-js/keystores-node");
const { Account } = require('@near-js/accounts');
const { Near } = require("@near-js/wallet-account");

const keypom = require("@keypom/core");
const {
  initKeypom,
  getEnv,
  createDrop,
  createNFTSeries,
  formatLinkdropUrl,
} = keypom

// Change this to your account ID
const FUNDER_ACCOUNT_ID = "benjiman.testnet";
const NETWORK_ID = "testnet";
async function createTickDrop() {
  // Initiate connection to the NEAR blockchain.
  const CREDENTIALS_DIR = '.near-credentials';
  const credentialsPath =  path.join(homedir, CREDENTIALS_DIR);

  let keyStore = new UnencryptedFileSystemKeyStore(credentialsPath);  

  let nearConfig = {
      networkId: NETWORK_ID,
      keyStore: keyStore,
      nodeUrl: `https://rpc.${NETWORK_ID}.near.org`,
      walletUrl: `https://wallet.${NETWORK_ID}.near.org`,
      helperUrl: `https://helper.${NETWORK_ID}.near.org`,
      explorerUrl: `https://explorer.${NETWORK_ID}.near.org`,
  };  

  let near = new Near(nearConfig);
  const fundingAccount = new Account(near.connection, FUNDER_ACCOUNT_ID);

  // If a NEAR connection is not passed in and is not already running, initKeypom will create a new connection
  // Here we are connecting to the testnet network
  await initKeypom({
    near,
    network: NETWORK_ID,
  });

  // Create drop with 10 keys and 2 key uses each
  let { keys, dropId } = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    config: {
      usesPerKey: 2
    },
    depositPerUseNEAR: "0",
    basePassword: "nearapac-gfi",
    passwordProtectedUses: [1],
    fcData: {
      methods: [
        null,
        [
          {
            receiverId: `nft-v2.keypom.${NETWORK_ID}`,
            methodName: "nft_mint",
            args: "ELITE",
            dropIdField: "mint_id",
            accountIdField: "receiver_id",
          }
        ],
      ]
    }
  })

  await createNFTSeries({
    account: fundingAccount,
    dropId: dropId,
    metadata: {
      title: "Moon NFT Ticket!",
      description: "A cool NFT POAP for the best dog in the world.",
      media: "bafybeibwhlfvlytmttpcofahkukuzh24ckcamklia3vimzd4vkgnydy7nq",
      copies: 30
    }
  });

  const { contractId: KEYPOM_CONTRACT } = getEnv()
  let tickets = formatLinkdropUrl({
    customURL: "http://localhost:3000/CONTRACT_ID/SECRET_KEY",
    secretKeys: keys.secretKeys,
    contractId: KEYPOM_CONTRACT,
  })
  console.log(`
    Ticket Links: 
    
    ${tickets}
    
    `)

  return keys
}

createTickDrop()

module.exports = {
  createTickDrop
}
