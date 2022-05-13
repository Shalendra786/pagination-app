import React, { useEffect, useState } from 'react';
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

function Home() {

  const [oldData, setOldData] = useState([]);
  const [page ,setPage] = useState(1)

  // const [pageCount, setpageCount] = useState(0);

  // let limit = 10;
  
  // useEffect(() => {
  //  let interval = setInterval(() => {
  //   pauseData();
    
  //   }, 10000);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    getComments();
   
  }, []);
  
  const getComments = async () => {
    const res = await axios.get(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0`
      // `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=${limit}`
    );
    console.log(res)
    let initialData =  res.data.hits;
    setOldData(initialData);
  };
  const pauseData=async()=>{
    setPage(page+1) 
     const res = await axios.get(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
        // `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=${limit}`
      );
      //console.log(res)
      let data =  res.data.hits;
      setOldData([...oldData,...data])

  }

  const fetchMoreData = async() => {
    setPage(page+1) 

    const res = await axios.get(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
      // `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${limit}`
    );

    let newData= res.data.hits;
     console.log(newData)
    setOldData([...oldData,...newData])
  
  };




  return (
     <div className= "container">
      <InfiniteScroll
      dataLength={oldData.length}
      next={fetchMoreData}
      hasMore={oldData.length !==1000}
      loader={<center>Loading...</center>}
    >
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Created_at</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">URL</TableCell>
            <TableCell align="left">Author</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {oldData.map((data) => (
            
            <TableRow
              key={data.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              
            >
              <Link to="http://hn.algolia.com/api/v1/search_by_date?tags=story&page=0">
              <TableCell component="th" scope="row">{data.created_at}</TableCell>
              <TableCell align="left"> {data.title}</TableCell>
                <TableCell align="left">{data.url}</TableCell>
              <TableCell align="left">{data.author}</TableCell></Link>
              
            </TableRow>
           
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </InfiniteScroll>
  
    </div>
  
  );
}

export default Home;
