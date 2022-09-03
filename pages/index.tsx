import { ConnectWallet, useAddress, useContract, useNFTs, ThirdwebNftMedia } from "@thirdweb-dev/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const address = useAddress()
  const { contract } = useContract("0x22fC4B8B825014267b03be1995Df41cf5Fb1B387")
  const { data: nfts, isLoading: loading } = useNFTs(contract?.nft, {
    start: 0,
    count: 3,
  } );

  const truncateAddress = (address: string) => {
    return(
      address.substring(0,6) + "..." + address.substring(address.length - 4)
    );
    };

    if(loading) {
      return <div>Loading...</div>
    }

  return (
    <div>
      {!address && (
      <ConnectWallet accentColor="#f213a4" colorMode="light" />)
      }

      {
        nfts && nfts?.length > 0 && (
          <div>
            {nfts.map((nft) => (
              <div key={nft.metadata.id.toString()}>
                <h1>{nft.metadata.name}</h1>
                <ThirdwebNftMedia 
                  metadata={nft.metadata}
                  />

                <p>owned by {""}
                {address && nft.owner === address 
                ? "you" 
                : truncateAddress(nft.owner)
                }
                </p>
              </div>
            ) )}
          </div>
        )
      }
    </div>
  );
};

export default Home;
