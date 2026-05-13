import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable('familymembers', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        devotee_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: 'devotees', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        member_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        relation: {
            type: DataTypes.ENUM(
                'Spouse',
                'Son',
                'Daughter',
                'Father',
                'Mother',
                'Brother',
                'Sister',
                'Other'
            ),
            allowNull: false
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
            type: DataTypes.STRING,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rasi: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nakshatra: {
            type: DataTypes.STRING,
            allowNull: true
        },
        parent_node: {
            type: DataTypes.BOOLEAN,
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
    await queryInterface.dropTable('familymembers');
}
