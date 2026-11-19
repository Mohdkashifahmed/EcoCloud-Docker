# EcoCloud Docker setup

This Docker setup containerizes the React/Vite frontend and serves its production build with Nginx.

## Requirements
- Docker Desktop running with Linux containers.
- For cloud mode, create `.env` in this folder with the VITE variables shown below.
- For demo mode, no `.env` file is required.

## Build and start
From this folder, run:

    docker compose up --build -d

Open http://localhost:8080.

## Stop
    docker compose down

## View logs
    docker compose logs -f

## Rebuild after changing frontend code or VITE settings
    docker compose up --build -d

## Important architecture note
Supabase is a managed cloud service in this project. The Docker container contains the frontend only; it does not contain Supabase Auth or PostgreSQL. The browser communicates with Supabase over HTTPS.

Vite environment variables are embedded into the frontend at image-build time. The Supabase anon/publishable key is intended to be public and must be protected by Supabase Row Level Security. Never place a Supabase service-role key in this frontend image.
