
import { AllowNull, Column, Default, PrimaryKey, Table, DataType, Model } from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: 'users'
})
export class User extends Model {

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string

  @AllowNull(false)
  @Column(DataType.STRING)
  username: string

  @AllowNull(false)
  @Column(DataType.STRING)
  email: string

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string

  @AllowNull(false)
  @Default('customer')
  @Column(DataType.STRING)
  role: string
}

