

export interface ProductDTO {
  id: string;
  name: string;
  description: string;
  image: string
  url: string;
  public_id: string;
  available: boolean;
}

export type PostProductDTO = Omit<ProductDTO, 'id'>



