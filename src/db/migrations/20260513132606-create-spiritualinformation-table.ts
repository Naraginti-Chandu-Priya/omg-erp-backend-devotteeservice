import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('spiritualinformations', {
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
        nakshatra: DataTypes.STRING(50),
        rasi: DataTypes.STRING(50),
        gothram: DataTypes.STRING(100),
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE
    });
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('spiritualinformations');
}
