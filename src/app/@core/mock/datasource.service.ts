import { Injectable } from '@angular/core';
import firstData from '../../../assets/data/1.json';
import secondData from '../../../assets/data/2.json';
import thirdData from '../../../assets/data/3.json';

@Injectable({
  providedIn: 'root',
})
export class DatasourceService {

  constructor() {

  }

  public getJSON(value) {
    switch (value) {
    case '1': {
      return firstData;
      break;
    }
    case '2': {
      return secondData;
      break;
    }
    case '3': {
      return thirdData;
      break;
    }
  }
}
}
