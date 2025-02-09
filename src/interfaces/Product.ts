export interface Image {
  name: string;
  size: number;
  type: string;
  path: string;
  lastModified: number;
  lastModifiedDate: Date;
  webkitRelativePath: string;
}

export interface ProductI {
  id: string;
  name: string;
  description: string;
  image: Image;
  url: string;
  public_id: string;
  available: boolean;
}

export type PostProductT = Omit<ProductI, 'id' | 'available'>

export type UpdateProductT = Pick<ProductI, 'name' | 'description' | 'url' | 'public_id' | 'available'> & {
  image: string
}
