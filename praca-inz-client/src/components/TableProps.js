import * as React from 'react';
import { Table } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableContainer } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { Paper } from '@material-ui/core';

export default function BasicTable (attr) {

  const atrib = attr.attr;
  let rows = [];
  
  rows.push(atrib);

  if (rows.length) {
    const property = rows[0];

    const keys = Object.keys(property);
    const values = Object.values(property);

    const units = ['[MPa]', '[MPa]', '[%]', ''];
    let printColumns = property != null ? keys.map((key, index) => <TableCell align="center"> {key} {units[index]} </TableCell> ) : '';
    let printRows = property != null ? values.map((val) => <TableCell align="center"> {val} </TableCell> ) : '';

    return (
      <TableContainer className="alloy-table__item" component={Paper}>
        <Table className="alloy-table__table" sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="alloy-table__head">
            <TableRow>
              {printColumns}
            </TableRow>
          </TableHead>
          <TableBody className="alloy-table__body">
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {printRows}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}