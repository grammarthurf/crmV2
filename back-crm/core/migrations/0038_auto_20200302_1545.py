# Generated by Django 3.0.3 on 2020-03-02 18:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0037_auto_20200301_2208'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organizacao',
            name='cnpj',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
        migrations.AlterField(
            model_name='organizacao',
            name='codigo',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='organizacao',
            name='complemento',
            field=models.CharField(blank=True, max_length=155, null=True),
        ),
        migrations.AlterField(
            model_name='organizacao',
            name='created',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='core.Created'),
        ),
        migrations.AlterField(
            model_name='organizacao',
            name='ie',
            field=models.CharField(blank=True, max_length=55, null=True),
        ),
        migrations.AlterField(
            model_name='organizacao',
            name='ramo',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='orgs', to='core.Ramo'),
        ),
        migrations.AlterField(
            model_name='organizacao',
            name='razaosocial',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='organizacao',
            name='site',
            field=models.CharField(blank=True, max_length=155, null=True),
        ),
        migrations.AlterField(
            model_name='organizacao',
            name='telefone',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='organizacao',
            name='updated',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='core.Updated'),
        ),
    ]