from django.http import JsonResponse
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authtoken.models import Token
from .forms import SignupForm
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import User

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Ensure only authenticated users can access this
def get_all_users(request):
    # Query all users from the User model
    users = User.objects.all()
    
    # Serialize the user data
    serializer = UserSerializer(users, many=True)
    
    # Return the JSON response with status and the serialized data
    return Response({
        'status': 'success',
        'message': 'Users retrieved successfully :P',
        'data': {
            'users': serializer.data
        }
    })

@api_view(['GET'])
def me(request):
    if request.user.is_authenticated:
        return JsonResponse({
            'id': request.user.id,  # Now an integer (BigAutoField)
            'name': request.user.name,
            'email': request.user.email,
        })
    return JsonResponse({'error': 'User not authenticated'}, status=401)

@api_view(['POST'])
@authentication_classes([])  # No authentication for signup
@permission_classes([])  # No specific permission for signup
def signup(request):
    data = request.data
    message = 'success'

    form = SignupForm({
        'email': data.get('email'),
        'name': data.get('name'),
        'password1': data.get('password1'),
        'password2': data.get('password2'),
    })

    if form.is_valid():
        form.save()
    else:
        message = 'error'
        return JsonResponse({'message': message, 'errors': form.errors})

    return JsonResponse({'message': message})

@api_view(['POST'])
@authentication_classes([])  # No authentication for login
@permission_classes([])  # No specific permission for login
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    user = authenticate(username=email, password=password)
    if user is not None:
        # Generate or retrieve the token for the user
        token, created = Token.objects.get_or_create(user=user)
        return JsonResponse({
            'message': 'success',
            'token': token.key,
            'user': {
                'id': user.id,  # Now an integer (BigAutoField)
                'name': user.get_full_name(),
                'email': user.email,
            }
        })
    return JsonResponse({'message': 'Invalid credentials'}, status=401)
