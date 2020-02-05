from django.contrib import admin
from .models import Cliente, Estagio, Organizacao, Produto, Ticket

# Register your models here.

admin.site.register(Cliente)
admin.site.register(Estagio)
admin.site.register(Organizacao)
admin.site.register(Produto)
admin.site.register(Ticket)
