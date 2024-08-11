// src/pages/NFTMarketplace.tsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { ethers } from 'ethers';
import NFTContractABI from '../abis/NFTContractABI.json'; // Import your NFT contract ABI

interface NFT {
  tokenId: number;
  name: string;
  description: string;
  imageURL: string;
}

const NFTMarketplace: React.FC = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        // Connect to Ethereum provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const nftContract = new ethers.Contract('YOUR_NFT_CONTRACT_ADDRESS', NFTContractABI, provider);

        // Fetch NFTs
        const totalSupply = await nftContract.totalSupply();
        const fetchedNFTs: NFT[] = [];
        for (let i = 0; i < totalSupply; i++) {
          const tokenId = await nftContract.tokenByIndex(i);
          const metadata = await nftContract.tokenURI(tokenId);
          const response = await fetch(metadata);
          const { name, description, image } = await response.json();

          fetchedNFTs.push({ tokenId: tokenId.toNumber(), name, description, imageURL: image });
        }

        setNfts(fetchedNFTs);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        NFT Marketplace
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={3}>
          {nfts.map((nft) => (
            <Grid item xs={12} sm={6} md={4} key={nft.tokenId}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={nft.imageURL}
                  alt={nft.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {nft.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {nft.description}
                  </Typography>
                  <Button variant="contained" color="primary">
                    Buy
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default NFTMarketplace;
