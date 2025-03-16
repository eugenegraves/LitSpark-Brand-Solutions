/**
 * Project Model
 * 
 * This model defines the structure for project data in the database.
 * It includes relationships with clients, users, and services.
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Project = sequelize.define('Project', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.ENUM('planning', 'in-progress', 'review', 'completed', 'on-hold'),
      defaultValue: 'planning'
    },
    startDate: {
      type: DataTypes.DATE
    },
    endDate: {
      type: DataTypes.DATE
    },
    budget: {
      type: DataTypes.DECIMAL(10, 2)
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium'
    },
    clientId: {
      type: DataTypes.UUID,
      references: {
        model: 'Clients',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    timestamps: true
  });

  // Class methods
  Project.associate = function(models) {
    // Associations are defined in the index.js file
  };

  return Project;
};
