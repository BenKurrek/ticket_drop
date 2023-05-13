// src/config.js
const getConfig = (env) => {
  switch (env) {
    case 'production':
    case 'mainnet':
      return {
        networkId: 'mainnet',
        nodeUrl: 'https://rpc.mainnet.near.org',
        contractName: 'your-mainnet-contract-account.near',
        walletUrl: 'https://wallet.mainnet.near.org',
      };
    case 'testnet':
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        contractName: 'dev-1683948307888-90969577823649',
        walletUrl: 'https://wallet.testnet.near.org',
      };
    case 'development':
      return {
        networkId: 'default',
        nodeUrl: 'https://rpc.testnet.near.org',
        contractName: 'your-testnet-contract-account.testnet',
        walletUrl: 'https://wallet.testnet.near.org',
      };
    default:
      throw new Error('Unconfigured environment');
  }
};

export default getConfig;
