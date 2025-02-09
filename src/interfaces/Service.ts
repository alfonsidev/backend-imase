type Image = {
  name: string;
  size: number;
  type: string;
  path: string
  lastModified: number;
  lastModifiedDate: Date;
  webkitRelativePath: string;
}

export interface ServiceI {
  id: string;
  name: string;
  description: string;
  image: Image;
  url: string;
  public_id: string;
  available: boolean;
}

export type PostServiceT = Omit<ServiceI, 'id' | 'available'>
