
export interface QueryI {
  limit?: number,
  offset?: number,
  search?: string,
  name?: string
}


export interface OptionsI {
  where: object;
  order: string[][];
  limit?: number;
  offset?: number;
}
