import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccountId, selectIsLoading, selectWallet } from "../features/walletSlice";

const contract_id = process.env.REACT_APP_CONTRACT_ID



function ConnectWalletButton() {
  const wallet = useSelector(selectWallet);
  const account = useSelector(selectAccountId)
  // eslint-disable-next-line
  const [data, setData] = useState([]);
  const [walletReady, setWalletready] = useState(false);
  const [ticket, setTicket] = useState(false);

  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (!isLoading && wallet) {
      setWalletready(true);
    }
  }, [isLoading, wallet]);

  useEffect(() => {
    const getData = async () => {
      if (!wallet && !account) {
        console.error("Wallet is not initialized");
        return;
      }
      const result = await wallet.viewMethod({
        contractId: contract_id,
        method: "get_ticket_links_by_buyer",
        args: {
          account_id: `${account}`
        }
      })
      if (result) {
        if (Array.isArray(result)) {
          setData(result);
        } else {
          const resultArray = Object.entries(result).map(([key, value]) => ({
            key,
            value,
          }));
          setData(resultArray);
        }
        setTicket(true);
      } else {
        setTicket(false)
      }
    };
    if (walletReady) {
      getData();
    }
    // eslint-disable-next-line
  }, [walletReady]);

  const onConnectWalletClicked = async () => {
    if (!wallet)
      return {
        title: "Wallet not initialized",
        description: "Please try again later",
        status: "error",
      };

    if (wallet.accountId) {
      return {
        title: "Wallet already connected",
        status: "info",
      };
    }

    wallet.signIn();

    const isSignedIn = await wallet.startUp();

    if (isSignedIn) {
      // Redirect to the home page
      window.location.reload()
    }
  };

  const signOutClick = async () => {
    if (!wallet)
      return {
        title: "Wallet not initialized",
        description: "Please try again later",
        status: "error",
      };

    wallet.signOut();
  };

  const isWalletConnected = !!wallet?.accountId;

  if (isWalletConnected && ticket) {
    return (
      <div className="flex items-center">
        <button
          className="px-2 rounded-md text-gray-600 hover:bg-gray-300 hover:border-b-4 hover:border-r-4 transition-all duration-300 font-medium"
        >
          {ticket &&
           <a href={`${process.env.REACT_A}/?transactionHashes=${account}`} className="text-[30px] md:text-[50px]">
              🎟
            </a>
          }
        </button>
        <button
          onClick={signOutClick}
          className="border border-gray-600 px-4 py-1 md:px-8 md:py-3 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-700 text-white hover:bg-gray-300 hover:border-b-4 hover:border-r-4 transition-all duration-300 font-medium"
        >
          Logout
        </button>
      </div>
    )
  }


  if (isWalletConnected) {
    return (
      <>
        <button
          onClick={signOutClick}
          className="border border-gray-600 px-4 py-1 md:px-8 md:py-3 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-700 text-white hover:bg-gray-300 hover:border-b-4 hover:border-r-4 transition-all duration-300 font-medium"
        >
          {wallet.accountId?.split(".")[0]}
        </button>
      </>
    )
  }

  if (!isWalletConnected) {
    return (
      <button
        onClick={onConnectWalletClicked}
        className="border bg-gradient-to-tr from-cyan-400 to-blue-700 text-white border-gray-600 px-4 py-1 md:px-8 md:py-3 rounded-xl hover:bg-gray-300 hover:border-b-4 hover:border-r-4 transition-all duration-300 font-medium"
      >
        Connect
      </button>
    )
  }
}

export default memo(ConnectWalletButton);
