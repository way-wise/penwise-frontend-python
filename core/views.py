from django.shortcuts import render, redirect
from django.template.exceptions import TemplateDoesNotExist
from django.http import Http404

# Mapping of step numbers to template names
NEW_PROJECT_STEPS = {
    1: 'new-project',
    2: 'review-idea',
    3: 'narrative-development',
    4: 'detailed-plan',
    5: 'chapter-view',
    6: 'export',  # You may need to create this template
}

def new_project_step(request, step):
    """Handle new project creation steps with numbered URLs"""
    if step not in NEW_PROJECT_STEPS:
        raise Http404(f"Step {step} not found. Valid steps are 1-{len(NEW_PROJECT_STEPS)}")
    
    template_name = f"{NEW_PROJECT_STEPS[step]}.html"
    
    context = {
        'active_page': 'new-project',
        'current_step': step,
        'total_steps': len(NEW_PROJECT_STEPS),
        'step_names': {
            1: 'Idea',
            2: 'Review Idea',
            3: 'Story Draft',
            4: 'Detailed Plan',
            5: 'Create Chapter',
            6: 'Export',
        }
    }
    
    try:
        return render(request, template_name, context)
    except TemplateDoesNotExist:
        raise Http404(f"Template for step {step} not found")

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
