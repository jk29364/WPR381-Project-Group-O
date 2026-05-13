# WPR381 Project Group O

A small event booking web application built with Node.js, Express, and EJS.

## Overview

This project provides a user-facing site for browsing events, viewing event details, and managing bookings. It also includes an admin interface for managing events, enquiries, and administrative dashboards.

## Key Features

- Server-side rendering with EJS templates
- Static assets served from `public/` (CSS and client-side JS)
- Basic page routes for home, events, login, register, dashboard, contact, and admin
- Initial support for user authentication and admin views
- Uses Express middleware for form handling and static content

## Project Structure

- `index.js` — main Express application entrypoint
- `package.json` — Node dependencies and project metadata
- `views/` — EJS templates for all pages and partials
- `public/` — static assets like CSS and JavaScript

## Run Locally

1. Install dependencies: `npm install`
2. Start the server: `node index.js`
3. Open `http://localhost:3000`

## Notes

The app is currently configured for local development and serves templated pages with placeholder data. Further work is needed to wire in database-driven event data, authentication, and booking persistence.

