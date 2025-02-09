const enum Role {
  ADMIN = 'admin',
  CUSTOMER = 'customer'
}

export interface UserI {
  id: string,
  name: string,
  email: string,
  password: string,
  role: Role.CUSTOMER
}

export type PostUserI = Omit<UserI, 'id' | 'role'>
