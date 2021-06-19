export interface VehicleTypes {
  isPrimary: boolean;
  name: string;
}

export interface ManufacturersResults {
  country: string;
  mfrCommonName: string;
  mfrID: number;
  mfrName: string;
  vehicleTypes: VehicleTypes[];
}
