import { AllowNull, Column, DataType, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';


@Table({
  timestamps: true,
  tableName: 'services'
})
export class Service extends Model {

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string

  @AllowNull(false)
  @Column(DataType.STRING)
  description: string

  @AllowNull(false)
  @Column(DataType.STRING)
  image: string

  @AllowNull(false)
  @Column(DataType.STRING)
  public_id: string

  @AllowNull(false)
  @Column(DataType.STRING)
  url: string

  @Default(false)
  @Column(DataType.BOOLEAN)
  available: boolean
}

