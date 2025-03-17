
export interface TransferSend {

    accountOrigin: AccountSend;
    accountDestination: AccountSend;
    transferValue: Number;
    dateSchedule: Date;
    dateTransfer: Date;
}

export interface AccountSend{
  number: string;
  bank: string;
  digit: string;
  agency: string
}
