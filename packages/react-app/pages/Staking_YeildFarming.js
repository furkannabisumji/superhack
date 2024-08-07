import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {
  return (
    <React.Fragment>
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Total Value Locked
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent

          $9,574,208.4
        </Typography>
        
      </CardContent>
     
    </Card>

    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         Points Generated
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
          456,984.02
        </Typography>
       
      </CardContent>
     
    </Card>

    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         APY Rate
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
          97.23%
        </Typography>
        
      </CardContent>
     
    </Card>

    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Stakers
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
          6998
        </Typography>
        
      </CardContent>
     
    </Card>

    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         Lock Period
     
      </Typography>
      ////////////
{/*         
        import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const TransparentCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust the transparency here
  backdropFilter: 'blur(10px)', // Optional: adds a blur effect
  borderRadius: '10px',
  padding: '16px',
  textAlign: 'center',
}));

const Timer = () => {
  const targetDate = new Date('2023-09-24T00:00:00'); // Set your target date here
  const [timeRemaining, setTimeRemaining] = useState(targetDate - new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(targetDate - new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const getTimeComponents = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = getTimeComponents(timeRemaining);

  return (
    <TransparentCard>
      <CardContent>
        <Typography variant="h6">Sunday, Sep 24, 2023</Typography>
        <Typography variant="h4" fontWeight="bold">
          {days} Days {hours} Hours {minutes} Minutes {seconds} Seconds
        </Typography>
        <Box mt={2}>
          <Typography variant="body1">Total Amount To Be Locked</Typography>
          <Typography variant="h5" fontWeight="bold">
            1000 ETH
          </Typography>
        </Box>
      </CardContent>
    </TransparentCard>
  );
};

export default function App() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Lock Period
          </Typography>
          {/* In this place */}
          <Timer />
        </CardContent>
      </Card>
    </Box>
  );
} */}

        {/* < Inthis place></Inthis> */}
      </CardContent>


     
    </Card>


    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Total Value Locked
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent

          $9,574,208.4
        </Typography>
        
      </CardContent>
     
    </Card>
    import * as React from 'react';
    import { LineChart } from '@mui/x-charts/LineChart';
    
    export default function GridDemo() {

        <h1>tiung</h1>


      return (
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          height={300}
          margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
          grid={{ vertical: true, horizontal: true }}
        />
      );
    }

    import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectLabels() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Staked</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>With label + helper text</FormHelperText>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Last Week</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>With label + helper text</FormHelperText>
      </FormControl>






      ///////////////////////////////////////////////////////




      import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Amount to Stake
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
          Bonus Lock Options
        </Typography>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Select Amount</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>With label + helper text</FormHelperText>
      </FormControl>


      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Select Lock</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>With label + helper text</FormHelperText>
      </FormControl>
        
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Clain Native Token</Button>
      <Button variant="outlined">Claim Lock Token</Button>
    </Stack>

<Button variant="outlined" size="large">
   Claim
</Button>


// do the same for unstake also




  );
}
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

     
    </div>
  );
}

    
    </React.Fragment>
  );
}
