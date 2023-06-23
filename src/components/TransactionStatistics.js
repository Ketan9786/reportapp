import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import "../components/TransactionStatistics.css";
import {Link } from "react-router-dom";
import { Button } from '@mui/material';
import {rows} from './TransactionTable';
export default function TransactionStatistics(){
  

  const data= rows;


  let month =0;
  let  totalSale = 0;
  let totalSolditem=0;
  let notSolditem=0;

for(let i=0;i<data.length;i++){
  
  month=data[i].dateOfSale;
  if(data[i].sold == "Yes"){
    totalSolditem++;

    totalSale +=data[i].price;
  }
}
notSolditem = data.length-totalSolditem;
let selectedMonth=(getMonthName(month));
    function getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);
      
        return date.toLocaleString('en-US', {
          month: 'long',
        });
      }

   


    return(
        
        <>
       
      
          <div className='background'>

          <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm"  sx={{padding:'10%'}}>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh',padding:'10%'}} >
        
        <div>
        <h3 >Statistics - {selectedMonth}</h3>
        </div>

        <Box sx={{ bgcolor:'rgb(236, 165, 57)', height: 'auto', width:'auto', borderRadius:'30px'}}>
        
        <div className='flex2'>
         
            <h5>Total Sale </h5>
            <h5>{totalSale}</h5>
            </div>

            
        <div className='flex2'>
         
         <h5>Total sold item </h5>
         <h5>{totalSolditem}</h5>
         </div>

         
        <div className='flex2'>
         
         <h5>Total not sold item</h5>
         <h5>{notSolditem}</h5>
         </div>
   
        </Box>
        <div className='button1'>

        <Link to="/" sx={{marginTop:10}}>
        <Button variant="contained">Go Back</Button>
            </Link>
            </div>
          </Box>

        
      </Container>
    </React.Fragment>
    </div>
        </>
    )
}