import {Observable} from 'rxjs/Observable';
import Rx from 'rxjs/Rx';


const createAsset = (assetId, assetType) => {
  return {
    id: assetId,
    assetName: assetType === 'Stock' ? ['AAPL','GOOGL','FB', 'TSLA', 'MSFT'][Math.floor(Math.random() * 4)] : ['EUR','USD','GBP', 'NIS', 'AUD'][Math.floor(Math.random() * 4)],
    price: Math.random()*10,
    lastUpdate: Date.now(),
    type: assetType
  }
};

const getAllAssets = (n) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(createAsset(i, 'Stock'));
    result.push(createAsset(i+n, 'Currency'));
  }
  return result;
}

const assets = getAllAssets(200);
const timeObservable = Rx.Observable;

export const temp ={}