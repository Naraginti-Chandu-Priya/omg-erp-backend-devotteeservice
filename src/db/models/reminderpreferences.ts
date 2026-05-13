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
  tableName: 'reminderpreferences',
  timestamps: true,
  underscored: true
})
export class ReminderPreference extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4
  })
  declare id: string;

  @ForeignKey(() => Devotee)
  @Column({ type: DataType.UUID, unique: true })
  devotee_id!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  birthday_reminder!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  nakshatra_anniversary!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  festival_greetings!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  donation_anniversary!: boolean;

  @BelongsTo(() => Devotee, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  devotee!: Devotee;
}
