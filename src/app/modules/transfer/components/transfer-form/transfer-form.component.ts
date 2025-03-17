import { AccountSend, TransferSend } from './../../../../models/interfaces/transfer-send';
import { TransferService } from './../../../../services/transfer/transfer.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.css']
})
export class TransferFormComponent implements OnInit, OnDestroy {

  private readonly destroy$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private msg: MessageService,
    private transferService: TransferService
  ) { }


  public transferForm = this.fb.group({
    agencyOrigin: ['', Validators.required],
    accountNumberOrigin: ['', Validators.required],
    digitOrigin: ['', Validators.required],
    bankNumberOrigin: ['', Validators.required],
    agencyDestination: ['', Validators.required],
    accountNumberDestination: ['', Validators.required],
    digitDestination: ['', Validators.required],
    bankNumberDestination: ['', Validators.required],
    valueTransfer: ['', Validators.required],
    transferDateTime: ['', Validators.required],

  })

  ngOnInit() {
  }

  handleSubmitAddCategory():void{
    if(this.transferForm?.value && this.transferForm?.valid){
      const accountOrigin: AccountSend = {
        number: this.transferForm.value.accountNumberOrigin as string,
        bank: this.transferForm.value.bankNumberOrigin as string,
        digit: this.transferForm.value.digitOrigin as string,
        agency: this.transferForm.value.agencyOrigin as string
      }

      const accountDestination: AccountSend = {
        number: this.transferForm.value.accountNumberDestination as string,
        bank: this.transferForm.value.bankNumberDestination as string,
        digit: this.transferForm.value.digitDestination as string,
        agency: this.transferForm.value.agencyDestination as string
      }
      const transferSend : TransferSend = {
        accountOrigin: accountOrigin,
        accountDestination: accountDestination,
        transferValue: Number(this.transferForm.value.valueTransfer),
        dateSchedule: new Date(),
        dateTransfer: new Date(this.transferForm.value.transferDateTime as string)
      }

      this.transferService.createSecheduleTransfer(transferSend)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: (err: HttpErrorResponse) => {
          console.log(err),
          this.msg.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao Agendar Transfêrencia: ${err.error.message}`,
            life: 10000
          })
        },
        complete: () => {
          this.msg.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Transfêrencia Agendada Com Sucesso',
            life: 10000
          })
        }
      })
    }
    this.transferForm.reset();
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
