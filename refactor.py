import re
import os

def refactor_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace static assets
    def replace_link(match):
        result = match.group(0)
        attr = match.group(1) # src or href
        quote = match.group(2) # " or '
        path = match.group(3) # ./assets/...
        
        if path.startswith('./'):
            clean_path = path[2:]
        else:
            clean_path = path
            
        # exclude html files - replace with /slug
        if clean_path.endswith('.html'):
            # Replace with dynamic route /clean_path (without .html)
            # e.g. ./howitworks.html -> /howitworks
            slug = clean_path[:-5]
            if slug == 'index':
                slug = ''
            return f'{attr}={quote}/{slug}{quote}'
        
        # if it looks like a static asset
        if any(clean_path.startswith(p) for p in ['assets/', 'static/']) or \
           any(clean_path.endswith(ext) for ext in ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp']):
            return f'{attr}={quote}{{% static \'{clean_path}\' %}}{quote}'
        
        return result

    # Regex for src="path" or href="path"
    # match.group(1) = src|href
    # match.group(2) = " or '
    # match.group(3) = path
    # match.group(4) = " or '
    content = re.sub(r'(src|href)=(["\'])([^"\']+)(["\'])', lambda m: replace_link(m), content)
    
    # Regex for url('path') replacement in style attributes
    def replace_url(match):
        quote = match.group(1)
        path = match.group(2)
        end_quote = match.group(3)
        if path.startswith('./'):
            clean_path = path[2:]
        else:
            clean_path = path
            
        if 'assets/' in clean_path:
             return f'url({quote}{{% static \'{clean_path}\' %}}{end_quote})'
        return match.group(0)

    content = re.sub(r'url\((["\'])([^"\']+)(["\'])\)', replace_url, content)

    # 2. Extract content for extending base.html
    # Markers for index.html:
    start_marker = '<!-- Hero Section -->'
    end_marker = '<!-- Footer Section -->'
    
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)
    
    if start_idx != -1 and end_idx != -1:
        middle_content = content[start_idx:end_idx]
        new_content = "{% extends 'base.html' %}\n{% load static %}\n\n{% block content %}\n" + middle_content + "{% endblock %}\n"
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Refactored {file_path}")
    else:
        print(f"Skipping block extraction for {file_path}: markers not found. Only regex replacements applied (if I saved).")
        # For now, if markers not found, I might destroy the file if I just save 'content'.
        # But I only save 'new_content' inside the if block. 
        # So other files won't be touched by the block extraction logic if markers match.
        
        # However, I should probably save the regex replacements even if blocks aren't extracted, 
        # but the user specific request was "template file... base components".
        # If I can't extract components, I shouldn't half-do it.

refactor_file(r'd:\arif\python\django\templates\index.html')
