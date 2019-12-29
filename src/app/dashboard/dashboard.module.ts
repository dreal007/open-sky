import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent, DialogPanelDialog } from './home/home.component';
import { AngularMaterialModule } from 'src/app/modules/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { MatDialogModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogRef } from '@angular/material';
import { FlightComponent } from './flight/flight.component';


@NgModule({
  declarations: [HomeComponent, DialogPanelDialog, FlightComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    LayoutModule,
    MatDialogModule,
    MatTabsModule
  ],
  entryComponents: [
    DialogPanelDialog
  ],
  // providers: [{ provide: MatDialogRef}],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
