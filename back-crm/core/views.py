
from rest_framework import viewsets
from .serializers import ClienteSerializer, EstagioSerializer, OrganizacaoSerializer, ProdutoSerializer, TicketSerializer, VendedorSerializer, ErpSerializer, RamoSerializer, AtividadeSerializer, UserSerializer, ObsSerializer, VendedorExtSerializer
from .models import Cliente, Estagio, Organizacao, Produto, Ticket, Vendedor, Atividade, Created, Updated, Erp, Ramo, Obs, VendedorExt
from django.core import serializers
from django.contrib.auth.models import User
from django.http import JsonResponse


class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class ObsViewSet(viewsets.ModelViewSet):
    queryset = Obs.objects.all().order_by('-id')
    serializer_class = ObsSerializer


class RamoViewSet(viewsets.ModelViewSet):

    queryset = Ramo.objects.all().order_by('-id')
    serializer_class = RamoSerializer


class ErpViewSet(viewsets.ModelViewSet):

    queryset = Erp.objects.all().order_by('-id')
    serializer_class = ErpSerializer


class ClienteViewSet(viewsets.ModelViewSet):

    queryset = Cliente.objects.all().order_by('-id')
    serializer_class = ClienteSerializer

    def create(self, request):
        data = request.data

        print(data);

        C = Cliente()
        C.nome = data['nome']
        C.tipo = data['tipo']
        C.fone = data['fone']
        C.celular = data['celular']
        C.email = data['email']
        C.skype = data['skype']
        # C.org = Organizacao.objects.get(id=data['org'])
        C.save()
        print(data);
        return JsonResponse({'message': 'Worked'})


class EstagioViewSet(viewsets.ModelViewSet):

    queryset = Estagio.objects.all()
    serializer_class = EstagioSerializer


class OrganizacaoViewSet(viewsets.ModelViewSet):

    queryset = Organizacao.objects.all().order_by('-id')
    serializer_class = OrganizacaoSerializer

    def create(self, request):
        data = request.data
        print('chamou request')
        print(data);

        C = Organizacao()
        C.codigo = data['codigo']
        C.razaosocial = data['razaosocial']
        C.nomefantasia = data['nomefantasia']
        C.telefone = data['telefone']
        C.rua = data['rua']
        C.complemento = data['complemento']
        C.bairro = data['bairro']
        C.cep = data['cep']
        C.cidade = data['cidade']
        C.uf = data['uf']
        try:
            C.email = data['email']
            C.site = data['site']
        except:
            pass
        try:
            C.cnpj = data['cnpj']
        except:
            pass
        try:
            C.ramo = Ramo.objects.get(id=int(data['ramo']))
        except:
            pass
        C.ie = data['ie']
        try:
            C.erpe = Erp.objects.get(id=int(data['erp']))
        except:
            pass
        C.save()
        contatos = data['contatos']
        for i in contatos:
            print('CONTATOS : ', i);

            o = Cliente()
            o.nome = i['nome']
            o.email = i['email']
            o.cargo = i['cargo']
            o.dep = i['dep']
            o.birth = i['birth']
            o.tel = i['tel']
            o.cel = i['cel']
            o.skype = i['skp']
            o.save()
            C.contatos.add(o)
            C.save()

        print(data);
        return JsonResponse({'message': 'Worked'})
    
    def update(self, request, pk):
        data = request.data
        print(data)

        O = Organizacao.objects.get(id=int(data['id']))
        O.codigo = data['codigo']
        O.razaosocial = data['razaosocial']
        O.nomefantasia = data['nomefantasia']
        O.telefone = data['telefone']
        O.rua = data['rua']
        O.complemento = data['complemento']
        O.bairro = data['bairro']
        O.cep = data['cep']
        O.cidade = data['cidade']
        O.uf = data['uf']
        try:
            O.email = data['email']
            O.site = data['site']
        except:
            pass
        try:
            O.cnpj = data['cnpj']
        except:
            pass
        
        O.ramo = Ramo.objects.get(id=int(data['ramos']['id']))
        O.ie = data['ie']
        
        O.erpe = Erp.objects.get(id=int(data['erp']))
        
        O.save()

        O.contatos.clear()
        contatos = data['contatos']
        for i in contatos:
            print('CONTATOS : ', i);
            
            o = Cliente()
            o.nome = i['nome']
            o.email = i['email']
            o.cargo = i['cargo']
            o.dep = i['dep']
            o.birth = i['birth']
            o.tel = i['tel']
            o.cel = i['cel']
            try:
                o.skype = i['skype']
            except:
                o.skype = i['skp']
            o.save()
            O.contatos.add(o)
            O.save()
        return JsonResponse({'message': 'Worked'})


class ProdutoViewSet(viewsets.ModelViewSet):

    queryset = Produto.objects.all().order_by('-id')
    serializer_class = ProdutoSerializer


class VendedorExtViewSet(viewsets.ModelViewSet):

    queryset = VendedorExt.objects.all().order_by('-id')
    serializer_class = VendedorExtSerializer



class TicketViewSet(viewsets.ModelViewSet):

    queryset = Ticket.objects.all().order_by('-id')
    serializer_class = TicketSerializer

    def create(self, request):
        data = request.data

        print(data['titulo']);

        c = Created()
        c.save()
        T = Ticket()
        T.titulo = data['titulo']
        T.estagio = Estagio.objects.get(id=int(data['estagio']))
        T.cliente = Cliente.objects.get(id=int(data['cliente']))
        T.org = Organizacao.objects.get(id=int(data['org']))
        T.valorestimado = int(data['valorestimado'])
        T.termometro = data['termometro']
        T.status = 'Aberto'

        T.created = c
        T.save()
        try:
            if data['obs'].length >= 1:
                for i in data['obs']:
                    k = Obs()
                    k.texto = i
                    k.save()
                    T.obs.add(k)
                    T.save()
        except:
            k = Obs()
            k.texto = data['obs']
            k.save()
            T.obs.add(k)
            T.save()
        

        produtos = data['produto']
        for prod in produtos:
            T.produto.add(Produto.objects.get(id=prod))
        
        T.save()
        print(data);
        return JsonResponse({'message': 'Saved'})


        
    def update(self, request, pk):
      data = request.data
      print(data);
      
      try:
        T = Ticket.objects.get(id=data['id'])
        T.estagio = Estagio.objects.get(id=data['estagio'])
        T.status = data['status']
        if T.status == 'Perdido':
            T.mtvperd = data['mtvperd']
            T.cmtperd = data['cmtperd']
        T.save()
        print('Ticket salvo : ',T.cmtperd , T.mtvperd)
      except:
          pass



      try:
        if data['opt'] == 'term':
            print('entrou opt ');
            
            T = Ticket.objects.get(id=data['id'])
            T.termometro = data['term']
            T.save()
      except:
          pass


  

      try:  
        if data['opt'] == 'obs':
            o = Obs()
            o.texto = data['obs']
            T = Ticket.objects.get(id=data['id'])
            o.save()
            T.obs.add(o)
            T.save()
      except:
          pass  

    

     



      return JsonResponse({'message': 'Updated'})
      


class VendedorViewSet(viewsets.ModelViewSet):

    queryset = Vendedor.objects.all().order_by('-id')
    serializer_class = VendedorSerializer


class AtividadeViewSet(viewsets.ModelViewSet):

    queryset = Atividade.objects.all().order_by('id')
    serializer_class = AtividadeSerializer

    def create(self, request):
        data = request.data
        print(data)

        A = Atividade()
        A.dataini = data['dataini']
        A.datafim = data['datafim']
        A.horaini = data['horaini']
        A.horafim = data['horafim']
        A.assunto = data['assunto']
        A.ticket = Ticket.objects.get(id=int(data['ticket']))
        A.cliente = Cliente.objects.get(id=int(data['cliente']))
        A.org = Organizacao.objects.get(id=int(data['org']))
        A.tipo = data['tipo']
        A.save()
        return JsonResponse({'message': 'atividadecreated'})

    def update(self, request, pk):
      data = request.data
      print(data);
      A = Atividade.objects.get(id=data['position'])
      A.dataini = data['dataini']
      A.datafim = data['datafim']
      A.horaini = data['horaini']
      A.horafim = data['horafim']
      A.assunto = data['assunto']
      A.ticket = Ticket.objects.get(id=int(data['ticket']['id']))
      A.cliente = Cliente.objects.get(id=int(data['cliente']['id']))
      A.org = Organizacao.objects.get(id=int(data['org']['id']))
      A.tipo = data['tipo']
      A.save()
      
      return JsonResponse({'message': 'atividadesupdated'})
        
      
