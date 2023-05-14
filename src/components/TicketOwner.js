import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectAccountId, selectIsLoading, selectWallet } from "../features/walletSlice"
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

  console.log("data: ", data)
  console.log("contract_id: ", contract_id  )

  return (
    <div className="text-gray-800 flex space-x-16 space-y-16">
      {data.map((ticket) => (
        <a href={ticket} key={ticket}>
          <QrCode link={ticket} />
        </a>
      ))}
    </div>
  )
}

export default TicketOnwer
