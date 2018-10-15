import React, { Component } from 'react';
import MODALS from '../../constants/modal';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import TokenPurchaseForm from '../common/forms/tokenPurchaseForm/TokenPurchaseForm';
import normalizeValue from '../../helpers/normalizeValue';
import { withStyles } from '@material-ui/core/styles';
import styles from './homePageStyles';

class HomePageComponent extends Component {
  componentDidMount() {
    this.props.getCrowdsaleDetails();
    this.props.getUserBalance();
  }

  togglePurchaseTokensModal = () => {
    this.props.toggleModal(MODALS.TOKEN_PURCHASE_FORM);
  }

  render() {
    const {
      status,
      startDate,
      phase1EndDate,
      endDate,
      phase1TokenPrice,
      phase2TokenPrice,
      currentTokenPrice,
      totalTokenAmount,
      totalTokenRaised,
      totalRaised,
      phase1Raised,
      phase2Raised
    } = this.props.crowdsaleDetails;

    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <div>
          <div className={classes.container}>
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
              Sunmait ICO
            </Typography>
            <Typography variant="h4" align="center" gutterBottom>
              status:  {status ? 'in progress' : 'closed'}
            </Typography>
            <Typography variant="h4" align="center">
              Your balance: {this.props.userBalance}
            </Typography>
          </div>
          <div className={classes.container}>
            <Grid container spacing={8} justify="space-evenly">
              <Grid item>
                <Typography variant="h5">
                  start date: {startDate}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5">
                  end date: {endDate}
                </Typography>
              </Grid>
            </Grid>
          </div>
          <div className={classes.container}>
            <Typography variant="h4" align="center">
              Current phase: {status}
            </Typography>
            <Typography variant="h5" align="center">
              Token price: <span>{currentTokenPrice}</span>
            </Typography>
          </div>
          <div className={classes.container}>
            <Grid container spacing={32} justify="space-evenly">
              <Grid item>
                <Card>
                  <CardContent>
                    <Typography variant="h6" align="center">
                      Phase 1
                    </Typography>
                    <Typography variant="overline" align="center">
                      token price: {phase1TokenPrice}
                    </Typography>
                    <Typography className={classes.inlineTypography} variant="overline" align="center">
                      start date: {startDate}
                    </Typography>
                    <Typography className={classes.inlineTypography} variant="overline" align="center">
                      end date: {phase1EndDate}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card>
                  <CardContent>
                    <Typography variant="h6" align="center">
                      Phase 2
                    </Typography>
                    <Typography variant="overline" align="center">
                      token price: {phase2TokenPrice}
                    </Typography>
                    <Typography className={classes.inlineTypography} variant="overline" align="center">
                      start date: {phase1EndDate}
                    </Typography>
                    <Typography className={classes.inlineTypography} variant="overline" align="center">
                      end date: {endDate}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
          <div className={classes.progressBarContainer}>
            <span>0</span>
            <LinearProgress classes={{root: classes.progressBar}} variant="determinate" value={normalizeValue(0, totalTokenAmount, totalTokenAmount - totalTokenRaised)} />
            <span>{totalTokenAmount}</span>
          </div>
          <div className={classes.flexContainer}>
            <Button variant="contained"onClick={this.togglePurchaseTokensModal} color="primary">
              buy
            </Button>
          </div>
          <div className={classes.container}>
            <Grid container spacing={16} justify="center">
              <Grid item xs={12}>
                <Typography variant="h5" align="center">
                  Total ETH raised: {totalRaised}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="overline" align="center">
                  Phase 1 raised: {phase1Raised}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="overline" align="center">
                  Phase 2 raised: {phase2Raised}
                </Typography>
              </Grid>
            </Grid>
          </div>
          <TokenPurchaseForm />
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(HomePageComponent);