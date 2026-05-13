import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'poojas',
    timestamps: true,
    underscored: true
})
export class Pooja extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    pooja_name!: string;

    @Column({
        type: DataType.ENUM('daily', 'special', 'festival'),
        allowNull: false
    })
    pooja_type!: 'daily' | 'special' | 'festival';

    @Column({ type: DataType.DECIMAL, allowNull: false })
    pooja_price!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    pooja_duration!: string;
}
