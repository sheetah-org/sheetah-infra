# Database Setup Scripts

This directory contains SQL scripts that should be executed **after** the database schema has been created via the main project's `npm run db:push` command.

## Prerequisites

1. Ensure the database schema has been created by running `npm run db:push` from the main project
2. Have access to your Supabase database (either local or remote)

## Scripts Overview

### `realtime.sql`
**Purpose**: Configures Supabase Realtime for specific tables
- Enables realtime subscriptions for `receipts` and `expenses_to_receipts_suggestions` tables
- Sets up replica identity for full record change tracking

**When to run**: After initial schema creation, before deploying to production

### `clerk-dev.sql`
**Purpose**: Seeds development environment with Clerk authentication roles and permissions
- Inserts predefined roles (accountant, admin, employee, manager, owner)
- Inserts permissions for expenses and policies management
- Establishes role-permission relationships

**When to run**: After schema creation in development environment

### `clerk-prod.sql`
**Purpose**: Seeds production environment with Clerk authentication roles and permissions
- Same structure as dev script but with production-specific role/permission IDs
- Inserts predefined roles and permissions for production use

**When to run**: After schema creation in production environment

## Execution Order

1. **First**: Run `npm run db:push` from the main project to create the database schema
2. **Second**: Execute `realtime.sql` to enable realtime functionality
3. **Third**: Run the appropriate Clerk script based on your environment:
   - Development: `clerk-dev.sql`
   - Production: `clerk-prod.sql`

## How to Run

### Using Supabase CLI (Recommended)
```bash
# For local development
supabase db reset
# Then run the scripts in order

# For remote database
supabase db push
# Then execute scripts via Supabase Dashboard or psql
```

### Using psql
```bash
# Connect to your database
psql -h your-db-host -U your-username -d your-database

# Execute scripts in order
\i realtime.sql
\i clerk-dev.sql  # or clerk-prod.sql for production
```

### Using Supabase Dashboard
1. Navigate to your Supabase project dashboard
2. Go to SQL Editor
3. Copy and paste each script content
4. Execute in the order specified above

## Important Notes

- ⚠️ **Never run these scripts before the schema is created** - they depend on existing tables
- 🔄 **Run scripts in the specified order** - realtime setup should come before data seeding
- 🌍 **Use the correct Clerk script** for your environment (dev vs prod)
- 💾 **Backup your database** before running these scripts in production
