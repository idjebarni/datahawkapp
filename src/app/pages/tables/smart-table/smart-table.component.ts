import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {ProductData} from '../../../@core/data/products';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {


    entryValue = '';
    outputValue = '';
    entryValue1 = '';
    outputValue1 = '';
    data: any;
    weeks: any;
    files = ['1', '2', '3'];

    presenceRateSettings = {
        actions: false,
        columns: {
            Product: {
                title: 'Product\'s ASIN',
                type: 'string',
            },
            PresenceRate: {
                title: 'Presence Rate in %',
                type: 'number',
            },
        },
    };

    averageRankingSettings = {
        actions: false,
        columns: {
            Product: {
                title: 'Product\'s ASIN',
                type: 'string',
            },
            averageRanking: {
                title: 'Average Ranking / 100',
                type: 'number',
            },
        },
    };
    removedProductsSettings = {
        actions: false,
        columns: {
            ASIN: {
                title: 'Product\'s ASIN',
                type: 'string',
            },
            Rank: {
                title: 'Rank',
                type: 'number',
            },
            Reviews: {
                title: 'Reviews',
                type: 'string',
            },
            Name: {
                title: 'Name',
                type: 'string',
            },
        },
    };
    addedProductsSettings = {
        actions: false,
        columns: {
            ASIN: {
                title: 'Product\'s ASIN',
                type: 'string',
            },
            Rank: {
                title: 'Rank',
                type: 'number',
            },
            Reviews: {
                title: 'Reviews',
                type: 'string',
            },
            Name: {
                title: 'Name',
                type: 'string',
            },
        },
    };
  presenceRateData: LocalDataSource = new LocalDataSource();
  averageRankingData: LocalDataSource = new LocalDataSource();
  addedData: LocalDataSource = new LocalDataSource();
  removedData: LocalDataSource = new LocalDataSource();


    constructor(private productService: ProductData) {
    this.data = [];
  }

    getChosenFile(value) {
        this.data = this.productService.getProductsByWeek(value);
        this.weeks = Object.keys(this.data);
        this.averageRankingData.load(this.productService.getAllProductsAR(value));
        this.presenceRateData.load(this.productService.getAllProductsPR(value));
    }

    addedDataCompare() {
        this.addedData.load(this.productService.getNewEntriesProducts(
            this.data[this.entryValue],
            this.data[this.outputValue]));
    }


    oldDataCompare() {
        this.removedData.load(this.productService.getOutgoingProducts(
            this.data[this.entryValue1],
            this.data[this.outputValue1]));
    }

    getEntryWeekOldProd(value) {
        this.entryValue1 = value;
    }

    getOutputWeekOldProd(value) {
        this.outputValue1 = value;
    }

    getEntryWeekNewProd(value) {
        this.entryValue = value;
    }

    getOutputWeekNewProd(value) {
        this.outputValue = value;
    }
}
