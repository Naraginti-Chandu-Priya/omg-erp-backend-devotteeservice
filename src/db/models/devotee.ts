import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  HasOne
} from 'sequelize-typescript';


import { FamilyMembers } from './familymembers';
import { ReminderPreference } from './reminderpreferences';
import { CommunicationPreference } from './communicationpreference';
import { Spiritualinformation } from './spiritualinformation';
import { Donation } from './donations';
import { PoojaSeva } from './poojaseva';


@Table({ tableName: 'devotees', timestamps: true, underscored: true })
export class Devotee extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  declare id: string;

  @Column({ type: DataType.STRING(20), unique: true })
  devotee_code?: string;

  @Column({ type: DataType.UUID, allowNull: false })
  temple_id!: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  first_name!: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  last_name!: string;

  @Column({ type: DataType.STRING(20), allowNull: true, unique: true })
  phone?: string;

  @Column({ type: DataType.STRING(150), allowNull: true, unique: true })
  email?: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  address_line?: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  city?: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  state?: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    defaultValue: 'India'
  })
  country?: string;

  @Column({ type: DataType.DATE, allowNull: true })
  date_of_birth?: Date;

  @Column({
    type: DataType.ENUM('Male', 'Female', 'Other'),
    allowNull: true
  })
  gender?: 'Male' | 'Female' | 'Other';

  @Column({ type: DataType.STRING(100), allowNull: true })
  occupation?: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  devotee_profile_picture?: string;

  @Column({
    type: DataType.ENUM('Active', 'Inactive'),
    allowNull: false,
    defaultValue: 'Active'
  })
  status!: 'Active' | 'Inactive';

  @Column({
    type: DataType.ENUM('Regular', 'Silver', 'Gold', 'Platinum', 'VIP'),
    allowNull: true
  })
  membership_type?: 'Regular' | 'Silver' | 'Gold' | 'Platinum' | 'VIP';


  @Column({ type: DataType.UUID, allowNull: true })
  created_by?: string;


  @Column({ type: DataType.UUID, allowNull: true })
  updated_by?: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  is_deleted!: boolean;



  @HasOne(() => Spiritualinformation, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  spiritual_profile!: Spiritualinformation;

  @HasOne(() => CommunicationPreference, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  communication_preference!: CommunicationPreference;

  @HasOne(() => ReminderPreference, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  reminder_preference!: ReminderPreference;

  @HasMany(() => FamilyMembers, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  family_members!: FamilyMembers[];

  @HasMany(() => Donation)
  donations!: Donation[];

  @HasMany(() => PoojaSeva)
  pooja_sevas!: PoojaSeva[];
}
