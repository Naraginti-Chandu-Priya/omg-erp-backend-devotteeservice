import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';

import { Devotee } from './devotee';

@Table({ tableName: 'poojasevas', timestamps: true, underscored: true })
export class PoojaSeva extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  declare id: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
    unique: true
  })
  seva_code?: string;

  @ForeignKey(() => Devotee)
  @Column({ type: DataType.UUID, allowNull: true })
  devotee_id?: string;

  @Column({ type: DataType.STRING(150), allowNull: false })
  seva_name!: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  seva_amount!: number;

  @Column({ type: DataType.DATE, allowNull: false })
  seva_date!: Date;

  @Column({ type: DataType.STRING(100), allowNull: true })
  first_name?: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  last_name?: string;

  @Column({ type: DataType.STRING(20), allowNull: true })
  phone?: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  gothram?: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  nakshatra?: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  rasi?: string;

  @Column({
    type: DataType.ENUM('Scheduled', 'Completed', 'Cancelled'),
    allowNull: false,
    defaultValue: 'Scheduled'
  })
  status!: 'Scheduled' | 'Completed' | 'Cancelled';

  @Column({
    type: DataType.ENUM('Pending', 'Paid', 'Refunded'),
    allowNull: false,
    defaultValue: 'Pending'
  })
  payment_status!: 'Pending' | 'Paid' | 'Refunded';

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    unique: true
  })
  receipt_number?: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  notes?: string;

  @Column({ type: DataType.UUID, allowNull: true })
  registered_by?: string;

  @Column({ type: DataType.UUID, allowNull: true })
  updated_by?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  is_deleted!: boolean;

  @BelongsTo(() => Devotee, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  devotee!: Devotee;
}
