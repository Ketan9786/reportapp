import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { config } from "../App";
import { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import {Link } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import "../components/TransactionTable.css";
import TransactionStatistics from './TransactionStatistics';
import { Button } from '@mui/material';
const columns = [
  { id: 'id', label: 'ID', minWidth: 10 },
  { id: 'title', label: 'Title', minWidth: 40 },
  {
    id: 'description',
    label: 'Description',
    minWidth: 150,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'category',
    label: 'Category',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'sold',
    label: 'Sold',
    minWidth: 110,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'image',
    label: 'Image',
    minWidth: 110,
    align: 'right',
    format: ((value) => {

      return (
        <>
          <img src={value.toLocaleString('en-US')} style={{ width: "100%" }} />
        </>)
    })
  },
];

function createData(id, title, description, price, category, sold, image, dateOfSale) {

  return { id, title, description, price, category, sold, image, dateOfSale };
}

export let rows = [];

export default function TransactionTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = useState([]);
  const [month, setMonth] = React.useState('0');
  const [search, setSearch] = useState("");
  const [monthData, setMonthData] = useState([]);
  const [state, setState] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    performAPICall();

  }, []);



  async function performAPICall() {

    try {

      const response = await axios.get(config.endpoint)
      const products = response.data;

      setData(products);


    } catch (error) {
      console.log(error)
    }

  }

  // console.log(data, "kk")

  for (let i = 0; i < data.length; i++) {
    let datasold = "No";
    if (data[i].sold == true) {
      datasold = "Yes";
    }

    const d = new Date(data[i].dateOfSale);
    rows[i] = (createData(data[i].id, data[i].title, data[i].description, data[i].price, data[i].category, datasold, data[i].image, (d.getMonth() + 1)))
  }


  const handelSelect = (event) => {
    setMonth(event.target.value);


  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    console.log(search);

  };





  function filterByMonth(item) {
    if (item.dateOfSale == month) {
      return true;
    }

    return false;
  }

  const arrByMonth = rows.filter(filterByMonth)



  if (arrByMonth.length > 0) {
    rows = arrByMonth;

  }

  if (rows.length > 0) {
    var asArray = [];

    for (let i = 0; i < rows.length; i++) {

      asArray[i] = Object.entries(rows[i]);
      // const filtered = asArray[i].filter(([key, value]) =>  value === search);


    }
    function filterItems(arr, query) {
      return arr.filter((el) => el.toLocaleString().toLowerCase().includes(query.toLowerCase()));
    }
    let arrBySearch = [];
    let searchArr = []
    if (search.length > 0) {

      // rows=filterItems(asArray, search);
      arrBySearch = filterItems(asArray, search);

      for (let i = 0; i < arrBySearch.length; i++) {

        const justStrings = Object.fromEntries(arrBySearch[i]);

        searchArr[i] = justStrings;


      }

    }

    if (search.length > 0) {
      rows = searchArr;
      console.log(rows);
    }


  }



  return (

    <>
      <div className='body'>
        <div className='flex'>

          <div id='search'>
            <TextField id="standard-basic" label="Serach Transaction" variant="standard" onChange={handleSearch} sx={{ marginTop:5,width: 'auto' }} />
          </div>

          <div id='select'>
            <Box sx={{ width: 'auto' }}>
              <FormControl fullWidth>

                <Select
                  labelId="monthLable"
                  id="selectMonth"
                  value={month}
                  label="Month"
                  onChange={handelSelect}
                  sx={{marginTop:5 ,marginBottom:5}}
                >
                  <MenuItem value={0} >Default</MenuItem>
                  <MenuItem value={1}>JAN</MenuItem>
                  <MenuItem value={2}>FEB</MenuItem>
                  <MenuItem value={3}>MAR</MenuItem>
                  <MenuItem value={4}>APR</MenuItem>
                  <MenuItem value={5}>MAY</MenuItem>
                  <MenuItem value={6}>JUN</MenuItem>
                  <MenuItem value={7}>JUL</MenuItem>
                  <MenuItem value={8}>AUG</MenuItem>
                  <MenuItem value={9}>SEP</MenuItem>
                  <MenuItem value={10}>OCT</MenuItem>
                  <MenuItem value={11}>NOV</MenuItem>
                  <MenuItem value={12}>DEC</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
        <div className='table'>
          <Paper sx={{ width: '90%', overflow: 'hidden', backgroundColor: 'blanchedalmond', marginLeft: '50px', borderStyle: 'solid', borderWidth: '1px' }}>
            <TableContainer sx={{ maxHeight: 510 }}>
              <Table stickyHeader aria-label="sticky table" >
                <TableHead >
                  <TableRow >
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, borderStyle: 'solid', borderWidth: '1px' }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align} style={{ borderStyle: 'solid', borderWidth: '1px' }}>
                                {column.format && value[0] == 'h'
                                  ? column.format(value)

                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              style={{ borderStyle: 'solid', borderWidth: '1px' }}
            />
          </Paper>


        </div>


        <div className='button'>
           <Link to="/transactionstatics" sx={{marginTop:10}}>
          <Button variant="contained">
       Go TO Statistics
          
            </Button>
            </Link>
            <Link to="/barchart" sx={{marginTop:10}}>  <Button variant="contained">Go TO BarChar View</Button>
            </Link>
        </div>     
        

      </div>
    </>
  );
}