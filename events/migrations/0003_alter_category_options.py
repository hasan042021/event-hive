# Generated by Django 5.1 on 2024-09-24 12:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_event_thumbnail'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='category',
            options={'verbose_name_plural': 'Categories'},
        ),
    ]
