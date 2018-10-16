const calculateEthereumPrice = (tokensAmount, exchangeRate) => ({
  field: 'eth',
  value: tokensAmount ? parseFloat(tokensAmount / exchangeRate).toFixed(3) : 0,
  recalculated: true
});

const calculateTokensAmount = (ethereum, exchangeRate) => ({
  field: 'tokens',
  value: ethereum ? parseFloat(ethereum * exchangeRate).toFixed(3) : 0,
  recalculated: true
});

const calculateFormValues = (field, value, exchangeRate) => {
  switch (field) {
    case 'tokens':
      return calculateEthereumPrice(value, exchangeRate);
    case 'eth':
      return calculateTokensAmount(value, exchangeRate);
  }
}

const tokenPurchaseFormMiddleware = store => next => action => {
  if (action.type === '@@redux-form/CHANGE' && action.meta.form === 'tokenPurchase' && !action.meta.recalculated) {
    const { currentTokenPrice } = store.getState().crowdsale.crowdsaleDetails;
    const { field, value, recalculated } = calculateFormValues(action.meta.field, action.payload, currentTokenPrice);
    const meta = {
      ...action.meta,
      field,
      recalculated
    };
    store.dispatch({
      type: '@@redux-form/CHANGE',
      payload: value,
      meta
    });
  }
  next (action);
};

export default tokenPurchaseFormMiddleware;