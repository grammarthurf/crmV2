import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CrudService {
  baseUrl = "http://127.0.0.1:8000/";
  htttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {}

  // GET ALL API

  public getClientes(): Observable<any> {
    return this.http.get(`${this.baseUrl}clientes/`, {
      headers: this.htttpHeaders
    });
  }
  public getEstagios(): Observable<any> {
    return this.http.get(`${this.baseUrl}estagio/`, {
      headers: this.htttpHeaders
    });
  }
  public getOrgs(): Observable<any> {
    return this.http.get(`${this.baseUrl}orgs/`, {
      headers: this.htttpHeaders
    });
  }
  public getProdutos(): Observable<any> {
    return this.http.get(`${this.baseUrl}produto/`, {
      headers: this.htttpHeaders
    });
  }
  public getTickets(): Observable<any> {
    return this.http.get(`${this.baseUrl}ticket/`, {
      headers: this.htttpHeaders
    });
  }
  public getVendedor(): Observable<any> {
    return this.http.get(`${this.baseUrl}vendedor/`, {
      headers: this.htttpHeaders
    });
  }
  public getAtividade(): Observable<any> {
    return this.http.get(`${this.baseUrl}atividade/`, {
      headers: this.htttpHeaders
    });
  }
  public getTicket(id): Observable<any> {
    return this.http.get(`${this.baseUrl}ticket/${id}/`, {
      headers: this.htttpHeaders
    });
  }

  // POST API

  public saveNewTicket(ticket): Observable<any> {
    return this.http.post(this.baseUrl + "ticket/", ticket, {
      headers: this.htttpHeaders
    });
  }

  public saveNewProduto(produto): Observable<any> {
    return this.http.post(this.baseUrl + "produto/", produto, {
      headers: this.htttpHeaders
    });
  }

  public saveNewAtividade(atividade): Observable<any> {
    return this.http.post(this.baseUrl + "atividade/", atividade, {
      headers: this.htttpHeaders
    });
  }

  public saveNewCliente(cliente): Observable<any> {
    return this.http.post(this.baseUrl + "cliente/", cliente, {
      headers: this.htttpHeaders
    });
  }

  public saveNewEstagio(estagio): Observable<any> {
    return this.http.post(this.baseUrl + "estagio/", estagio, {
      headers: this.htttpHeaders
    });
  }

  public saveNewOrg(org): Observable<any> {
    return this.http.post(this.baseUrl + "orgs/", org, {
      headers: this.htttpHeaders
    });
  }
}
