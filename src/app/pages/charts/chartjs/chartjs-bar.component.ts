import { Component, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import {ProductData} from "../../../@core/data/products";

@Component({
  selector: 'ngx-chartjs-bar',
  template: `
    <nb-card style="
    border: none;
">
      <nb-select placeholder="Select a file" (selectedChange)="getChoosedFile($event)" status="primary">
        <nb-option *ngFor="let option of this.files" [value]="option"> {{ option }}</nb-option>
      </nb-select>
    </nb-card>
    <nb-card style="
    border: none;
">
      <nb-select placeholder="Choose a date"  (selectedChange)="handleDateChange($event)" status="primary">
        <nb-option *ngFor="let option of this.dates" [value]="option"> {{ option }}</nb-option>
      </nb-select>
    </nb-card>
    <chart type="bar" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsBarComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;
  donnes: any;
  dates = [];
  files = ['1', '2', '3'];

  constructor(private theme: NbThemeService, private productService: ProductData) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      const labels = ["B07HNT8KG2", "B074QXGBG6", "B01N41IPPI", "B073WR319C", "B074QTSBS2", "B00NPVCNS8", "B011397784", "B014WOXB6O", "B077MJZ6ZG", "B010S7VZI0"];
      const reviewsData = ["108.08", "291.63", "60.79", "37.25", "314.41", "67.36", "54.85", "27.58", "24.03", "29.34"];

      const priceData = ["135.99", "60.99", "32.99", "59.99", "82.1", "75.92", "76.99", "9.99", "23.99", "59.99"];
      this.data = {
        labels: labels,
        datasets: [{
          data: priceData,
          label: 'Price',
          backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
        }, {
          data: reviewsData,
          label: 'Reviews / 100',
          backgroundColor: NbColorHelper.hexToRgbA(colors.infoLight, 0.8),
        }],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }

  getChoosedFile(value) {
    this.dates = [];
    this.donnes = this.productService.getTop10ProductsPerDay(value);
    for (let i = 0 ; i < this.donnes.length; i++) {
      this.dates.push(this.donnes[i].Date);
    }
  }

  handleDateChange(value) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      const labels = [];

      const reviewsData = [];
      const priceData = [];

      for (let i = 0 ; i < this.donnes.length; i++) {
        for (let j = 0 ; j < this.donnes[i].Products.length; j++) {
          if (this.donnes[i].Date === value) {
            labels.push(this.donnes[i].Products[j].ASIN);
            priceData.push(
                (this.donnes[i]
                    .Products[j]
                    .Price)
                    .toString()
                    .replace('\,', '\.'));
            reviewsData.push((this.donnes[i]
                .Products[j]
                .Reviews / 100)
                .toString()
                .replace('\,', '\.'));
          }
        }
      }
      this.data = {
        labels: labels,
        datasets: [{
          data: reviewsData,
          label: 'Price',
          backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
        }, {
          data: priceData,
          label: 'Reviews / 100',
          backgroundColor: NbColorHelper.hexToRgbA(colors.infoLight, 0.8),
        }],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }



  ngOnDestroy(): void {
  }
}
