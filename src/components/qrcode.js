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
      {type &&
        <h1 className="text-gray-900 font-bold w-2/4 mx-auto items-center border-gray-400 px-4 py-2 text-center border justify-center mt-4">
          {type} Ticket
        </h1>
      }
    </div>
  );
};

export default QrCode;
