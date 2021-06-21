export interface VehicleTypes {
  isPrimary: boolean;
  name: string;
}

export interface ManufacturersResults {
  country: string;
  mfrCommonName: string;
  mfrId: number;
  mfrName: string;
  vehicleTypes: VehicleTypes[];
}

export interface ManufacturersList extends ManufacturersResults {
  id: number;
}
