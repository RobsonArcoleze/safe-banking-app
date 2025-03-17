import { HttpErrorResponse } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { MessageService, ConfirmationService } from 'primeng/api';

import { GetTransferExtract } from 'src/app/models/interfaces/getTransferExtract';
import { TransferService } from 'src/app/services/transfer/transfer.service';

@Component({
  selector: 'app-transfer-table',
  templateUrl: './transfer-table.component.html',
  styleUrls: ['./transfer-table.component.css']
})
export class TransferTableComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject();

  public transfers: GetTransferExtract[] = [];

  constructor(
    private service: TransferService,
    private router: Router,
    private msg: MessageService,
    private confirmationService: ConfirmationService
  ) { }


  ngOnInit() {
    this.getAllTransfer();
  }

  getAllTransfer(){
    this.service.getAllTransfers()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (resp) => {
        if(resp.length > 0){
          this.transfers = resp;
          console.log(this.transfers);

        }
      },
      error: (err) => {
        console.log(err);
        this.msg.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Nenhuma tranferência encotrada: ${err.error.message}`
        })
      }
    })
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
