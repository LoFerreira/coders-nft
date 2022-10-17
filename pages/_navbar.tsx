import { ConnectWallet } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import Logo from "../assets/Logo";

export default function Navbar() {
  const router = useRouter();
  const handleLogoClick = useCallback(() => {
    router.push("/");
  }, []);

  return (
    <div>
      <div className="h-20 px-[10%] py-10 flex items-center justify-between">
        <div
          className="flex items-center cursor-pointer"
          onClick={handleLogoClick}
        >
          <Logo />
          <p className="ml-3 font-semibold">Coders NFT</p>
        </div>
        <ConnectWallet accentColor="#242634" colorMode="light" />
      </div>
      <hr className="w-full border-[#242634]" />
    </div>
  );
}
