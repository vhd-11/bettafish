# BettaFish

BettaFish is a job board platform where employers can post job openings, and job seekers can search and apply for jobs. It provides a user-friendly interface for job listings, filtering, authentication, and application management.

## Features

- **Job Listings** – Display available job opportunities in a structured format.
- **Search & Filters** – Users can filter jobs based on category, location, and other criteria.
- **User Authentication** – Separate login for job seekers and employers using Clerk for user authentication.
- **Application Process** – A system that allows job seekers to apply to jobs seamlessly.
- **Admin Panel** – Basic admin functionalities to manage job postings and user activities.

## Installation

To set up the project locally, follow these steps:

### Prerequisites

Ensure you have the following dependencies installed:

- Node.js 
- npm or yarn
- A Supabase account for the database
- Clerk account for user authentication

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/vhd-11/bettafish.git
   cd bettafish
   ```
2. Install dependencies:
   ```bash
   npm install  # or yarn install
   ```
3. Configure environment variables by creating a `.env` file and adding necessary credentials, such as:
   - Supabase API keys and URLs
   - Clerk API keys
   - Other API keys or secrets
4. Start the development server:
   ```bash
   npm run dev  # or equivalent command based on your framework
   ```

## Configuration

- `.env` file for storing environment variables such as database URI, Clerk API keys, and secret keys.
- Configuration settings are stored in the `config` or equivalent directory.
