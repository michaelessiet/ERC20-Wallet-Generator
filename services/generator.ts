import { ethers, utils } from "ethers";
import { bip39 } from "../constants/constants";

export function MnemonicGenerator() {
  let mnemonic = [];
  for (let i = 0; i < 12; i++) {
    mnemonic.push(bip39[Math.floor(Math.random() * 2048)]);
  }
  return mnemonic.join(" ");
}

export function checkValidity(mnemonic: string) {
  const isValid = utils.isValidMnemonic(mnemonic);
  if (isValid) return mnemonic;
  else return null;
}

export async function checkBalance(mnemonic: string) {
  const provider = new ethers.providers.WebSocketProvider(
    "wss://mainnet.infura.io/ws/v3/8198b294efed4ab89a84c76772652b21"
  );
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);
  const balance =await  provider.getBalance(wallet.address);
  return balance;
}

