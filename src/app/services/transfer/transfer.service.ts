import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environments.prod';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { TransferSend } from 'src/app/models/interfaces/transfer-send';
import { GetTransferExtract } from 'src/app/models/interfaces/getTransferExtract';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private API_URL = environment.API_URL;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };
  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) { }

  createSecheduleTransfer(requestDatas: TransferSend): Observable<void>{
    return this.http.post<void>(`${this.API_URL}/transfer`, requestDatas, this.httpOptions)
  }

  getAllTransfers(): Observable<GetTransferExtract[]>{
    return this.http.get<GetTransferExtract[]>(`${this.API_URL}/transfer`, this.httpOptions)
  }
}
