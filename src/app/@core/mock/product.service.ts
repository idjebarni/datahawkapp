import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product, ProductChart, ProductData} from '../data/products';
import {DatasourceService} from './datasource.service';

@Injectable({
    providedIn: 'root',
})

export class ProductService extends ProductData {

    data: any;

    constructor(private http: HttpClient, private datasource: DatasourceService) {
        super();
        this.data = [];
        this.sortDataByDate(this.data);
    }

    addDays(date, days): Date {
        const result: Date = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    sortDataByDate(data): any {
        return data.sort((val1, val2) => {
            return new Date(val1.Date).getTime() - new
            Date(val2.Date).getTime();
        });
    }


    loadFile(file) {
        switch (file) {
            case '1': {
                return this.sortDataByDate(this.datasource.getJSON('1'));
                break;
            }
            case '2': {
                return this.sortDataByDate(this.datasource.getJSON('2'));
                break;
            }
            case '3': {
                return this.sortDataByDate(this.datasource.getJSON('3'));
                break;
            }
        }
    }

    removeDuplicate(array: any, key: any) {
        const newArray = [];
        const lookupObject = {};

        for (let i in array) {
            lookupObject[array[i][key]] = array[i];
        }

        for (let i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray;
    }


    getOutgoingProducts(array1, array2) {
        /*
        retourne les élements présents dans array1 et pas dans array 2
        */
        return this.removeDuplicate(array1.filter(function (obj) {
            return !array2.some(function (obj2) {
                return obj.ASIN === obj2.ASIN;
            });
        }), 'ASIN');
    }

    getNewEntriesProducts(array1, array2) {
        /*
        retourne les élements présents dans array2 et pas dans array1
        */
        return this.removeDuplicate(array2.filter(function (obj) {
            return !array1.some(function (obj2) {
                return obj.ASIN === obj2.ASIN;
            });
        }), 'ASIN');
    }

    getTop10ProductsPerDay(value) {
        this.data = this.loadFile(value);
        const top10Products = [];
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].Rank > 0 && this.data[i].Rank <= 10) {
                top10Products.push(this.data[i]);
            }
        }

        return Object.values(top10Products.reduce((acc, cur) => {
            if (!acc[cur.Date])
                acc[cur.Date] = {Date: cur.Date, Products: []};
            acc[cur.Date].Products.push(cur);
            return acc;
        }, {}));
    }

    getTop20ProductsPerDay() {
        const top20Products = [];
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].Rank > 0 && this.data[i].Rank <= 20) {
                top20Products.push(this.data[i]);
            }
        }
        return Object.values(top20Products.reduce((acc, cur) => {
            if (!acc[cur.Date])
                acc[cur.Date] = {Date: cur.Date, Products: []};
            acc[cur.Date].Products.push(cur);
            return acc;
        }, {}));
    }

   getProductsByWeek(value) {
       this.data = this.loadFile(value);
       const productsByWeek = {week1: [], week2: [], week3: [], week4: []};
           for (let i = 0; i < this.data.length; i++) {
               if (new Date(this.data[i].Date).getTime() <= this.addDays(this.data[0].Date, 7).getTime()) {
                   productsByWeek.week1.push(this.data[i]);
               } else if (new Date(this.data[i].Date).getTime() <= this.addDays(this.data[0].Date, 14).getTime()) {
                   productsByWeek.week2.push(this.data[i]);
               } else if (new Date(this.data[i].Date).getTime() <= this.addDays(this.data[0].Date, 21).getTime()) {
                   productsByWeek.week3.push(this.data[i]);
               } else if (new Date(this.data[i].Date).getTime() <= this.addDays(this.data[0].Date, 29).getTime()) {
                   productsByWeek.week4.push(this.data[i]);
               }
           }
           return productsByWeek;
    }


    getAllProductsPR(value) {
        this.data = this.loadFile(value);
        const productsArray = [];
        for (let i = 0; i < this.data.length; i++) {
            productsArray.push(this.getProductPR(this.data[i].ASIN));
        }
        return this.removeDuplicate(productsArray, 'Product');
    }

    getProductPR(asin: string) {
        const productsArray = [];
        const products = this.getProductsByAnsi(asin, this.data);
        for (let i = 0; i < products.length; i++) {
            if (products[i].Rank <= 10) {
                productsArray.push(products[i]);
            }
        }
        return {'Product': asin, 'PresenceRate': parseInt(((productsArray.length / 30) * 100).toString())};
    }

    getAllProductsAR(value) {
        this.data = this.loadFile(value);
        const products = [];
        for (let i = 0; i < this.data.length; i++) {
            products.push(this.getProductAR(this.data[i].ASIN));
        }
        return this.removeDuplicate(products, 'Product');
    }

    getProductAR(asin: string) {
        const products = this.getProductsByAnsi(asin, this.data);
        let sum: number = 0;
        for (let i = 0; i < products.length; i++) {
            sum += products[i].Rank;
        }
        return {'Product': asin, 'averageRanking': parseInt((sum / products.length).toString())};
    }

    getProductsByAnsi(asin: string, data: any) {
        const productsArray = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].ASIN === asin) {
                productsArray.push(data[i]);
            }
        }
        return productsArray;
    }

    getListData(): any {
        return this.data;
    }

    private ngOnInit() {

    }
}
