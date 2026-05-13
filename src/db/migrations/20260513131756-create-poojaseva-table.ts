import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('poojasevas', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    seva_code: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true
    },

    devotee_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: 'devotees', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },

    seva_name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },

    seva_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },

    seva_date: {
      type: DataTypes.DATE,
      allowNull: false
    },

    first_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },

    last_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },

    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },

    gothram: {
      type: DataTypes.STRING(100),
      allowNull: true
    },

    nakshatra: {
      type: DataTypes.STRING(100),
      allowNull: true
    },

    rasi: {
      type: DataTypes.STRING(100),
      allowNull: true
    },

    status: {
      type: DataTypes.ENUM('Scheduled', 'Completed', 'Cancelled'),
      allowNull: false,
      defaultValue: 'Scheduled'
    },

    payment_status: {
      type: DataTypes.ENUM('Pending', 'Paid', 'Refunded'),
      allowNull: false,
      defaultValue: 'Pending'
    },

    receipt_number: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    registered_by: {
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
      allowNull: false,
      defaultValue: DataTypes.NOW
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('poojasevas');
}
