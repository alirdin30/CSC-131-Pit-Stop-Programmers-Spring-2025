
### This is just a basic outline of the server directory structure. If you need to add more files, change the structure or stray from the outline feel free to do so.

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
- **users.js**: User-related endpoints (/api/users/*)
- **services.js**: Service-related endpoints (/api/services/*)
- **appointments.js**: Appointment-related endpoints (/api/appointments/*)

## Best Practices

1. Keep each file focused on a single responsibility
2. Use consistent naming conventions
3. Implement proper error handling
4. Document your API endpoints
5. Validate all inputs
6. Use environment variables for sensitive information
