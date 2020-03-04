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

  public getErp(): Observable<any> {
    return this.http.get(`${this.baseUrl}erp/`, {
      headers: this.htttpHeaders
    });
  }

  public getRamo(): Observable<any> {
    return this.http.get(`${this.baseUrl}ramo/`, {
      headers: this.htttpHeaders
    });
  }

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

  // GET ID
  public getTicket(id): Observable<any> {
    return this.http.get(`${this.baseUrl}ticket/${id}/`, {
      headers: this.htttpHeaders
    });
  }

  public getVendedores(id): Observable<any> {
    return this.http.get(`${this.baseUrl}vendedor/${id}/`, {
      headers: this.htttpHeaders
    });
  }

  public getPerson(id): Observable<any> {
    return this.http.get(`${this.baseUrl}clientes/${id}/`, {
      headers: this.htttpHeaders
    });
  }

  public getOrg(id): Observable<any> {
    return this.http.get(`${this.baseUrl}orgs/${id}/`, {
      headers: this.htttpHeaders
    });
  }

  // POST API

  public saveNewRamo(ramo): Observable<any> {
    return this.http.post(this.baseUrl + "ramo/", ramo, {
      headers: this.htttpHeaders
    });
  }

  public saveNewErp(erp): Observable<any> {
    return this.http.post(this.baseUrl + "erp/", erp, {
      headers: this.htttpHeaders
    });
  }

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
    return this.http.post(this.baseUrl + "clientes/", cliente, {
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

  // PUT API

  public updateTicket(estagioUpdate, ticket): Observable<any> {

    console.log('ESTAGIOUPDADE :' , typeof(estagioUpdate));
    const body =  { id: parseInt(ticket.id),
                    titulo: ticket.titulo,
                    estagio: estagioUpdate.toString(),
                    cliente: ticket.cliente.id.toString(),
                    org: ticket.org.id.toString(),
                    produto: ticket.produto,
                    valorestimado: ticket.valorestimado,
                    termometro: ticket.termometro,
                    vendedor: ticket.vendedor,
                    obs: ticket.obs,
                    status: ticket.status};
    console.log('body:', body);

    return this.http.put(this.baseUrl + 'ticket/' + ticket.id + '/' , body, {
      headers: this.htttpHeaders
    });
  }

  public updateTicketDetails(ticket): Observable<any> {

    const body =  { id: parseInt(ticket.id),
                    titulo: ticket.titulo,
                    estagio: ticket.estagio.id,
                    cliente: ticket.cliente.id.toString(),
                    org: ticket.org.id.toString(),
                    produto: ticket.produto,
                    valorestimado: ticket.valorestimado,
                    termometro: ticket.termometro,
                    vendedor: ticket.vendedor,
                    obs: ticket.obs,
                    status: ticket.status };
    console.log('body:', body);

    return this.http.put(this.baseUrl + 'ticket/' + ticket.id + '/' , body, {
      headers: this.htttpHeaders
    });
  }

  public updateTicketObs(idobs): Observable<any> {

    const body =  { id: parseInt(idobs.id), obs: idobs.obs, opt: 'obs' };
    console.log('body:', body);

    return this.http.put(this.baseUrl + 'ticket/' + idobs.id + '/' , body, {
      headers: this.htttpHeaders
    });
  }

  public updatePerson(person): Observable<any> {

    const body =  { id: parseInt(person.id),
                    nome: person.nome,
                    tipo: person.tipo,
                    fone: person.fone,
                    celular: person.celular.id,
                    email: person.email,
                    skype: person.skype,
                    org: person.org.id };
    console.log('body:', body);

    return this.http.put(this.baseUrl + 'clientes/' + person.id + '/' , body, {
      headers: this.htttpHeaders
    });
  }

  public updateOrg(org): Observable<any> {

    const body =  { id: parseInt(org.id),
                    codigo: org.codigo,
                    razaosocial: org.razaosocial,
                    nomefantasia: org.nomefantasia,
                    rua: org.rua,
                    bairro: org.bairro,
                    cep: org.cep,
                    cidade: org.cidade,
                    uf: org.uf,
                    erp: org.erp };
    console.log('body:', body);

    return this.http.put(this.baseUrl + 'orgs/' + org.id + '/' , body, {
      headers: this.htttpHeaders
    });
  }

  //DELETE API
  public deleteAtividade(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
