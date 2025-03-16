/**
 * Models Index
 * 
 * This file initializes all Sequelize models and their associations.
 * It exports the database connection and model instances.
 */

const { sequelize } = require('../config/database');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const db = {};

// Import all model files in the directory
fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize);
    db[model.name] = model;
  });

// Define model associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Define relationships between models
// User-Project relationship
db.User.hasMany(db.Project, { foreignKey: 'userId' });
db.Project.belongsTo(db.User, { foreignKey: 'userId' });

// Client-Project relationship
db.Client.hasMany(db.Project, { foreignKey: 'clientId' });
db.Project.belongsTo(db.Client, { foreignKey: 'clientId' });

// Project-Service many-to-many relationship
db.Project.belongsToMany(db.Service, { through: 'ProjectServices' });
db.Service.belongsToMany(db.Project, { through: 'ProjectServices' });

db.sequelize = sequelize;

module.exports = db;
