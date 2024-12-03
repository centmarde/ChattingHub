from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MessageViewSet

router = DefaultRouter()
router.register(r'messages', MessageViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/messages/sender/<uuid:sender>/', MessageViewSet.as_view({'get': 'list'}), name='messages-by-sender'),
]
