from django.db import models

# Create your models here.


class Estagio (models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome


class Organizacao (models.Model):
    nome = models.CharField(max_length=100)
    erp = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.nome


class Cliente(models.Model):
    nome = models.CharField(max_length=100)
    tipo = models.CharField(max_length=5, null=True)
    fone = models.CharField(max_length=15, null=True)
    celular = models.CharField(max_length=15, null=True)
    email = models.CharField(max_length=100, null=True)
    skype = models.CharField(max_length=65, null=True)
    termometro = models.CharField(max_length=15, null=True)
    org = models.ForeignKey(Organizacao, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.nome


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
    descricao = models.CharField(max_length=100)
    estagio = models.ForeignKey(Estagio, on_delete=models.CASCADE, null=True)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, null=True)
    org = models.ForeignKey(Organizacao, on_delete=models.CASCADE, null=True)
    produto = models.ManyToManyField(Produto)
    termometro = models.CharField(max_length=100, null=True)
    vendedor = models.ForeignKey(Vendedor, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.descricao


class Atividade (models.Model):
    descricao = models.CharField(max_length=255)
    tipo = models.CharField(max_length=64)
    duracao = models.CharField(max_length=64)
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, null=True)
