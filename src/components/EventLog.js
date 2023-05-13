import React, { useEffect, useState } from 'react';
import { connect, keyStores } from 'near-api-js';

const ContractEventLogs = ({ contractId }) => {
  const [eventLogs, setEventLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("Contrct Log")

  useEffect(() => {
    const getContractEventLogs = async () => {
      const nearConfig = {
        networkId: 'testnet', // Replace with your desired network ID
        nodeUrl: 'https://rpc.testnet.near.org', // Replace with the URL of the NEAR RPC node
        deps: {
          keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        },
      };

      const near = await connect(nearConfig);
      const provider = near.connection.provider;

      try {
        // Get the list of block heights for the contract
        const blockHeights = await provider.experimental_blockHistoriesByAccount(contractId);

        // Fetch the event logs from each block
        const logs = [];

        for (const { height } of blockHeights) {
          const { result } = await provider.viewRaw({
            method_name: 'query',
            args: {
              request_type: 'EXPERIMENTAL_EVENT',
              block_height: height,
              account_id: contractId,
              event_type: 'event:', // Change to your desired event prefix
              batch_size: 1000, // Adjust the batch size as needed
            },
          });

          logs.push(...result);
        }

        setEventLogs(logs);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    getContractEventLogs();
  }, [contractId]);

  return (
    <div>
      <h2>Contract Event Logs</h2>
      {loading ? (
        <p>Loading event logs...</p>
      ) : (
        <ul>
          {eventLogs.map((log, index) => (
            <li key={index}>{JSON.stringify(log)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContractEventLogs;
