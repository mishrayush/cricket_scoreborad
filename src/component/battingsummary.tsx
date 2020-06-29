import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { strikeRateCalculate, bowlerEconomyCalculate } from "../utils/index";
import { IBattingSummary } from "../interfaces/index";
const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function BattingSummary(props: IBattingSummary) {
  const classes = useStyles();

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            {props && props.TeamName}
            <TableRow>
              <TableCell>Player Name</TableCell>
              <TableCell>Wicket</TableCell>
              <TableCell align="right">Ball</TableCell>
              <TableCell align="right">Runs</TableCell>
              <TableCell align="right">Strike Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props &&
              props.firstInningDetail &&
              props.firstInningDetail.battingLineUp &&
              Object.values(props.firstInningDetail.battingLineUp).map(
                (row: any) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>
                      {row.status === true ? "Not Out" : "Out"}
                    </TableCell>
                    <TableCell align="right">{row.ballsPlayed}</TableCell>
                    <TableCell align="right">{row.runs}</TableCell>
                    <TableCell align="right">
                      {strikeRateCalculate(row.runs, row.ballsPlayed).toFixed(
                        2
                      )}
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Player Name</TableCell>
              <TableCell>Wicket</TableCell>
              <TableCell align="right">Over</TableCell>
              <TableCell align="right">Runs</TableCell>
              <TableCell align="right">Econ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props &&
              props.firstInningDetail &&
              props.firstInningDetail.bowlingLineUp &&
              Object.values(props.firstInningDetail.bowlingLineUp).map(
                (row: any) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.wickets} </TableCell>
                    <TableCell align="right">{row.overs}</TableCell>
                    <TableCell align="right">{row.runGiven}</TableCell>
                    <TableCell align="right">
                      {bowlerEconomyCalculate(row.runGiven, row.overs).toFixed(
                        2
                      )}
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
