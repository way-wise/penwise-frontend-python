from django.shortcuts import render
from django.template.exceptions import TemplateDoesNotExist
from django.http import Http404

def render_page(request, page_name='index'):
    # Sanitize page_name to prevent directory traversal? 
    # Django's template loader is generally safe, but good to be careful.
    # We will just pass it to render.
    
    # Check if the page_name ends with .html, if not append it
    template_name = page_name if page_name.endswith('.html') else f'{page_name}.html'
    
    try:
        return render(request, template_name)
    except TemplateDoesNotExist:
        try: 
            # Fallback: maybe the user requests /privacy-policy but file is privacy_policy.html?
            # Start with direct match.
            if "-" in page_name:
                 return render(request, f'{page_name.replace("-", "_")}.html')
            raise Http404
        except TemplateDoesNotExist:
            raise Http404(f"Page {page_name} not found")
