import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';

import { Devotee } from './devotee';

@Table({ tableName: 'familymembers', timestamps: true, underscored: true })
export class FamilyMembers extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4
  })
  declare id: string;

  @ForeignKey(() => Devotee)
  @Column(DataType.UUID)
  devotee_id!: string;

  @Column(DataType.STRING)
  member_name!: string;

  @Column(
    DataType.ENUM(
      'Spouse',
      'Son',
      'Daughter',
      'Father',
      'Mother',
      'Brother',
      'Sister',
      'Other'
    )
  )
  relation!: string;

  @Column(DataType.DATE)
  date_of_birth?: Date;

  @Column(DataType.ENUM('Male', 'Female', 'Other'))
  gender?: string;

  @Column(DataType.STRING)
  occupation?: string;

  @Column(DataType.STRING)
  phone?: string;

  @Column(DataType.STRING)
  rasi?: string;

  @Column(DataType.STRING)
  nakshatra?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  parent_node!: boolean;

  @BelongsTo(() => Devotee, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  devotee!: Devotee;
}
