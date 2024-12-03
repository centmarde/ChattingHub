from rest_framework import viewsets
from .models import Message
from .serializers import MessageSerializer
from rest_framework.permissions import IsAuthenticated
from cryptography.fernet import Fernet
from django.conf import settings

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def __init__(self, *args, **kwargs):
        # Initialize the Fernet cipher with the encryption key
        self.cipher = Fernet(settings.ENCRYPTION_KEY)
        super().__init__(*args, **kwargs)

    def perform_create(self, serializer):
        sender = self.request.user
        receiver = serializer.validated_data['receiver']
        message_content = serializer.validated_data['content']

        # Encrypt the message content before saving
        encrypted_content = self.cipher.encrypt(message_content.encode()).decode()

        # Save the encrypted message to the database
        serializer.save(sender=sender, receiver=receiver, content=encrypted_content)

    def get_queryset(self):
        """
        Optionally restricts the returned messages to a given sender,
        by filtering against a `sender` parameter in the URL.
        """
        queryset = super().get_queryset()

        # Get sender from the URL parameter (assuming sender is passed as a UUID)
        sender = self.kwargs.get('sender')

        if sender:
            # Filter messages by sender
            queryset = queryset.filter(sender=sender)

        return queryset
