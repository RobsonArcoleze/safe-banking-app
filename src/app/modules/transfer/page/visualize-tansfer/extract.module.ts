import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { VisualizeTansferComponent } from './visualize-tansfer.component';
import { TransferTableComponent } from '../../components/transfer-table/transfer-table.component';
import { EXTRACT } from './extract.routing'

/* PRIMENG */
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService } from 'primeng/api';
import { SharedModule } from "../../../../shared/shared.module";



@NgModule({
  declarations: [
    VisualizeTansferComponent,
    TransferTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(EXTRACT),
    /* PRIME-NG */
    CardModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DynamicDialogModule,
    DropdownModule,
    ConfirmDialogModule,
    TooltipModule,
    SharedModule
],
  providers: [DialogService, ConfirmationService]
})
export class ExtractModule { }
