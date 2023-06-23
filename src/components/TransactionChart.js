import React, {useState, useEffect } from "react";
import Chart from "react-apexcharts";
import {rows} from './TransactionTable';
import './TransactionChart.css';
import Box from '@mui/material/Box';
import {Link } from "react-router-dom";
import { Button } from '@mui/material';
function TransactionChart() {
  const data= rows;
  let month =0;

let data1=0;
let data2=0;
let data3=0;
let data4=0;
let data5=0;
let data6=0;
let data7=0;
let data8=0;
let data9=0;
let data10=0;



for(let i=0;i<data.length;i++){
  month=data[i].dateOfSale;
 //data between 0 - 101
 if(data[i].price>=1 && data[i].price<=100){
  data1++;
}

  //data between 101 - 200
 else if(data[i].price>=101 && data[i].price<=200){
  data2++;
  }

    //data between 201 - 300
    else  if(data[i].price>=201 && data[i].price<=200){
      data3++;
    }
      //data between 301 - 400
      else  if(data[i].price>=301 && data[i].price<=400){
        data4++;
  }
    //data between 401 - 500
    else if(data[i].price>401 && data[i].price<=500){
      data5++;
    }
      //data between 501 - 600
      else if(data[i].price>501 && data[i].price<=600){
    data6++;
  }
    //data between 601 - 700
    else if(data[i].price>601 && data[i].price<=700){
      data7++;
    }
      //data between 701 - 800
      else if(data[i].price>701 && data[i].price<=800){
    data8++;
  }
   //data between 801 - 900
   else if(data[i].price>801 && data[i].price<=900){
    data9++;
  }
    //data between 901 - above
    else if(data[i].price>901 && data[i].price<=800){
      data10++;
    }
}

let arr=[data1,data2,data3,data4,data5,data6,data7,data8,data9,data10];

console.log(arr);



//Month Word conversation 
  let selectedMonth=(getMonthName(month));
    function getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);
      
        return date.toLocaleString('en-US', {
          month: 'long',
        });
      }
  return (
    <>
    <div className="chart">
    <React.Fragment>
    <div className="chart">
    <Box  sx={{ bgcolor:'rgb(236, 165, 57)', height: 'auto', width:'auto', borderRadius:'30px' }}>
    
        <h3 className="text-center mt-3 mb-3">Bar Chart Stacts - {selectedMonth}</h3>
      
        <Chart
       
          type="bar"
          width={700}
          height={500}
          series={[
            {
              name: "Product available in this range",
              data: arr,
              
            },
          ]}
          options={{
           


            colors: ["rgb(120, 206, 255)"],
            theme: { mode: "light" },

            xaxis: {
              tickPlacement: "on",
              categories: [
                "0-100",
                "101-200",
                "201-300",
                "301-400",
                "401-500",
                "501-600",
                "601-700",
                "701-800",
                "801-900",
                "901-Above",
              ],
              title: {
                text: "Price range",
                style: { color:'rgba(9, 71, 206, 0.842)', fontSize: 30 },
              },
            },

            yaxis: {
                labels: {
                  formatter: (val) => {
                  return `${val}`;
                  },
                style: { fontSize: "15", color:'rgba(9, 71, 206, 0.842)' },
              },
                 title: {
                 text: "Products",
                 style: { color:'rgba(9, 71, 206, 0.842)', fontSize: 15 },
              },
            },

            legend: {
              show: true,
              position: "right",
            },

            dataLabels: {
              formatter: (val) => {
                return `${val}`;
              },
              style: {
                colors: ["#f4f4f4"],
                fontSize: 15,
              },
            },
          }}
        ></Chart>
      
    </Box>
    </div>
    </React.Fragment>

   
    </div>

<div className='button2'>

<Link to="/" sx={{marginTop:10}}>
<Button variant="contained">Go Back</Button>
    </Link>
    </div>
    </>
  );
}

export default TransactionChart;