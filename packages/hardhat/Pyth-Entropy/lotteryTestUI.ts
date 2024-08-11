import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { ethers } from 'ethers';
import LotteryABI from './LotteryABI.json'; // Replace with your contract ABI

const contractAddress = '0xYourLotteryContractAddress'; // Replace with your contract address
const providerUrl = 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'; // Replace with your provider URL

const lotteryContract = new ethers.Contract(contractAddress, LotteryABI, new ethers.providers.JsonRpcProvider(providerUrl));

const Lottery = () => {
    const [cakeBalance, setCakeBalance] = useState(0);
    const [ticketCount, setTicketCount] = useState(0);
    const [nextDraw, setNextDraw] = useState(1353); // Example draw number
    const [prizePot, setPrizePot] = useState(25552); // Example prize pot
    const [yourTickets, setYourTickets] = useState(0);
    const [roundDetails, setRoundDetails] = useState({
        roundNumber: 1352,
        prizePot: 33770,
        totalPlayers: 102,
        winningNumbers: [5, 9, 3, 8, 6, 5],
        prizeDistribution: {
            1: { prize: 418, count: 42 },
            2: { prize: 628, count: 5 },
            3: { prize: 1046, count: 0 },
            4: { prize: 2092, count: 0 },
            5: { prize: 4184, count: 0 },
            6: { prize: 8367, count: 0 },
            7: { prize: 4184, count: 0 }
        }
    });

    useEffect(() => {
        // Fetch CAKE balance and other data here
    }, []);

    const handleBuyTickets = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const lotteryWithSigner = lotteryContract.connect(signer);

        try {
            await lotteryWithSigner.buyTickets(ticketCount);
            alert('Tickets purchased successfully');
        } catch (error) {
            console.error('Error buying tickets:', error);
        }
    };

    const handleDrawLottery = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const lotteryWithSigner = lotteryContract.connect(signer);

        try {
            await lotteryWithSigner.drawLottery();
            alert('Lottery drawn successfully');
        } catch (error) {
            console.error('Error drawing lottery:', error);
        }
    };

    const handleCheckWinner = async () => {
        try {
            const winner = await lotteryContract.checkWinner(nextDraw);
            alert(`Winner: ${winner}`);
        } catch (error) {
            console.error('Error checking winner:', error);
        }
    };

    const fetchRoundDetails = async () => {
        try {
            const details = await lotteryContract.getRoundDetails(roundDetails.roundNumber);
            setRoundDetails({
                ...roundDetails,
                prizePot: details.prizePot,
                totalPlayers: details.totalPlayers,
                winningNumbers: details.winningNumbers
            });
        } catch (error) {
            console.error('Error fetching round details:', error);
        }
    };

    useEffect(() => {
        fetchRoundDetails();
    }, []);

    return (
        <div>
            <Card>
                <CardContent>
                    <Typography variant="h5">Lottery Game</Typography>
                    <Typography>Buy Tickets</Typography>
                    <TextField
                        label="Number of Tickets"
                        type="number"
                        value={ticketCount}
                        onChange={(e) => setTicketCount(e.target.value)}
                    />
                    <Typography>CAKE Balance: {cakeBalance}</Typography>
                    <Typography>Cost (CAKE): {ticketCount * 5}</Typography>
                    <Button variant="contained" onClick={handleBuyTickets}>Buy Instantly</Button>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Typography variant="h5">Next Draw</Typography>
                    <Typography># {nextDraw} | Draw: Aug 12, 2024, 3:00 PM</Typography>
                    <Typography>Prize Pot: {prizePot} CAKE</Typography>
                    <Typography>Your Tickets: {yourTickets}</Typography>
                    <Button variant="contained" onClick={handleCheckWinner}>Check Winner</Button>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Typography variant="h5">Round Details</Typography>
                    <Typography>Round: {roundDetails.roundNumber}</Typography>
                    <Typography>Drawn: Aug 11, 2024, 3:00 AM</Typography>
                    <Typography>Winning Number: {roundDetails.winningNumbers.join(' ')}</Typography>
                    <Typography>Prize Pot: {roundDetails.prizePot} CAKE</Typography>
                    <Typography>Total Players: {roundDetails.totalPlayers}</Typography>
                    {Object.entries(roundDetails.prizeDistribution).map(([matches, prizeData]) => (
                        <Typography key={matches}>
                            Match first {matches}: {prizeData.prize} CAKE (~${prizeData.prize * 0.165}) - {prizeData.count} Winning Tickets
                        </Typography>
                    ))}
                    <Button variant="contained" onClick={handleDrawLottery}>Draw Lottery</Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Lottery;
