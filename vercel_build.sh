#!/bin/bash

# Install Python dependencies
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --noinput

# Make any necessary migrations
python manage.py makemigrations
python manage.py migrate
