// import React from 'react';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';

// const MyPagination = () => {
//   const handlePageChange = (event, newPage) => {
//     onPageChange(newPage);
//   };

//   return (
//     <Stack spacing={2}>
//       <Pagination count={total} onChange={handlePageChange} />
//     </Stack>
//   );
// };

// export default MyPagination;


import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination({total,onPageChange}) {
    const handlePageChange = (event, newPage) => {
           onPageChange(newPage);
           };
        
  return (
    <Stack spacing={2}>
      <Pagination count={total} color="primary" onChange={handlePageChange} />
 
      
    </Stack>
  );
}