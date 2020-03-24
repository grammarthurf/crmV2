import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user.service';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CrudService {
  username: any;
  // baseUrl = "http://127.0.0.1:8000/";
  // baseUrl = "http://192.168.10.205:8000/"
  baseUrl = "http://remoto.vedois.com.br:8001/";
  basetoken = JSON.parse(localStorage.getItem('token'));
  token = 'Token ' + this.basetoken;
  htttpHeaders = new HttpHeaders().set("Content-Type", "application/json" ).set('Authorization', this.token);
  httploginheaders = new HttpHeaders().set("Content-Type", "application/json");
  body: any;
  constructor(private http: HttpClient, private user: UserService, private cookies: CookieService) {}

  // User Authentication

  public login(user): Observable<any>  {
    // this.prilogin(user);
    this.username = user.username;
    return this.http.post(this.baseUrl + 'api-token-auth/', JSON.stringify(user),{
      headers: this.httploginheaders
    });
  }

  public logout() {
    localStorage.clear();
    this.basetoken = '';
    console.log('logout clikce');
    console.log(this.token);


  }

  public registerUser(user): Observable<any>{
    this.username = user.username;
    return this.http.post(`${this.baseUrl}auth/users/`, user , {
      headers: this.htttpHeaders
    });
  }

  public getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}auth/users/`, {
      headers: this.htttpHeaders
    });
  }

  // GET ALL API

  public getErpes(): Observable<any> {
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
    console.log(this.token);

    return this.http.get(`${this.baseUrl}ticket/`, {
      headers: this.htttpHeaders
    });
  }
  public getVendedor(): Observable<any> {
    return this.http.get(`${this.baseUrl}auth/users/`, {
      headers: this.htttpHeaders
    });
  }
  public getAtividade(): Observable<any> {
    return this.http.get(`${this.baseUrl}atividade/`, {
      headers: this.htttpHeaders
    });
  }

  public getVendedorExt(): Observable<any> {
    return this.http.get(`${this.baseUrl}vendext/`, {
      headers: this.htttpHeaders
    });
  }

  // GET ID
  public getTicket(id): Observable<any> {
    return this.http.get(`${this.baseUrl}ticket/${id}/`, {
      headers: this.htttpHeaders
    });
  }

  public getErp(id): Observable<any> {
    return this.http.get(`${this.baseUrl}erp/${id}/`, {
      headers: this.htttpHeaders
    });
  }

  public getVendedores(id): Observable<any> {
    return this.http.get(`${this.baseUrl}vendedor/${id}/`, {
      headers: this.htttpHeaders
    });
  }

  public getAtividades(id): Observable<any> {
    return this.http.get(this.baseUrl + 'atividade/' + id + '/', {
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


  public getProduto(id): Observable<any> {
    return this.http.get(`${this.baseUrl}produto/${id}/`, {
      headers: this.htttpHeaders
    });
  }

  public getRamos(id): Observable<any> {
    return this.http.get(`${this.baseUrl}ramo/${id}/`, {
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

  public saveNewVendedorExt(vendext): Observable<any> {
    return this.http.post(this.baseUrl + "vendext/", vendext, {
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

  public updateRamo(ramo): Observable<any> {
    return this.http.put(this.baseUrl + 'ramo/' + ramo.id + '/' , ramo, {
      headers: this.htttpHeaders
    });
  }

  public UpdateProduct(prod): Observable<any> {
    return this.http.put(this.baseUrl + 'produto/' + prod.id + '/' , prod, {
      headers: this.htttpHeaders
    });
  }

  public updateatv(atv): Observable<any> {
    return this.http.put(this.baseUrl + 'atividade/' + atv.position + '/' , atv, {
      headers: this.htttpHeaders
    });
  }

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

  public updateTicketDetails(ticket, mtvperd, cmtperd): Observable<any> {

    if (ticket.status === 'Perdido') {
        console.log('caiu if')
        this.body =  { id: parseInt(ticket.id),
        titulo: ticket.titulo,
        estagio: ticket.estagio.id,
        cliente: ticket.cliente.id.toString(),
        org: ticket.org.id.toString(),
        produto: ticket.produto,
        valorestimado: ticket.valorestimado,
        termometro: ticket.termometro,
        vendedor: ticket.vendedor,
        obs: ticket.obs,
        status: ticket.status,
        mtvperd: mtvperd,
        cmtperd: cmtperd };
    } else {
      console.log('caiu else')
      this.body =  { id: parseInt(ticket.id),
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
    }

    console.log('body:', this.body);

    return this.http.put(this.baseUrl + 'ticket/' + ticket.id + '/' , this.body, {
      headers: this.htttpHeaders
    });
  }

  public updateTicketTerm(idterm): Observable<any> {

    const body =  { id: parseInt(idterm.id), term: idterm.term, opt: 'term' };
    console.log('body:', body);

    return this.http.put(this.baseUrl + 'ticket/' + idterm.id + '/' , body, {
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

  public updateErp(erp): Observable<any> {

    // const body =  { id: parseInt(erp.id),
    //                 codigo: erp.codigo,
    //                 desc: erp.desc,
    //                 empresa: erp.empresa};
    // console.log('body:', body);

    return this.http.put(this.baseUrl + 'erp/' + erp.position + '/' , erp, {
      headers: this.htttpHeaders
    });
  }

  public UpdateOrgMain(org): Observable<any> {
    return this.http.put(this.baseUrl + 'orgs/' + org.id + '/' , org, {
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
  public deleteActivity(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'atividade/' + id + '/', {
      headers: this.htttpHeaders
    });
  }

  public deleteOrg(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'orgs/' + id + '/', {
      headers: this.htttpHeaders
    });
  }

  public deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'produto/' + id + '/', {
      headers: this.htttpHeaders
    });
  }

  public deleteERP(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'erp/' + id + '/', {
      headers: this.htttpHeaders
    });
  }

  public deleteRamo(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'ramo/' + id + '/', {
      headers: this.htttpHeaders
    });
  }
}
