import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable('donations', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        devotee_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: 'devotees', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },

        donation_code: {
            type: DataTypes.STRING(20),
            unique: true
        },

        amount: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false
        },

        category: {
            type: DataTypes.ENUM(
                'General',
                'Annadanam',
                'Renovation',
                'Festival',
                'Education',
                'Medical'
            )
        },

        donation_date: {
            type: DataTypes.DATE,
            allowNull: false
        },

        channel: {
            type: DataTypes.ENUM('Hundi', 'Online', 'Counter')
        },

        payment_method: {
            type: DataTypes.ENUM('Cash', 'UPI', 'Card')
        },

        transaction_ref: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        payment_status: {
            type: DataTypes.ENUM('Success', 'Pending', 'Failed')
        },

        receipt_number: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        notes: DataTypes.TEXT,

        created_by: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        updated_by: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        created_at: { type: DataTypes.DATE, allowNull: false },
        updated_at: { type: DataTypes.DATE, allowNull: false }
    });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable('donations');
}
