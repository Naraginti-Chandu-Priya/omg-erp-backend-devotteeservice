import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';

import { Devotee } from './devotee';

@Table({
  tableName: 'spiritualinformations',
  timestamps: true,
  underscored: true
})
export class Spiritualinformation extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  declare id: string;

  @ForeignKey(() => Devotee)
  @Column({ type: DataType.UUID, allowNull: false, unique: true })
  devotee_id!: string;

  @Column(DataType.STRING(50))
  nakshatra?: string;

  @Column(DataType.STRING(50))
  rasi?: string;

  @Column(DataType.STRING(100))
  gothram?: string;

  @BelongsTo(() => Devotee, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  devotee!: Devotee;
}
