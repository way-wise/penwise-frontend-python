#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --noinput

# Run migrations to ensure internal Django tables (auth, sessions) exist in the ephemeral SQLite DB
python manage.py migrate
