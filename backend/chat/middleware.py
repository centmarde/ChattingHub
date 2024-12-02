from cryptography.fernet import Fernet
from django.utils.deprecation import MiddlewareMixin
from django.conf import settings
import json

# Middleware for encryption and decryption
class MessageEncryptionMiddleware(MiddlewareMixin):
    def __init__(self, get_response):
        self.key = settings.ENCRYPTION_KEY  # Store the encryption key in settings
        self.cipher = Fernet(self.key)
        super().__init__(get_response)

    def process_request(self, request):
        if request.content_type == 'application/json':
            try:
                # Parse the incoming request body (JSON)
                request_data = json.loads(request.body.decode('utf-8'))

                # Check if 'message' is in the body
                if 'message' in request_data:
                    encrypted_content = request_data['message']
                    print(f"Encrypted message in request: {encrypted_content}")  # Log encrypted message
                    decrypted_content = self.cipher.decrypt(encrypted_content.encode()).decode()
                    print(f"Decrypted message: {decrypted_content}")  # Log decrypted message
                    # Set the decrypted message back into request_data for further processing
                    request.data = request_data
                    request.data['message'] = decrypted_content
            except Exception as e:
                print(f"Error processing request: {e}")

    def process_response(self, request, response):
        if hasattr(response, 'data') and 'message' in response.data:
            message_content = response.data['message']
            print(f"Original message before encryption: {message_content}")  # Log original message
            encrypted_content = self.cipher.encrypt(message_content.encode()).decode()
            print(f"Encrypted message in response: {encrypted_content}")  # Log encrypted message
            response.data['message'] = encrypted_content
        return response
