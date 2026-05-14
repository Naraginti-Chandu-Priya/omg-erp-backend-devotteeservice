import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('poojas', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },

    temple_id: {
      type: DataTypes.UUID,
      allowNull: true
    },

    pooja_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    pooja_type: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    pooja_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },

    pooja_duration: {
      type: DataTypes.STRING,
      allowNull: false
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
  await queryInterface.dropTable('poojas');
}
