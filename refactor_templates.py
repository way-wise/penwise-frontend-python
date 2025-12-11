"""
Template Refactoring Script for Django Project
This script converts standalone HTML files to use Django's template inheritance.
"""

import os
import re
from pathlib import Path
from bs4 import BeautifulSoup

# Configuration
TEMPLATES_DIR = Path(__file__).parent / 'templates'
INCLUDES_DIR = TEMPLATES_DIR / 'includes'
SKIP_FILES = ['base.html', 'navbar.html', 'footer.html', 'mobile_menu.html']
SKIP_EXTENSIONS = ['.txt']

def get_title_from_html(soup):
    """Extract title from HTML."""
    title_tag = soup.find('title')
    if title_tag:
        return title_tag.get_text(strip=True)
    return None

def get_meta_description(soup):
    """Extract meta description from HTML."""
    meta = soup.find('meta', attrs={'name': 'description'})
    if meta and meta.get('content'):
        return meta['content']
    return None

def get_body_content(soup):
    """Extract the main content from body, excluding nav, mobile menu, and footer."""
    body = soup.find('body')
    if not body:
        return None
    
    # Clone the body
    body_copy = BeautifulSoup(str(body), 'html.parser').find('body')
    
    # Remove navigation elements (first nav)
    navs = body_copy.find_all('nav', limit=1)
    for nav in navs:
        nav.decompose()
    
    # Remove mobile menu (div with id="mobileMenu")
    mobile_menu = body_copy.find('div', id='mobileMenu')
    if mobile_menu:
        mobile_menu.decompose()
    
    # Remove footer
    footers = body_copy.find_all('footer')
    for footer in footers:
        footer.decompose()
    
    # Remove script tags at the end (AOS, custom scripts)
    scripts = body_copy.find_all('script')
    for script in scripts:
        src = script.get('src', '')
        text = script.get_text(strip=True)
        # Remove AOS initialization and other common scripts
        if 'aos' in src.lower() or 'AOS.init' in text:
            script.decompose()
        elif 'script.js' in src:
            script.decompose()
    
    # Get inner HTML of body
    inner_content = ''.join(str(c) for c in body_copy.children)
    return inner_content.strip()

def convert_static_paths(content):
    """Convert relative paths to Django static paths."""
    # Convert various patterns to Django static template tags
    patterns = [
        # Pattern for ./assets/...
        (r'(?:src|href)=["\']\.\/assets\/([^"\']+)["\']', r"{% static 'assets/\1' %}"),
        # Pattern for assets/...
        (r'(?:src|href)=["\']assets\/([^"\']+)["\']', r"{% static 'assets/\1' %}"),
        # Pattern for url('./assets/...)
        (r"url\(['\"]?\.\/assets\/([^'\")]+)['\"]?\)", r"url('{% static 'assets/\1' %}')"),
        # Pattern for url('assets/...)
        (r"url\(['\"]?assets\/([^'\")]+)['\"]?\)", r"url('{% static 'assets/\1' %}')"),
        # Pattern for ./style.css
        (r'(?:src|href)=["\']\.\/style\.css["\']', r"{% static 'style.css' %}"),
        (r'(?:src|href)=["\']style\.css["\']', r"{% static 'style.css' %}"),
    ]
    
    result = content
    for pattern, replacement in patterns:
        result = re.sub(pattern, lambda m: f'{m.group(0).split("=")[0]}="{replacement.replace(chr(92) + "1", m.group(1) if m.lastindex else "")}"' if 'src' in m.group(0) or 'href' in m.group(0) else replacement, result)
    
    return result

def fix_static_tag_format(content):
    """Properly fix static paths to use Django's static template tag."""
    # Fix image/asset src attributes
    content = re.sub(
        r'src="\.\/assets\/([^"]+)"',
        r"src=\"{% static 'assets/\1' %}\"",
        content
    )
    content = re.sub(
        r"src='\.\/assets\/([^']+)'",
        r"src=\"{% static 'assets/\1' %}\"",
        content
    )
    content = re.sub(
        r'src="assets\/([^"]+)"',
        r"src=\"{% static 'assets/\1' %}\"",
        content
    )
    
    # Fix href attributes for assets
    content = re.sub(
        r'href="\.\/assets\/([^"]+)"',
        r"href=\"{% static 'assets/\1' %}\"",
        content
    )
    content = re.sub(
        r'href="assets\/([^"]+)"',
        r"href=\"{% static 'assets/\1' %}\"",
        content
    )
    
    # Fix background-image url() patterns
    content = re.sub(
        r"url\('\.\/assets\/([^']+)'\)",
        r"url('{% static 'assets/\1' %}')",
        content
    )
    content = re.sub(
        r"url\('assets\/([^']+)'\)",
        r"url('{% static 'assets/\1' %}')",
        content
    )
    
    # Fix style.css references
    content = re.sub(
        r'href="\.\/style\.css"',
        r"href=\"{% static 'style.css' %}\"",
        content
    )
    content = re.sub(
        r'href="style\.css"',
        r"href=\"{% static 'style.css' %}\"",
        content
    )
    
    return content

def convert_internal_links(content):
    """Convert .html links to clean Django URLs."""
    # Convert ./page.html to /page
    content = re.sub(
        r'href="\.\/([^"]+)\.html"',
        r'href="/\1"',
        content
    )
    content = re.sub(
        r"href='\.\/([^']+)\.html'",
        r"href='/\1'",
        content
    )
    # Fix index links
    content = content.replace('href="/index"', 'href="/"')
    return content

def create_django_template(title, meta_desc, body_content):
    """Create a Django template that extends base.html."""
    template = "{% extends 'base.html' %}\n{% load static %}\n\n"
    
    # Add title block if different from default
    if title and 'Penwise' not in title:
        template += f"{{% block title %}}{title}{{% endblock %}}\n\n"
    elif title:
        template += f"{{% block title %}}{title}{{% endblock %}}\n\n"
    
    # Add meta description block if available
    if meta_desc:
        template += f"{{% block meta_description %}}{meta_desc}{{% endblock %}}\n\n"
    
    # Add content block
    template += "{% block content %}\n"
    template += body_content
    template += "\n{% endblock %}\n"
    
    return template

def process_template(filepath):
    """Process a single template file."""
    print(f"Processing: {filepath.name}")
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"  Error reading file: {e}")
        return False
    
    # Check if already using Django template inheritance
    if "{% extends 'base.html' %}" in content:
        print(f"  Already using template inheritance - skipping")
        return True
    
    # Check if it's a standalone HTML file
    if '<!DOCTYPE html>' not in content and '<html' not in content:
        print(f"  Not a complete HTML file - skipping")
        return True
    
    # Parse HTML
    soup = BeautifulSoup(content, 'html.parser')
    
    # Extract components
    title = get_title_from_html(soup)
    meta_desc = get_meta_description(soup)
    body_content = get_body_content(soup)
    
    if not body_content:
        print(f"  Could not extract body content - skipping")
        return False
    
    # Fix static paths and internal links
    body_content = fix_static_tag_format(body_content)
    body_content = convert_internal_links(body_content)
    
    # Create new Django template
    new_template = create_django_template(title, meta_desc, body_content)
    
    # Backup original
    backup_path = filepath.with_suffix('.html.bak')
    try:
        with open(backup_path, 'w', encoding='utf-8') as f:
            f.write(content)
    except Exception as e:
        print(f"  Error creating backup: {e}")
    
    # Write new template
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_template)
        print(f"  Successfully converted!")
        return True
    except Exception as e:
        print(f"  Error writing file: {e}")
        return False

def main():
    """Main function to process all templates."""
    print("=" * 60)
    print("Django Template Refactoring Script")
    print("=" * 60)
    print(f"Templates directory: {TEMPLATES_DIR}")
    print("")
    
    # Check if BeautifulSoup is available
    try:
        from bs4 import BeautifulSoup
    except ImportError:
        print("ERROR: BeautifulSoup4 is required.")
        print("Install it with: pip install beautifulsoup4")
        return
    
    # Get all HTML files in templates directory (not in includes)
    html_files = []
    for f in TEMPLATES_DIR.iterdir():
        if f.is_file() and f.suffix == '.html' and f.name not in SKIP_FILES:
            html_files.append(f)
    
    print(f"Found {len(html_files)} HTML files to process")
    print("-" * 60)
    
    success_count = 0
    error_count = 0
    
    for filepath in sorted(html_files):
        if process_template(filepath):
            success_count += 1
        else:
            error_count += 1
    
    print("-" * 60)
    print(f"Complete! Success: {success_count}, Errors: {error_count}")

if __name__ == '__main__':
    main()
