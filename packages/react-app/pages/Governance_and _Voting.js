import React from 'react';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


export default function Governance_and_Voting() {
  return (
    <div>Governance_and _Voting

    </div>
  )
}


import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>

        <Button variant="outlined" color="success">
            Active</Button>

  <Stack direction="row" spacing={2}>
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 24, height: 24 }}
      />
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 56, height: 56 }}
      />
      {username} created this proposal

    </Stack>

        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          TempCheck : choosing a team to develop wstETH bridge on BNB
        </Typography>



        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent

          Following the request for proposal (RFP) from NEW (Network Expansion WorkGroup) that concluded on Decemeber 5th, 2023 there are 4 eligible submissions to developer wstEth
          brige on BNB recieved postivie or neutral feedback from the community.
          This vote will identify the most supported team among the eligible  competing submissions whose
          references given below to kick off or continue development.

          Voting conditions
          This vote will requires a quoroum of 5% LDO total supply (50M) votes for any single option .
          The winning submission will be determined based on two conditions.
          1. a quoroum of 50% in total accross all options is reached.
          2. The leading option must exceed the second candidate by a margin of 20% of votes 
          participated in the vote  


        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}


import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography>
            <h1>
                Cast Your Vote
            </h1>
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
     
      <CardActions>
        <Button color="white" size="large" width="600px" variant="outlined">Yes</Button>
        <Button color="white" size="large" width="600px" variant="outlined">No</Button>
         
        <Button color="gray"  size="large" width="600px" variant="outlined">Vote</Button>

      </CardActions>

      <Typography>
        <h4>
            Voting ends in 32h 23m 19s

        </h4>
      </Typography>
    </Card>
  );
}



  


import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


// Custom styles for the progress bar
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

// VoteProgressBar component
const VoteProgressBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LinearProgress
        variant="determinate"
        value={70}
        style={{
          backgroundColor: 'green',
          height: '30px',
          borderRadius: '15px',
          backgroundImage: 'linear-gradient(to right, #00FF00, #00EE00, #00DD00, #00CC00, #00BB00, #00AA00, #009900, #008800, #007700, #006600, #005500, #004400, #003300, #002200, #001100, #000000)',
        }}
      />
      <LinearProgress
        variant="determinate"
        value={20}
        style={{
          backgroundColor: 'gray',
          height: '30px',
          borderRadius: '15px',
          backgroundImage: 'linear-gradient(to right, #CCCCCC, #BBBBBB, #AAAAAA, #999999, #888888, #777777, #666666, #555555, #444444, #333333, #222222, #111111, #000000)',
        }}
      />
      <LinearProgress
        variant="determinate"
        value={10}
        style={{
          backgroundColor: 'red',
          height: '30px',
          borderRadius: '15px',
          backgroundImage: 'linear-gradient(to right, #FF0000, #EE0000, #DD0000, #CC0000, #BB0000, #AA0000, #990000, #880000, #770000, #660000, #550000, #440000, #330000, #220000, #110000, #000000)',
        }}
      />
    </div>
  );
};

// Main ActionAreaCard component
export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Current Votes
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.
          </Typography>
          <VoteProgressBar />
        </CardContent>

        <div>
      <Checkbox {...label} disabled checked color="secondary"  />
      (50k)(78%)
      <Checkbox {...label} />
      <Checkbox {...label} disabled  checked color="success"/>
      (50k)(78%)
      <Checkbox {...label} disabled checked color="default" />
      (50k)(78%)
    </div>


    <Typography>
        <h1>
            Quoroum 
        </h1>
       
        

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({height: 10, borderRadius: 5,[`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));


    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <BorderLinearProgress variant="determinate" value={70} />
        </Box>
        <Typography variant="body2" color="text.secondary">{`${Math.round(70)}%`}</Typography>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <BorderLinearProgress variant="determinate" value={40} />
        </Box>
        <Typography variant="body2" color="text.secondary">{`${Math.round(40)}%`}</Typography>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <BorderLinearProgress variant="determinate" value={90} />
        </Box>
        <Typography variant="body2" color="text.secondary">{`${Math.round(90)}%`}</Typography>
      </Box>
    </Stack>
  
    </Typography>
      </CardActionArea>
    </Card>
  );
}


import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          
          <Typography variant="body2" color="text.secondary">
            Status
          </Typography>

          <Typography>
            The process has reached the required quorom .
            if the current vote stands the proposal will pass.
          </Typography>
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
}


import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

function createData(
  name: string,
  voters: string,
  vote: boolean,
  votingPower: number
) {
  return { name, voters, vote, votingPower };
}

const rows = [
  createData('0x77F92A953b9D9212D17A1F3Aa5739a9597Ff478a', 'https://example.com/avatar1.png', true, 0.02440),
  createData('0x77F92A953b9D9212D17A1F3Aa5739a9597Ff478b', 'https://example.com/avatar2.png', false, 0.0373),
  createData('0x77F92A953b9D9212D17A1F3Aa5739a9597Ff478c', 'https://example.com/avatar3.png', true, 0.02460),
];
const bull1 = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>

 


    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Voters</TableCell>
            <TableCell align="right">Vote</TableCell>
            <TableCell align="right">Voting Power</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Avatar alt="Avatar" src={row.voters} sx={{ marginRight: '8px' }} />
                {row.name}
              </TableCell>
              <TableCell align="right">{row.vote ? 'Yes' : 'No'}</TableCell>
              <TableCell align="right">{row.votingPower}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  


      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography>
      
     
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}


