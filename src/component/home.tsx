import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import { IHomeProps } from "../interfaces/index";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    background: "lightgray"
  },
  media: {
    height: 150,
    background: "white",
    textAlign: "center"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 50
  },
  pos: {
    marginBottom: 15
  }
});

function Home(props: IHomeProps) {
  const classes = useStyles();

  return (
    <>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.winner ? props.winner : "SCORE BOARD"}
        </Typography>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image=""
            // title="Contemplative Reptile"
          >
            <Typography className={classes.title} variant="h5" component="h2">
              {props.runSingleBowl}
            </Typography>
          </CardMedia>
        </CardActionArea>

        <Typography variant="h5" component="h2">
          SCORE :{props && props.InningDetail && props.InningDetail.score}/
          {props && props.InningDetail && props.InningDetail.witckets}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Inning extra :{" "}
          {props && props.InningDetail && props.InningDetail.extra}
        </Typography>
        <Typography variant="body2" component="p">
          Balls Left :{props && props.InningDetail && props.InningDetail.balls}
        </Typography>
        <Typography variant="body2" component="p">
          Over : {props && props.InningDetail && props.InningDetail.overs}.
          {props.counter === 6 ? 0 : props.counter}/
          {props && props.InningDetail && props.InningDetail.totalOver}
        </Typography>
        <Typography variant="body2" component="p">
          currentOver:
          {props &&
            props.InningDetail &&
            props.InningDetail.currentOver &&
            props.InningDetail.currentOver.map(
              (item: number, index: number) => {
                return <i key={index}>{item + "  "}</i>;
              }
            )}
        </Typography>
      </CardContent>
    </>
  );
}

export default Home;
