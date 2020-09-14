import { NgModule } from '@angular/core';
import {
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule, NbDialogModule,
    NbIconModule,
    NbInputModule, NbPopoverModule, NbSelectModule, NbTabsetModule, NbTooltipModule,
    NbTreeGridModule, NbWindowModule
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';

@NgModule({
  imports: [
    NbCardModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbDialogModule,
    NbInputModule,
    NbPopoverModule,
    NbSelectModule,
    NbTabsetModule,
    NbTooltipModule,
    NbWindowModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class TablesModule { }
