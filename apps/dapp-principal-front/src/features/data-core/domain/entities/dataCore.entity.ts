export interface IDataCore {
  companyCodes: Area[];
  subCompanyCodes: Area[];
  machineIds: Area[];
  areas: Area[];
  plcs: Area[];
  lineas: Area[];
  eventos: Area[];
}

export interface Area {
  id: string;
  name: string;
}
