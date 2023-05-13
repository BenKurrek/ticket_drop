import { memo } from "react";
import { useSelector } from "react-redux";
import { selectWallet } from "../features/walletSlice";

function ConnectWalletButton() {
  const wallet = useSelector(selectWallet);
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
      window.location.href = '/';
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

  return isWalletConnected ? (
    <button
      onClick={signOutClick}
      className="border border-gray-600 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-300 hover:border-b-4 hover:border-r-4 transition-all duration-300 font-medium"
    >
      {wallet.accountId?.split(".")[0]}
    </button>
  ) : (
    <button
      onClick={onConnectWalletClicked}
      className="border border-gray-600 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-300 hover:border-b-4 hover:border-r-4 transition-all duration-300 font-medium"
    >
      Connect
    </button>
  );
}

export default memo(ConnectWalletButton);
