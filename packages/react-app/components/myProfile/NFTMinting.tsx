// src/pages/NFTMinting.tsx
import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ethers } from 'ethers';
import NFTContractABI from '../abis/NFTContractABI.json'; // Import your NFT contract ABI
import { useSnackbar } from 'notistack';

const NFTMinting: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit } = useForm();
  const [minting, setMinting] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    setMinting(true);
    try {
      // Connect to Ethereum provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // NFT contract instance
      const nftContract = new ethers.Contract('YOUR_NFT_CONTRACT_ADDRESS', NFTContractABI, signer);

      // Call the mint function
      const tx = await nftContract.mintNFT(data.name, data.description, data.imageURL);
      await tx.wait();

      enqueueSnackbar('NFT Minted Successfully!', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Failed to Mint NFT', { variant: 'error' });
    } finally {
      setMinting(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Mint Your NFT
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('name', { required: 'Name is required' })}
          label="Name"
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          {...register('description', { required: 'Description is required' })}
          label="Description"
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          {...register('imageURL', { required: 'Image URL is required' })}
          label="Image URL"
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary" disabled={minting}>
          {minting ? 'Minting...' : 'Mint NFT'}
        </Button>
      </form>
    </Container>
  );
};

export default NFTMinting;
