

export interface ServiceDTO {
  id: string;
  name: string;
  description: string;
  image: string
  url: string;
  public_id: string;
  available: boolean;
}

export type PostServiceDTO = Omit<ServiceDTO, 'id'>



