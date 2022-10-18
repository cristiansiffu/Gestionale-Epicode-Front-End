import { Municipalities } from "./municipalities";

export interface Customers {
  id: number
  ragioneSociale: string;
  partitaIva: string;
  tipoCliente: string;
  email: string;
  pec: string;
  telefono: string;
  nomeContatto: string;
  cognomeContatto: string;
  telefonoContatto: string;
  emailContatto: string;
  indirizzoSedeOperativa: {
    id: number;
    via: string;
    civico: string;
    cap: string;
    localita: string;
    comune: Municipalities;
  };
  indirizzoSedeLegale: {
    id: number
    via: string;
    civico: string;
    cap: string;
    localita: string;
    comune: Municipalities;
  };
  dataInserimento: string;
  dataUltimoContatto: string;
  fatturatoAnnuale: number;
}
