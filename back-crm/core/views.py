
from rest_framework import viewsets
from .serializers import ClienteSerializer, EstagioSerializer, OrganizacaoSerializer, ProdutoSerializer, TicketSerializer, VendedorSerializer, AtividadeSerializer, UserSerializer
from .models import Cliente, Estagio, Organizacao, Produto, Ticket, Vendedor, Atividade, Created, Updated
from django.core import serializers
from django.contrib.auth.models import User
from django.http import JsonResponse


class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class ClienteViewSet(viewsets.ModelViewSet):

    queryset = Cliente.objects.all()
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

    queryset = Organizacao.objects.all()
    serializer_class = OrganizacaoSerializer

    def create(self, request):
        data = request.data
        print('chamou request')
        print(data);
        
       
        C = Organizacao()
        C.razaosocial = data['razaosocial']
        C.nomefantasia = data['nomefantasia']
        C.rua = data['rua']
        C.bairro = data['bairro']
        C.cep = data['cep']
        C.cidade = data['cidade']
        C.uf = data['uf']
        C.erp = data['erp']
        C.save()
        print(data);
        return JsonResponse({'message': 'Worked'})


class ProdutoViewSet(viewsets.ModelViewSet):

    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer


class TicketViewSet(viewsets.ModelViewSet):

    queryset = Ticket.objects.all()
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
        T.obs = data['obs']
        T.created = c
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

      T = Ticket.objects.get(id=data['id'])
      T.estagio = Estagio.objects.get(id=data['estagio'])
      T.status = data['status']
      T.save()

      return JsonResponse({'message': 'Updated'})
      


class VendedorViewSet(viewsets.ModelViewSet):

    queryset = Vendedor.objects.all()
    serializer_class = VendedorSerializer


class AtividadeViewSet(viewsets.ModelViewSet):

    queryset = Atividade.objects.all()
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
