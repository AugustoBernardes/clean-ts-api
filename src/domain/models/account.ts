export type IAccountModel = {
  _id: string
  name: string
  email: string
  password: string
}

export type IAddAccountResponse = {
  acknowledged: boolean
  insertedId: string
}
