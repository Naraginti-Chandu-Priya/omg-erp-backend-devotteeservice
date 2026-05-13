import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('communicationpreferences', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    devotee_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: { model: 'devotees', key: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },

    sms_enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },

    email_enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },

    whatsapp_enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },

    preferred_language: {
      type: DataTypes.ENUM('Tamil', 'English', 'Hindi'),
      allowNull: true
    },

    unsubscribed_all: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false }
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('communicationpreferences');
}
