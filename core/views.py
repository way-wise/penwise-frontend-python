from django.shortcuts import render
from django.template.exceptions import TemplateDoesNotExist
from django.http import Http404

def render_page(request, page_name='index'):
    # Sanitize page_name to prevent directory traversal? 
    # Django's template loader is generally safe, but good to be careful.
    # We will just pass it to render.
    
    # Check if the page_name ends with .html, if not append it
    template_name = page_name if page_name.endswith('.html') else f'{page_name}.html'
    
    # Determine active_page for dashboard pages
    active_page = ''
    dashboard_pages = {
        'dashboard': 'dashboard',
        'project-list': 'project-list',
        'new-project': 'new-project',
        'your-plan': 'your-plan',
        'ambassador-affiliate': 'ambassador-affiliate',
        'settings': 'settings',
    }
    
    # Remove .html extension if present for comparison
    page_key = page_name.replace('.html', '')
    if page_key in dashboard_pages:
        active_page = dashboard_pages[page_key]
    
    context = {
        'active_page': active_page
    }
    
    try:
        return render(request, template_name, context)
    except TemplateDoesNotExist:
        try: 
            # Fallback: maybe the user requests /privacy-policy but file is privacy_policy.html?
            # Start with direct match.
            if "-" in page_name:
                 return render(request, f'{page_name.replace("-", "_")}.html', context)
            raise Http404
        except TemplateDoesNotExist:
            raise Http404(f"Page {page_name} not found")
