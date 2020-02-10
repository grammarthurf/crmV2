from django.db import models

# Create your models here.


class Estagio (models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome


class Organizacao (models.Model):
    razaosocial = models.CharField(max_length=100, null=True)
    nomefantasia = models.CharField(max_length=100, blank=True, null=True)
    rua = models.CharField(max_length=100, blank=True, null=True)
    bairro = models.CharField(max_length=100, blank=True, null=True)
    cidade = models.CharField(max_length=100, blank=True, null=True)
    uf = models.CharField(max_length=100, blank=True, null=True)
    erp = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.razaosocial


class Cliente(models.Model):
    nome = models.CharField(max_length=100, null=True)
    tipo = models.CharField(max_length=5, null=True)
    fone = models.CharField(max_length=15, null=True)
    celular = models.CharField(max_length=15, null=True)
    email = models.CharField(max_length=100, null=True)
    skype = models.CharField(max_length=65, null=True)
    org = models.ForeignKey(
        Organizacao, related_name='clientes', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return str(self.nome) if self.nome else ' '


class Produto (models.Model):
    nome = models.CharField(max_length=100)
    modalidade = models.CharField(max_length=155, null=True)

    def __str__(self):
        return self.nome


class Vendedor(models.Model):
    nome = models.CharField(max_length=155)

    def __str__(self):
        return self.nome


class Ticket (models.Model):
    titulo = models.CharField(max_length=100, blank=True)
    estagio = models.ForeignKey(
        Estagio, related_name='tickets', on_delete=models.CASCADE, null=True)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, null=True)
    org = models.ForeignKey(Organizacao, on_delete=models.CASCADE, null=True)
    produto = models.ManyToManyField(Produto)
    valorestimado = models.IntegerField(null=True)
    termometro = models.CharField(max_length=100, null=True)
    vendedor = models.ForeignKey(
        Vendedor,  on_delete=models.CASCADE, null=True)
    obs = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.titulo


class Atividade (models.Model):
    assunto = models.CharField(max_length=255)
    data = models.CharField(max_length=64)
    tipo = models.CharField(max_length=64)
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, null=True)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, null=True)
    org = models.ForeignKey(Organizacao, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.assunto
