# Utility Scripts

This directory contains utility scripts for the Pit Stop application.

## Admin Account Creation

The `createAdminAccount.js` script creates an admin user in the database if one doesn't already exist.
The `seedServices.js` script creates a set of default services in the database.

### Usage

**Run the script from server terminal using this command**

```bash
node utils/createAdminAccount.js
node utils/seedServices.js
```

### Default Admin Credentials

- **Email**: admin@pitstop.com
- **Password**: Admin123!
- **Role**: admin
