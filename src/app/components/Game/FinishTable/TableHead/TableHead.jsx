import React from "react";
import {
  TableCell,
  TableHead as UITableHEad,
  TableRow,
  TableSortLabel
} from "@material-ui/core";

import { HEAD_CELLS } from "../constants";

export const TableHead = ({ classes, order, orderBy, onRequestSort }) => {
  const createSortHandler = property => event => onRequestSort(event, property);

  return (
    <UITableHEad>
      <TableRow>
        {HEAD_CELLS.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </UITableHEad>
  );
};
