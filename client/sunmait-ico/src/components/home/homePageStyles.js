export default theme => ({
  container: {
    paddingTop: 20
  },
  inlineTypography: {
    display: 'inline',
    padding: '0 5px'
  },
  progressBarContainer: {
    display: 'flex',
    paddingTop: 40,
    justifyContent: 'center',
    '& span': {
      position: 'relative',
      top: -30
    }
  },
  progressBar: {
    display: 'inline-block',
    width: '60%',
    height: 30
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 20
  }
});