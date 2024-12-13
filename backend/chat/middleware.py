from cryptography.fernet import Fernet
from django.utils.deprecation import MiddlewareMixin
from django.conf import settings
import json

class MessageEncryptionMiddleware(MiddlewareMixin):
    def __init__(self, get_response):
        # Initialize the cipher with the encryption key from settings
        self.key = settings.ENCRYPTION_KEY
        self.cipher = Fernet(self.key)
        super().__init__(get_response)

    def process_request(self, request):
        # Check if the request content type is JSON
        if request.content_type == 'application/json' and request.body:
            try:
                # Decode the incoming request body into JSON
                request_data = json.loads(request.body.decode('utf-8'))
                
                if 'message' in request_data:
                    encrypted_content = request_data['message']
                    print(f"Encrypted message in request: {encrypted_content}")  # Debugging
                    
                    # Decrypt the message content
                    decrypted_content = self.cipher.decrypt(encrypted_content.encode()).decode('utf-8')
                    print(f"Decrypted message: {decrypted_content}")  # Debugging
                    
                    # Replace the encrypted message with the decrypted content
                    request.data = request_data
                    request.data['message'] = decrypted_content
            except Exception as e:
                print(f"Error processing request: {e}")  # Error handling for decryption failure

    def process_response(self, request, response):
        # Check if the response has the 'message' field and is JSON
        if hasattr(response, 'data') and isinstance(response.data, dict) and 'message' in response.data:
            message_content = response.data['message']
            print(f"Original message before decryption: {message_content}")  # Debugging
            
            # Encrypt the message content before returning it (for response encryption)
            try:
                encrypted_content = self.cipher.encrypt(message_content.encode('utf-8')).decode('utf-8')
                print(f"Encrypted message in response: {encrypted_content}")  # Debugging
                
                # Set the encrypted message back in the response
                response.data['message'] = encrypted_content
            except Exception as e:
                print(f"Error encrypting message in response: {e}")
                response.data['message'] = "Error encrypting message"
        
        return response
