import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('devotees', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    temple_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    devotee_code: {
      type: DataTypes.STRING(20),
      unique: true
    },

    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
      unique: true
    },

    address_line: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    city: {
      type: DataTypes.STRING(100),
      allowNull: true
    },

    state: {
      type: DataTypes.STRING(100),
      allowNull: true
    },

    country: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: 'India'
    },

    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: true
    },

    gender: {
      type: DataTypes.ENUM('Male', 'Female', 'Other'),
      allowNull: true
    },

    occupation: {
      type: DataTypes.STRING(100),
      allowNull: true
    },

    devotee_profile_picture: {
      type: DataTypes.STRING(255),
      allowNull: true
    },

    status: {
      type: DataTypes.ENUM('Active', 'Inactive'),
      allowNull: false,
      defaultValue: 'Active'
    },

    membership_type: {
      type: DataTypes.ENUM('Regular', 'Silver', 'Gold', 'Platinum', 'VIP'),
      allowNull: true
    },

    created_by: {
      type: DataTypes.UUID,
      allowNull: true
    },

    updated_by: {
      type: DataTypes.UUID,
      allowNull: true
    },

    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('devotees');
}
