from cryptography.fernet import Fernet
from django.utils.deprecation import MiddlewareMixin
from django.conf import settings
import json

class MessageEncryptionMiddleware(MiddlewareMixin):
    def __init__(self, get_response):
        self.key = settings.ENCRYPTION_KEY  # Use the key stored in settings
        self.cipher = Fernet(self.key)
        super().__init__(get_response)

    def process_request(self, request):
        if request.content_type == 'application/json':
            try:
                # Decode the incoming request body
                request_data = json.loads(request.body.decode('utf-8'))

                if 'message' in request_data:
                    encrypted_content = request_data['message']
                    print(f"Encrypted message in request: {encrypted_content}")  # For debugging
                    
                    # Decrypt the message
                    decrypted_content = self.cipher.decrypt(encrypted_content.encode()).decode('utf-8')
                    print(f"Decrypted message: {decrypted_content}")  # For debugging
                    
                    # Add decrypted content to request data
                    request.data = request_data
                    request.data['message'] = decrypted_content
            except Exception as e:
                print(f"Error processing request: {e}")

    def process_response(self, request, response):
        # Check if response is JSON and has 'message'
        if hasattr(response, 'data') and isinstance(response.data, dict) and 'message' in response.data:
            message_content = response.data['message']
            print(f"Original message before encryption: {message_content}")  # For debugging
            
            # Encrypt the message
            encrypted_content = self.cipher.encrypt(message_content.encode('utf-8')).decode('utf-8')
            print(f"Encrypted message in response: {encrypted_content}")  # For debugging
            
            # Set encrypted content in response
            response.data['message'] = encrypted_content
        
        return response
