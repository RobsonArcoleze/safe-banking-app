import { Account } from "./account";

export interface GetTransferExtract{
  id: Number;
  accountOrigin: Account;
  accountDestination: Account;
  transferValue: Number;
  transferValueFormatted: string;
  dateSchedule: Date;
  dateScheduleFormated: string;
  dateTransfer: Date;
  dateTransferFormated: string;
  rate: Number;
  rateFormated: string
}
