# Generated by Django 3.0.3 on 2020-04-09 18:15

import core.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_file_created'),
    ]

    operations = [
        migrations.AddField(
            model_name='vendedor',
            name='photo',
            field=models.ImageField(null=True, upload_to=core.models.upload_path),
        ),
    ]
