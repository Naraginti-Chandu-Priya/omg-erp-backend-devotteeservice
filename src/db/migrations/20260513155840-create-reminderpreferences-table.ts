import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {

    await queryInterface.createTable('reminderpreferences', {
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

        birthday_reminder: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },

        nakshatra_anniversary: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },

        festival_greetings: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },

        donation_anniversary: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },

        created_at: { type: DataTypes.DATE, allowNull: false },
        updated_at: { type: DataTypes.DATE, allowNull: false }
    });


}

export async function down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable('reminderpreferences');
}
