import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectAccountId, selectIsLoading, selectWallet } from "../features/walletSlice"
import QrCode from "./qrcode"

const contract_id = process.env.REACT_APP_CONTRACT_ID

const TicketOnwer = () => {
  const wallet = useSelector(selectWallet);
  const account = useSelector(selectAccountId)
  const [data, setData] = useState();
  const [walletReady, setWalletready] = useState(false);

  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (!isLoading && wallet) {
      setWalletready(true);
    }
  }, [isLoading, wallet]);
  console.log(account)

  useEffect(() => {
    const getData = async () => {
      if (!wallet) {
        console.error("Wallet is not initialized");
        return;
      }
      const result = await wallet.viewMethod({
        contractId: contract_id,
        method: "get_ticket_link_by_buyer",
        args: {
          account_id: account
        }
      })
      setData(result);
    };
    if (walletReady) {
      getData();
    }
  }, [walletReady]);

  return (
    <div className="text-gray-800">
      <a href={data} _blank>
        <QrCode link={data}/>
      </a>
    {data? data : "Not"}
    </div>
  )
}

export default TicketOnwer
