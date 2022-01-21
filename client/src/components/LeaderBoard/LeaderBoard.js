import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableRow: {
    backgroundColor: "#3f51b5",
  },
  tableCell: {
    color: "pink",
  },
  root:{
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
},
});

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);

const LeaderBoard = () => {
  const open = useSelector((state) => state.open);
  const classes = useStyles();
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    const getLeaderboard = async () => {
      const board = await axios.get("http://localhost:5000/leaderboard");

      setLeaderboard(board.data);
    };
    getLeaderboard();
  }, []);

  return (
    <div className={open?classes.root:null}>
      <Typography variant="h3" color="primary">
        Leaderboard
      </Typography>
      <br/>
      <Typography variant="h4" color="primary">
      Based on daily login count and number of doubts answered
      </Typography>
      <br/>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.tableRow}>
              <TableCell>
                <WhiteTextTypography variant="h5" color="common.white">
                  <strong>Rank</strong>
                </WhiteTextTypography>
              </TableCell>
              <TableCell align="right">
                <WhiteTextTypography variant="h5" color="primary">
                  <strong>Name</strong>
                </WhiteTextTypography>
              </TableCell>
              <TableCell align="right">
                <WhiteTextTypography variant="h5" color="primary">
                  <strong>Score</strong>
                </WhiteTextTypography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboard
              .sort((a, b) => (a.dayCount < b.dayCount ? 1 : -1))
              .map((leaderboard, i) => (
                <TableRow key={leaderboard._id}>
                  <TableCell
                    className={classes.tableCell}
                    component="th"
                    scope="row"
                  >
                    <Typography variant="h6" color="primary">
                      {i + 1}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6" color="primary">
                      {leaderboard.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6" color="primary">
                      {leaderboard.dayCount}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LeaderBoard;
