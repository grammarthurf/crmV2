import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CrudService {
  constructor(private http: HttpClient) {}

  public getClientes(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/clientes`);
  }
  public getEstagios(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/estagio`);
  }
  public getOrgs(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/orgs`);
  }
  public getProdutos(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/produto`);
  }
  public getTickets(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/ticket`);
  }
  public getVendedor(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/vendedor`);
  }
  public getAtividade(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/atividade`);
  }
}
