import { Injectable } from '@angular/core';
import { base } from '../base';
import * as jsPDF from 'jspdf';
import {DatabaseService} from '../database/database.service';
import * as moment from 'moment';

@Injectable()
export class ReporteService {

  constructor(private db: DatabaseService) { }

  generarReporte(Excel?: boolean, PDF?: boolean, fechaInicial?: string, fechaFinal?: string,
                 usuario?: object, vehiculo?: object, modelo?: string, isMecanico?: boolean) {
    /*const doc = new jsPDF();
    doc.setFont('Roboto');
    let text = '';*/
    let fechaI = '';
    let fechaF = '';
    if (this.sonFechasValidas(fechaInicial, fechaFinal)) {
      fechaI = fechaInicial;
      fechaF = fechaFinal;
    } else {
      fechaI = '1900-01-01';
      fechaF = '2100-12-31';
    }
    if (Excel || PDF) {
      if (usuario) {
        // Hay que generar un reporte de usuario
        if (isMecanico) {
          // El reporte tratará al usuario como un mecánico

        } else {
          // El reporte a generar tratará al usuario como cliente, sin importar su rol
          // this.generarReporteCliente(usuario, Excel, PDF, fechaI, fechaF);
        }
      } else if (vehiculo) {
        // Se debe generar un reporte de vehiculo

      } else if (modelo) {
        // Se debe generar un reporte sobre todos los vehículos del modelo

      } else {
        // Se debe generar un reporte vacío

      }
    } else {
      // Generar un reporte vacío

    }
  }

  private sonFechasValidas(fechaInicial: string, fechaFinal: string): boolean {
    const momentoI = moment(fechaInicial);
    const momentoF = moment(fechaFinal);
    if (momentoI.isValid() && momentoF.isValid() && momentoI.isBefore(momentoF)) {
      return moment(fechaInicial, 'YYYY-MM-D').format('YYYY-MM-D') === fechaInicial &&
        moment(fechaFinal, 'YYYY-MM-D').format('YYYY-MM-D') === fechaFinal;
    }
    return false;
  }

}
