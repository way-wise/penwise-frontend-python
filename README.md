# Penwise - Django Project

A dynamic Django web application for Penwise, a writing assistant platform.

## Features

- **Dynamic Routing**: Pages are rendered dynamically based on the URL.
- **Reusable Components**: Uses Django templates for Navbar, Footer, and other common elements.
- **Tailwind CSS**: Styled using Tailwind CSS (via CDN in this setup, or local configuration if fully integrated).
- **SEO Friendly**: Base template includes blocks for title and meta descriptions.

## Setup Instructions

1.  **Clone the repository**
2.  **Create a virtual environment**:
    ```bash
    python -m venv venv
    ```
3.  **Activate the virtual environment**:
    - Windows: `.\venv\Scripts\activate`
    - Mac/Linux: `source venv/bin/activate`
4.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
5.  **Run migrations** (if needed):
    ```bash
    python manage.py migrate
    ```
6.  **Run the server**:
    ```bash
    python manage.py runserver
    ```

## Project Structure

- `config/`: Project main configuration (settings, urls).
- `core/`: Main app handling views and logic.
- `templates/`: HTML templates.
  - `includes/`: Reusable HTML partials (Navbar, Footer, Menu).
  - `base.html`: Base template with common structure.
- `static/`: Static files (CSS, Images, JS).

## Development

- To add a new page, simply add the `.html` file to the `templates/` directory. The dynamic routing will pick it up automatically (e.g., `templates/new-page.html` -> `/new-page/`).
