/* A helper file that simplifies using the wallet selector */

// near api js
import { providers } from "near-api-js";

// wallet selector UI
import "@near-wallet-selector/modal-ui/styles.css";
import { setupModal } from "@near-wallet-selector/modal-ui";
import LedgerIconUrl from "@near-wallet-selector/ledger/assets/ledger-icon.png";
import MyNearIconUrl from "@near-wallet-selector/my-near-wallet/assets/my-near-wallet-icon.png";
import SenderIconUrl from '@near-wallet-selector/sender/assets/sender-icon.png'
import MeteorIconUrl from '@near-wallet-selector/meteor-wallet/assets/meteor-icon.png'
import HereWalletIconUrl from '@near-wallet-selector/here-wallet/assets/here-wallet-icon.png'
import NearWalletIconUrl from '@near-wallet-selector/near-wallet/assets/near-wallet-icon.png'

import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupWalletConnect } from "@near-wallet-selector/wallet-connect";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";

const THIRTY_TGAS = "30000000000000";
const NO_DEPOSIT = "0";

// Wallet that simplifies using the wallet selector
export class Wallet {
  walletSelector;
  wallet;
  network;
  createAccessKeyFor;
  accountId;

  constructor(props = { createAccessKeyFor: "", network: "mainnet" }) {
    const { createAccessKeyFor, network } = props;
    this.createAccessKeyFor = createAccessKeyFor;
    this.network = network;
  }

  // To be called when the website loads
  async startUp() {
    if (!this.network) {
      throw new Error("Network not set by passing it to the constructor");
    }

    this.walletSelector = await setupWalletSelector({
      network: this.network,
      modules: [
        setupMyNearWallet({ iconUrl: MyNearIconUrl.src }),
        setupNearWallet({iconUrl: NearWalletIconUrl.src}),
        setupLedger({ iconUrl: LedgerIconUrl.src }),
        setupSender({iconUrl: SenderIconUrl.src}),
        setupMeteorWallet({iconUrl: MeteorIconUrl.src}),
        setupHereWallet({iconUrl: HereWalletIconUrl.src}),
        setupWalletConnect({
          metadata: {
            name: "VBI Learning",
            description: "New Generation E-Learning Platform",
            url: "https://vbilearning.com",
            icons: ["https://vbilearning.com/favicon.ico"],
          },
          projectId: "fbc8adabe1de4762d151952179db25dd",
        }),
      ],
    });

    const isSignedIn = this.walletSelector.isSignedIn();

    // If user is signed in, update fields, otherwise do nothing
    if (isSignedIn) {
      const accountState = this.walletSelector.store.getState().accounts[0];

      if (!accountState) {
        return;
      }

      this.wallet = await this.walletSelector.wallet();
      this.accountId = accountState.accountId;
    }

    return isSignedIn;
  }

  // Sign-in method
  signIn() {
    if (!this.walletSelector) {
      throw new Error(
        "Wallet selector not initialized by running startUp() first",
      );
    }

    const description = "Please select a wallet to sign in.";
    const modal = setupModal(this.walletSelector, {
      contractId: this.createAccessKeyFor || "",
      description,
    });
    modal.show();
  }

  // Sign-out method
  signOut() {
    if (!this.wallet) {
      throw new Error("Wallet not initialized by running startUp() first");
    }

    this.wallet.signOut();
    this.wallet = this.accountId = this.createAccessKeyFor = undefined;
    window.location.replace(window.location.origin + window.location.pathname);
  }

  // Make a read-only call to retrieve information from the network
  async viewMethod({ contractId, method, args = {} }) {
    if (!this.walletSelector) {
      throw new Error(
        "Please! Login the Wallet",
      );
    }
    const { network } = this.walletSelector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    const res = await provider.query({
      request_type: "call_function",
      account_id: contractId,
      method_name: method,
      args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
      finality: "optimistic",
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return JSON.parse(Buffer.from(res.result).toString());
  }

  // Call a method that changes the contract's state
  async callMethod({
    contractId,
    method,
    args = {},
    gas = THIRTY_TGAS,
    deposit = NO_DEPOSIT,
  }) {
    if (!this.wallet) {
      throw new Error("Please! Login the Wallet");
    }
    // Sign a transaction with the "FunctionCall" action
    let transaction = await this.wallet.signAndSendTransaction({
      signerId: this.accountId,
      receiverId: contractId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: method,
            args,
            gas,
            deposit,
          },
        },
      ],
    });
    let result = this.getTransactionResult(transaction);
    return result;
  }

  // Get transaction result from the network
  async getTransactionResult(txhash) {
    if (!this.walletSelector) {
      throw new Error(
        "Please! Login the Wallet",
      );
    }

    const { network } = this.walletSelector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    // Retrieve transaction result from the network
    const transaction = await provider.txStatus(txhash, "unnused");
    return providers.getTransactionLastResult(transaction);
  }
}
