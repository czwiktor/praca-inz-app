import * as React from 'react';
import { Table } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableContainer } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { Paper } from '@material-ui/core';



function createData(name, properties) {
  return {name, properties};
}

const rows = [];


// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

 const printRows = rows.properties ? (rows.properties.map( (property) => <TableCell align="right"> {property} </TableCell> )) : '';


export default function BasicTable () {
  const { attributes } = this.props;

  console.log(attributes);
  attributes.map((attr) => {
    return rows.push(createData(attr.name, attr.properties))
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">[MPa]</TableCell>
            <TableCell align="right">[MPa]</TableCell>
            <TableCell align="right">[%]</TableCell>
            <TableCell align="right">[HB]</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              {printRows}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}