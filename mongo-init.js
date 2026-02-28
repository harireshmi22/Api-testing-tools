// MongoDB initialization script
// This script runs when the container first starts

// Switch to the application database
db = db.getSiblingDB('api-testing-tools');

// Create application user with read/write permissions
db.createUser({
  user: 'apiuser',
  pwd: 'apipassword123',
  roles: [
    {
      role: 'readWrite',
      db: 'api-testing-tools'
    }
  ]
});

// Create collections with indexes
db.createCollection('users');
db.createCollection('requesthistories');

// Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ createdAt: 1 });

db.requesthistories.createIndex({ userId: 1 });
db.requesthistories.createIndex({ createdAt: 1 });
db.requesthistories.createIndex({ userId: 1, createdAt: -1 });

// Insert initial data if needed
print('Database initialized successfully');
print('Collections: users, requesthistories');
print('Indexes created for email, userId, and createdAt fields');
