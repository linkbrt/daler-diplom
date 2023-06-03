from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from rest_framework.decorators import api_view, permission_classes

from .models import Profile, Item, ItemTypes
from .serializers import ProfileSerializer, ItemSerializer


@api_view(['POST',])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = get_object_or_404(Profile, id=request.user.id)

    return Response(data=ProfileSerializer(instance=user).data, status=status.HTTP_200_OK)

@api_view(['POST',])
@permission_classes([IsAuthenticated])
def set_user_image(request):
    user = get_object_or_404(Profile, id=request.user.id)
    user.image = request.FILES['image']
    user.save()
    return Response()

@api_view(['POST',])
@permission_classes([IsAuthenticated])
def set_user_card(request):
    user = get_object_or_404(Profile, id=request.user.id)
    user.card_num = request.data.get('card_num')
    user.save()
    return Response()


@api_view(['GET',])
def get_items(request):
    types = {
        'pack': ItemTypes.PACK,
        'plugin': ItemTypes.PLUGIN,
        'preset': ItemTypes.PRESET,
    }

    request_type = request.query_params.get('type')

    filter = {}
    if request_type in types:
        filter = {'type': types[request_type]}

    items = ItemSerializer(instance=Item.objects.filter(**filter), many=True)
    return Response(data=items.data)


@api_view(['POST'])
def get_item_info(request):
    item = ItemSerializer(instance=get_object_or_404(Item, id=request.data['id']))
    return Response(data=item.data)