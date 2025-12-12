from django.core.wsgi import get_wsgi_application
import os
import sys

# Add the project directory to the Python path
project_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if project_path not in sys.path:
    sys.path.append(project_path)

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# Get the WSGI application
application = get_wsgi_application()

# Vercel requires a handler function
def handler(event, context):
    from django.core.handlers.wsgi import WSGIHandler
    return WSGIHandler()(event, context)
