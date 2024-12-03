from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MessageViewSet

router = DefaultRouter()
router.register(r'messages', MessageViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/messages/', MessageViewSet.as_view({'get': 'get_messages_by_sender_receiver'}), name='messages_by_sender_receiver'),
    path('api/messages-by-sender/', MessageViewSet.as_view({'get': 'get_messages_by_sender'}), name='messages_by_sender'),
    path('api/messages-by-receiver/', MessageViewSet.as_view({'get': 'get_messages_by_receiver'}), name='messages_by_receiver'),
]
