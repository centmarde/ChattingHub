from rest_framework import serializers
from .models import Message
from cryptography.fernet import Fernet
from django.conf import settings

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'content', 'timestamp']

    def __init__(self, *args, **kwargs):
        # Initialize the cipher with the encryption key from settings
        self.cipher = Fernet(settings.ENCRYPTION_KEY)
        super().__init__(*args, **kwargs)

    def to_representation(self, instance):
        # Get the original serialized data
        data = super().to_representation(instance)

        # Decrypt the 'content' field before returning it
        encrypted_content = data.get('content')
        if encrypted_content:
            try:
                decrypted_content = self.cipher.decrypt(encrypted_content.encode()).decode('utf-8')
                data['content'] = decrypted_content
            except Exception as e:
                data['content'] = None  # Handle decryption failure
                print(f"Error decrypting content: {e}")
        
        return data

    def to_internal_value(self, data):
        # Encrypt the 'content' field before saving it to the database
        content = data.get('content')
        if content:
            try:
                encrypted_content = self.cipher.encrypt(content.encode('utf-8')).decode('utf-8')
                data['content'] = encrypted_content
            except Exception as e:
                raise serializers.ValidationError(f"Error encrypting content: {e}")
        
        return super().to_internal_value(data)
