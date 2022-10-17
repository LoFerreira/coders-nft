import { useContract, useListings } from "@thirdweb-dev/react";
import Head from "next/head";
import React, { ChangeEvent } from "react";
import NFTCard from "../components/nft-card";

export default function Home() {
  const [search, setSearch] = React.useState<string>("");

  const marketPlace = useContract(
    "0x52206056BD9bda5DF814A427C4F599f486AF73f1"
  ) as any;

  const { data: listings } = useListings(marketPlace.contract);

  const handleSearch = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const filteredListings = React.useMemo(() => {
    return (
      listings?.filter((nft) =>
        !!search
          ? nft.asset.name
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase())
          : true
      ) || []
    );
  }, [search, listings]);

  return (
    <div className="h-full w-screen bg-[#1d1f2b] px-[10%] min-h-[80vh]">
      <Head>
        <title>Coders NFT</title>
      </Head>

      <div className="flex justify-between items-baseline flex-wrap">
        <h2 className="text-5xl font-bold text-white mt-24">Discover</h2>

        <input
          placeholder="Search item"
          className="h-12 2-64 p-4 rounded-xl mt-5 md:mt-0"
          value={search}
          onChange={handleSearch}
        />
      </div>

      <hr className="w-full border-[#242634] mt-12" />

      <div className="flex-col items-start gap-7 mt-12">
        <h2 className="text-5xl font-bold ">Popular Bid</h2>

        <div className="flex flex-wrap items-start justify-start gap-7 mt-7 min-h-[50%] ">
          {filteredListings.map((listing) => (
            <NFTCard listing={listing} key={listing.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
