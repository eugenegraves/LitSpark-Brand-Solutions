/**
 * Service Model
 * 
 * This model defines the structure for service offerings in the database.
 * It includes relationships with projects.
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Service = sequelize.define('Service', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    category: {
      type: DataTypes.ENUM('branding', 'marketing', 'design', 'development', 'consulting'),
      allowNull: false
    },
    basePrice: {
      type: DataTypes.DECIMAL(10, 2)
    },
    duration: {
      type: DataTypes.INTEGER,
      comment: 'Estimated duration in days'
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    icon: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: true
  });

  // Class methods
  Service.associate = function(models) {
    // Associations are defined in the index.js file
  };

  return Service;
};
