import { Table, Model, Column, IsUUID, PrimaryKey, DataType, Default, AllowNull, Unique } from 'sequelize-typescript'


@Table({
  timestamps: true,
  tableName: 'products'
})
export class Product extends Model {

  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string

  @AllowNull(false)
  @Unique(true)
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

  @Default(true)
  @Column(DataType.BOOLEAN)
  available: boolean
}



