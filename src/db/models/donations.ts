import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';

import { Devotee } from './devotee';

@Table({ tableName: 'donations', timestamps: true, underscored: true })
export class Donation extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true
    })
    declare id: string;

    @ForeignKey(() => Devotee)
    @Column({ type: DataType.UUID, allowNull: false })
    devotee_id!: string;

    @Column({
        type: DataType.STRING(20),
        unique: true,
        allowNull: false
    })
    donation_code!: string;

    @Column({
        type: DataType.DECIMAL(12, 2),
        allowNull: false
    })
    amount!: number;

    @Column({
        type: DataType.ENUM(
            'General',
            'Annadanam',
            'Renovation',
            'Festival',
            'Education',
            'Medical'
        )
    })
    category?: string;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    donation_date!: Date;

    @Column({
        type: DataType.ENUM('Hundi', 'Online', 'Counter')
    })
    channel?: string;

    @Column({
        type: DataType.ENUM('Cash', 'UPI', 'Card')
    })
    payment_method?: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    transaction_ref!: string;

    @Column({
        type: DataType.ENUM('Success', 'Pending', 'Failed')
    })
    payment_status?: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    receipt_number!: string;

    @Column(DataType.TEXT)
    notes?: string;


    @Column({ type: DataType.INTEGER, allowNull: true })
    created_by?: number;


    @Column({ type: DataType.INTEGER, allowNull: true })
    updated_by?: number;

    @BelongsTo(() => Devotee, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    devotee!: Devotee;

    @Column({
        type: DataType.UUID
    })
    created_user!: string;

    @Column({
        type: DataType.UUID
    })
    updated_user!: string;
}
