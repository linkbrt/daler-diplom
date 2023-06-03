from django.db import models
from django.contrib.auth.models import AbstractUser


class Profile(AbstractUser):
    card_num = models.TextField(blank=True, null=True)
    image = models.ImageField(blank=True, null=True, upload_to="uploads/")


class ItemTypes(models.TextChoices):
    PACK = 'PK', ('Sample pack')
    PLUGIN = 'PL', ('Plugin')
    PRESET = 'PR', ('VST Presets')

class Item(models.Model):
    type = models.TextField(max_length=2, choices=ItemTypes.choices)
    title = models.TextField()
    path = models.FileField()
    price = models.IntegerField()
    file = models.FileField(null=True, blank=True)


class Transaction(models.Model):
    date = models.DateField()
    item = models.ForeignKey(Item, on_delete=models.DO_NOTHING)
    price = models.IntegerField()
