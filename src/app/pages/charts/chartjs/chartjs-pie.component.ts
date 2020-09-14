import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {ProductData} from '../../../@core/data/products';



@Component({
  selector: 'ngx-chartjs-pie',
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
          <nb-select placeholder="Select a date" (selectedChange)="handleDateChange($event)" status="primary">
              <nb-option *ngFor="let option of this.dates" [value]="option"> {{ option }}</nb-option>
          </nb-select>
      </nb-card>
      <chart type="pie" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsPieComponent implements OnDestroy {
  donnes: any;
  data: any;
  options: any;
  themeSubscription: any;
  selected = 'Choose a file'
    dates = [];
    files = ['1', '2', '3'];

    constructor(private theme: NbThemeService, private productService: ProductData) {
        this.donnes = this.productService.getTop10ProductsPerDay('1');
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
            const colors: any = config.variables;
            const chartjs: any = config.variables.chartjs;

            const labels = ["B07HNT8KG2", "B074QXGBG6", "B01N41IPPI", "B073WR319C",
                "B074QTSBS2", "B00NPVCNS8", "B011397784", "B014WOXB6O", "B077MJZ6ZG", "B010S7VZI0"];

            const dataset = ["10808", "29163", "6079", "3725", "31441", "6736", "5485", "2758", "2403", "2934"];

        this.data = {
            labels: labels,
            datasets: [{
                data: dataset,
                backgroundColor: [colors.primaryLight, colors.infoLight,
                    colors.successLight, colors.primaryLight,
                    colors.infoLight, colors.successLight, colors.infoLight, colors.successLight,
                    colors.successLight, colors.primaryLight],
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

          const dataset = [];

          for (let i = 0 ; i < this.donnes.length; i++) {
              for (let j = 0 ; j < this.donnes[i].Products.length; j++) {
                  if (this.donnes[i].Date === value) {
                      labels.push(this.donnes[i].Products[j].ASIN);
                      dataset.push(
                          (this.donnes[i]
                              .Products[j]
                              .Reviews)
                              .toString()
                              .replace('\,','\.'));
                  }
              }
          }

          this.data = {
              labels: labels,
              datasets: [{
                  data: dataset,
                  backgroundColor: [colors.primaryLight, colors.infoLight,
                      colors.successLight, colors.primaryLight,
                      colors.infoLight, colors.successLight, colors.infoLight, colors.successLight,
                      colors.successLight, colors.primaryLight],
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
