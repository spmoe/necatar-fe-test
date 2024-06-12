import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia, mainnet } from "wagmi/chains";
import { PROJECT_ID, TITLE } from "./config";

export const config = getDefaultConfig({
  appName: TITLE,
  projectId: PROJECT_ID,
  chains: [
    mainnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  ssr: true,
});
