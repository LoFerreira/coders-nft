import {
  useAddress,
  useContract,
  useListing,
  useListings,
  useNFT,
} from "@thirdweb-dev/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import React, { useCallback } from "react";
import NFTCard from "../../components/nft-card";

export type NFTDetailsProps = {};

const NFTDetails = ({}: NFTDetailsProps) => {
  const [loadingPurchase, setLoadingPurchase] = React.useState<boolean>(false);
  const router = useRouter();

  const marketPlace = useContract(
    "0x52206056BD9bda5DF814A427C4F599f486AF73f1"
  ) as any;
  const { data: listings } = useListings(marketPlace.contract);

  const { data: listing } = useListing(
    marketPlace.contract,
    Number(router.query.id)
  );

  const { contract } = useContract(listing?.assetContractAddress);
  const { data: nft } = useNFT(contract, listing?.asset.id);
  const walletAddress = useAddress();

  // Configure to buy NFT not is a owner by NFT
  const userIsNFTOwner = !!walletAddress && walletAddress === nft?.owner;
  const shouldDisableBuyNFTButton =
    userIsNFTOwner || loadingPurchase || listing?.quantity.toString() === "0";

  const handleBuyNFT = useCallback(async () => {
    try {
      setLoadingPurchase(true);
      await marketPlace.contract.direct.buyoutListing(listing?.id, 1);
      setLoadingPurchase(false);
      Notify.success("You have successfully bought this NFT!");
    } catch (error) {
      setLoadingPurchase(false);
      Notify.failure("Failed to buy this NFT!");
    }
  }, []);

  return (
    <div className="px-[10%] min-h-[80vh]">
      <Head>
        <title>{listing?.asset.name} NFT - Details Page</title>
      </Head>
      <div className="mt-24 flex justify-between flex-wrap gap-10">
        <img
          className="rounded-[1.5rem] w-full max-w-lg h-auto"
          src={listing?.asset.image}
          alt={listing?.asset.name.toString()}
        />
        <div className="md:ml-10 w-full max-w-lg">
          <h1 className="text-5xl font-bold">{listing?.asset.name}</h1>
          <p className="text-[#93969A] mt-4">{listing?.asset.description}</p>
          <hr className="w-full border-[#242634] mt-8 mb-4" />
          <div>
            <p className="text-[#93989A]">Owner</p>
            <p>
              {nft?.owner.slice(0, 15)} {userIsNFTOwner && "(You)"}
            </p>
          </div>
          <hr className="w-full border-[#242634] mt-4 mb-8" />
          <div>
            <button
              onClick={handleBuyNFT}
              disabled={shouldDisableBuyNFTButton}
              className={`bg-[#ff2748] py-4 px-6 rounded-xl ${
                shouldDisableBuyNFTButton
                  ? "opacity-50"
                  : "hover:scale-105 active:scale-100"
              }`}
            >
              {loadingPurchase ? "Loading..." : "Buy NFT"}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-24">
        <h2 className="text-4xl mt-24">More Works</h2>
        <div className="flex flex-wrap items-start gap-8 mt-7 ">
          {listings
            ?.filter((_, index) => index < 3)
            .map((listing) => (
              <NFTCard listing={listing} key={listing.id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default NFTDetails;
