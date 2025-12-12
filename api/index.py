import os
import sys
from django.core.wsgi import get_wsgi_application
from django.conf import settings

# Add the project directory to the Python path
project_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if project_path not in sys.path:
    sys.path.append(project_path)

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# Get the WSGI application
application = get_wsgi_application()

# Vercel serverless function handler
def handler(request):
    from io import BytesIO
    from django.http import HttpRequest, HttpResponse
    from django.core.handlers.wsgi import WSGIHandler
    
    # Convert Vercel request to Django request
    body = request.get('body', '')
    headers = request.get('headers', {})
    method = request.get('method', 'GET')
    path = request.get('path', '/')
    
    # Create a WSGI environment
    environ = {
        'REQUEST_METHOD': method,
        'PATH_INFO': path,
        'QUERY_STRING': request.get('query', {}),
        'wsgi.input': BytesIO(body.encode() if body else b''),
        'wsgi.errors': sys.stderr,
        'wsgi.url_scheme': headers.get('x-forwarded-proto', 'http'),
        'SERVER_NAME': headers.get('host', 'localhost'),
        'SERVER_PORT': headers.get('x-forwarded-port', '80'),
    }
    
    # Add headers to environ
    for key, value in headers.items():
        key = 'HTTP_' + key.upper().replace('-', '_')
        environ[key] = value
    
    # Process the request
    response = WSGIHandler()(environ, lambda status, headers: None)
    
    # Convert Django response to Vercel response
    return {
        'statusCode': response.status_code,
        'body': response.content.decode('utf-8'),
        'headers': dict(response.items())
    }
