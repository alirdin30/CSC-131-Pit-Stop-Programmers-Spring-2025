# Pit Stop Programmers Server

## Environment Variables Setup

This server uses a `.env` file to store sensitive information and configuration secrets (database URI, email credentials, JWT secret, etc). **The `.env` file is in .gitignore per industry standard.**

### How to Run the Server

1. **Create your own `.env` file:**

   - Rename the provided `.env.example` file to `.env`.

2. **Fill in the values:**

   - Make sure each variable in `.env` has a value (see `.env.example` for required variables).
   - Here are the values just in case you lose them but traditionally we wouldn't have the secrets here:
     ```
     MONGODB_URI=mongodb://localhost:27017/pitstop_db
     JWT_SECRET=pitstopprogrammers
     SESSION_SECRET=pitstop
     EMAIL_USER=pitstopprogrammers@gmail.com
     EMAIL_PASS=lznwslwwwkiqnmta
     PORT=5001
     ```

3. **Install dependencies:**

   ```sh
   npm install
   ```

4. **Start the server:**
   ```sh
   npm run dev
   ```

---

**Note:** If you clone this repository or move it to a new environment, always repeat step 1 to ensure the application has the required configuration to run.

---

## Config Folder

- **database.js**: Database connection config for mongodb
- **environment.js**: Environment variables which will eventually be moved to .env
- **middleware.js**: Global middleware i.e. anything needed to connect api's to the server

## Models Folder

- Define a schema for a specific data entity
- Include validation rules for data fields
- Implement model-specific methods

example from other project:
elderName: {
type: String,
required: true,
trim: true
},
user: {
type: mongoose.Schema.Types.ObjectId,
ref: 'User',
required: true
},
responses: {
questionId: {
type: String,
required: true
},
},

Example models might include:

- **User.js**: Outline of how user account information is stored in the database
- **Service.js**: Outline of how service information is stored in the database
- **Appointment.js**: Outline of how appointment information is stored in the database

## Routes Folder

The `routes` folder contains API route definitions that handle HTTP requests. (basically info pulled from the database) Each route file should:

- Define endpoints for a specific resource
- Implement request handlers (GET, POST, PUT, DELETE, etc.)
- Include input validation
- Call appropriate controller/service functions
- Return properly formatted responses

Route files are typically organized by resource, such as:

- **users.js**: User-related endpoints (/api/users/\*)
- **services.js**: Service-related endpoints (/api/services/\*)
- **appointments.js**: Appointment-related endpoints (/api/appointments/\*)

## Best Practices

1. Keep each file focused on a single responsibility
2. Use consistent naming conventions
3. Implement proper error handling
4. Document your API endpoints
5. Validate all inputs
6. Use environment variables for sensitive information
