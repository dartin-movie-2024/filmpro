import { Button, IconButton, Typography, makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { PieChart, pieArcClasses } from '@mui/x-charts/PieChart';
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import React from "react";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  main: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    maxHeight: "300px",
    width: "30%",
    margin: "1rem",
    display: 'flex',
    flexDirection: 'column'
  },
  cardHeader: {
    height: '65px'
  },
  cardContent: {
    overflow: "auto",
    flex: 1,
    boxSizing: 'border-box',
  },
  cardActions: {
    height: '65px'
  },
  cardContentContainer: {
    height: "100%",
    width: "100%",
    overflow: "auto",
    boxSizing: 'border-box',
  },
  cardItem: {
    boxSizing: 'border-box',
    width: "95%",
    height: '75px',
    margin: '.2rem auto',
    display: 'flex',
    flexDirection: 'column'
  },
  cardItemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardItemBody: {
    margin: '.2rem 0',
  },
  cardItemFooter: {
    textAlign: 'right',
  },
  graphContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const AssistantDirector = function() {
  const classes = useStyles();
  const cards = [{
    title: 'Submitted Scenes',
    subHeader: ''
  }, {
    title: 'Submitted Characters',
    subHeader: ''
  }, {
    title: 'Submitted Locations',
    subHeader: ''
  }];

  return (
    <div className={classes.main}>
      <div className={classes.appBarSpacer} />
      <div className={classes.content}>
        <div className={classes.cardsContainer}>
          {cards.map((card) => (
            <Card className={classes.card}>
              <CardHeader
                className={classes.cardHeader}
                title={card.title}
                subheader={card.subHeader}
              />
              <CardContent className={classes.cardContent}>
                <CardContentContainer card={card} />

              </CardContent>
              <CardActions disableSpacing className={classes.cardActions}>
                <Button
                    variant="contained"
                    color="primary"
                    component="span">
                        More
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
        <div className={classes.graphContainer}>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: 'Series A' },
                  { id: 1, value: 15, label: 'Series B' },
                  { id: 2, value: 20, label: 'Series C' },
                ],
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30 },
                innerRadius: 30,
                paddingAngle: 5,
                cornerRadius: 5,
              },
            ]}
            sx={{
              [`& .${pieArcClasses.faded}`]: {
                fill: 'gray',
              },
            }}
            width={400}
            height={200}
          />
        </div>
      </div>
    </div>
  );
}

const CardContentContainer = function({card}) {
    const classes = useStyles();
    return <div className={classes.cardContentContainer}>
        {
            [1,2,3,4,5,6,7,8,9,10].map((item) => {
                return <Card className={classes.cardItem}>
                    <div className={classes.cardItemHeader}>
                      <span>Scene {item}</span>
                      <b>Detailed view</b>
                    </div>
                    <div className={classes.cardItemBody}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                    <div className={classes.cardItemFooter}>
                      Approved
                    </div>
                </Card>
            })
        }
    </div>
}

export default AssistantDirector;
