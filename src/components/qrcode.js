import { getDropInformation, getKeyInformation, getPubFromSecret } from "@keypom/core";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

const QrCode = ({ link, ticket }) => {
  const [type, setType] = useState("");

  const PrivateKey = async (ticket) => {
    if (ticket) {
      let url = await ticket.split("/");
      if (url.length > 3) {
        return url[4];
      }
    }
  };

  useEffect(() => {
    async function getKeyinfo() {
      const privateKey = await PrivateKey(ticket);
      if (privateKey) {
        const publicKey = await getPubFromSecret(privateKey);
        const keyInfo = await getKeyInformation({ publicKey });
        const data = getDropInformation({
          dropId: keyInfo.drop_id,
          publicKey: publicKey,
          withKeys: true,
        });
        data.then((data) => {
          setType(data.fc.methods[1][0].args);
        });
      }
    }
    getKeyinfo();
  }, [ticket]);

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={link}
      size={300}
      fgColor={"#000000"}
      bgColor={"#F8F8FF"}
      level={"H"}
    />
  );

  return (
    <div className="qrcode__container">
      <div>{qrcode}</div>
      {type == "ELITE" &&
        <button
          className="mt-4 border bg-gradient-to-tr from-cyan-400 to-blue-700 text-white border-gray-600 px-4 py-2 rounded-xl hover:bg-gray-300 hover:border-b-4 hover:border-r-4 transition-all duration-300 font-medium"
        >
          {type} Ticket
        </button>
      }
      {type == "PREMIUM" &&
        <button
          className="mt-4 border bg-gradient-to-tr from-red-500 to-pink-800 text-white border-gray-600 px-4 py-2 rounded-xl hover:bg-gray-300 hover:border-b-4 hover:border-r-4 transition-all duration-300 font-medium"
        >
          {type} Ticket
        </button>
      }

    </div>
  );
};

export default QrCode;
