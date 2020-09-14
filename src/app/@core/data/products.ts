export interface Product {
    date: Date;
    rank: number;
    link: string;
    ASIN: string;
    name: string;
    rating: number;
    reviews: number;
    price: number;
    prime?: boolean;
}

export interface ProductChart {
    label: string;
    value: number;
}

export abstract class ProductData {
    abstract getListData(): any;

    abstract getOutgoingProducts(array1, array2);

    abstract getNewEntriesProducts(array1, array2);

    abstract loadFile(file: string);

    abstract getTop10ProductsPerDay(value);

    abstract getProductsByWeek(value);

    abstract getProductPR(asin: string);

    abstract getAllProductsPR(value);

    abstract getProductAR(asin: string);

    abstract getAllProductsAR(value);

    abstract getProductsByAnsi(asin: string, data: any);
}


