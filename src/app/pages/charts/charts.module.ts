import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import {NbCardModule, NbOptionModule, NbSelectModule} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { ChartsRoutingModule, routedComponents } from './charts-routing.module';
import { ChartjsBarComponent } from './chartjs/chartjs-bar.component';
import { ChartjsPieComponent } from './chartjs/chartjs-pie.component';

const components = [
  ChartjsBarComponent,
  ChartjsPieComponent,
];

@NgModule({
    imports: [
        ThemeModule,
        ChartsRoutingModule,
        NgxChartsModule,
        ChartModule,
        NbCardModule,
        NbOptionModule,
        NbSelectModule,
    ],
  declarations: [...routedComponents, ...components],
})
export class ChartsModule {}
