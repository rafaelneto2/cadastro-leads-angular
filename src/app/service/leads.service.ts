import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  URL_API: string = 'http://localhost:3000/leads/';

  constructor(
    private http: HttpClient
  ) { }

  listarLeads(): Observable<any> {
    return this.http.get(this.URL_API)
  }

  getLead(id: number): Observable<any> {
    return this.http.get(this.URL_API + id)
  }

  consultaCEP(cep: string): Observable<any> {
    return this.http.get(`//viacep.com.br/ws/${cep}/json`)
  }

  criaLead(value: any): Observable<any> {
    return this.http.post(this.URL_API, value)
  }

  excluiLead(id: number): Observable<any> {
    return this.http.delete(this.URL_API + id)
  }

  editaLead(id: number, value: any): Observable<any> {
    return this.http.put(this.URL_API + id, value)
  }
}
