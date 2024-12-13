from cryptography.fernet import Fernet

# Generate a valid Fernet key
key = Fernet.generate_key()

# Save the key for future use
print(key)  # This will give you a base64-encoded 32-byte key
