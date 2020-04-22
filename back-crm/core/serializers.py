from .models import Cliente, Estagio, Organizacao, Produto, Ticket, Vendedor, Atividade, Erp, Ramo, Obs, VendedorExt
from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, request, validated_data):
        print('USERSENDOCRIADO: ', request.data)

        user = User.objects.create(**validated_data)
        return user


class RamoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ramo
        fields = '__all__'
        depth = 1


class VendedorExtSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendedorExt
        fields = '__all__'
        depth = 1


class ErpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Erp
        fields = '__all__'
        depth = 1


class AtividadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Atividade
        # cliente = ClienteSerializer(many=False, read_only=True)
        fields = '__all__'
        depth = 2


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        atividade = AtividadeSerializer(many=False, read_only=True)
        fields = '__all__'
        depth = 1


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['id', 'titulo', 'estagio', 'cliente',
                  'org', 'produto', 'valorestimado', 'termometro',
                  'vendedor', 'obs', 'status', 'created', 'updated',
                  'atividades', 'vendedorext', 'mtvperd', 'cmtperd', 'file']
        depth = 3


class EstagioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estagio
        tickets = TicketSerializer(many=False, read_only=True)
        fields = ['id', 'nome', 'tickets']
        depth = 1


class OrganizacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organizacao
        fields = ['id', 'codigo', 'razaosocial', 'nomefantasia', 'rua',
                  'bairro', 'cidade', 'uf', 'erpe', 'ramo', 'telefone',  'contatos', 'complemento', 'cnpj', 'ie', 'cep', 'email', 'site']
        depth = 1


class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = ['id', 'nome', 'codigo', 'modalidade']


class VendedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendedor
        fields = ['id', 'nome']


class ObsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Obs
        fields = ['id', 'texto', 'data']
        depth = 2
