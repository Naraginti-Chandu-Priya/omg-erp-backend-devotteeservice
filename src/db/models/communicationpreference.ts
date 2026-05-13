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
  tableName: 'communicationpreferences',
  timestamps: true,
  underscored: true
})
export class CommunicationPreference extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4
  })
  declare id: string;

  @ForeignKey(() => Devotee)
  @Column({ type: DataType.UUID, unique: true })
  devotee_id!: string;

  @Column({ defaultValue: true })
  sms_enabled!: boolean;

  @Column({ defaultValue: true })
  email_enabled!: boolean;

  @Column({ defaultValue: true })
  whatsapp_enabled!: boolean;

  @Column(DataType.ENUM('Tamil', 'English', 'Hindi'))
  preferred_language?: string;

  @Column({ defaultValue: false })
  unsubscribed_all!: boolean;

  @BelongsTo(() => Devotee, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  devotee!: Devotee;
}
