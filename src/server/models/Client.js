/**
 * Client Model
 * 
 * This model defines the structure for client data in the database.
 * It includes relationships with projects.
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Client = sequelize.define('Client', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    industry: {
      type: DataTypes.STRING
    },
    contactName: {
      type: DataTypes.STRING
    },
    contactEmail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    contactPhone: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.TEXT
    },
    website: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    notes: {
      type: DataTypes.TEXT
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: true
  });

  // Class methods
  Client.associate = function(models) {
    // Associations are defined in the index.js file
  };

  return Client;
};
