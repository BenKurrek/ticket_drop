import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectAccountId, selectIsLoading, selectWallet } from "../features/walletSlice"
import KeyInfo from "../state/keyInfo"
import QrCode from "./qrcode"

const contract_id = process.env.REACT_APP_CONTRACT_ID

const TicketOnwer = () => {
  const wallet = useSelector(selectWallet);
  const account = useSelector(selectAccountId)
  const [data, setData] = useState([]);
  const [walletReady, setWalletready] = useState(false);

  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (!isLoading && wallet) {
      setWalletready(true);
    }
  }, [isLoading, wallet]);

  useEffect(() => {
    const getData = async () => {
      if (!wallet) {
        console.error("Wallet is not initialized");
        return;
      }
      const result = await wallet.viewMethod({
        contractId: contract_id,
        method: "get_ticket_links_by_buyer",
        args: {
          account_id: account
        }
      });
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
      }
    };

    if (walletReady) {
      getData();
    }
  }, [walletReady]);

  if (data.length >= 2) {
    return (
      <div className="text-gray-800 grid grid-cols-1 lg:grid-cols-2 items-center justify-center text-center gap-8">
        {data.map((ticket) => (
          <a href={ticket} key={ticket}>
            <QrCode link={ticket} ticket={ticket} />
          </a>
        ))}
      </div>
    )
  }

  if (data.length == 1) {
    return (
      <div className="text-gray-800 flex items-center justify-center text-center gap-8">
        {data.map((ticket) => (
          <a href={ticket} key={ticket}>
            <QrCode link={ticket} ticket={ticket} />
          </a>
        ))}
      </div>
    )
  }
}


export default TicketOnwer
