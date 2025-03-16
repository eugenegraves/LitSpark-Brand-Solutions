/**
 * Mock Models Index for Testing
 * 
 * This file provides a mock implementation of the models/index.js file
 * to allow tests to run without a real database connection.
 */

// Import the mock models
const db = require('../../../../models');

// Ensure the relationships are properly set up
// These relationships are already defined in the models.js mock
// but we're making sure they're explicitly defined here as well
db.User.hasMany(db.Project, { foreignKey: 'userId' });
db.Project.belongsTo(db.User, { foreignKey: 'userId' });

db.Client.hasMany(db.Project, { foreignKey: 'clientId' });
db.Project.belongsTo(db.Client, { foreignKey: 'clientId' });

db.Project.belongsToMany(db.Service, { through: 'ProjectServices', foreignKey: 'projectId' });
db.Service.belongsToMany(db.Project, { through: 'ProjectServices', foreignKey: 'serviceId' });

module.exports = db;
