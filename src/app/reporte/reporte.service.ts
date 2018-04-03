import { Injectable } from '@angular/core';
import { base } from '../base';
import * as jsPDF from 'jspdf';
import {DatabaseService} from '../database/database.service';
import * as moment from 'moment';
import {AuthService} from '../authService/auth.service';

@Injectable()
export class ReporteService {

  constructor(private db: DatabaseService, private auth: AuthService) { }

  filtrarCitas(citas: Array<object>, cliente: object) {
    const citasFinal = [];
    for (const cita of citas) {
      if ((cita as any).Usuario.idUsuario === (cliente as any).idUsuario) {
        citasFinal.push(cita);
      }
    }
    return citasFinal;
  }

  filtrarOrdenes(ordenes: Array<object>, cliente: object) {
    const ordenesFinal = [];
    for (let i = 0; i < ordenes.length ; i++) {
      if ((ordenes[i] as any).Vehiculo.idUsuario === (cliente as any).idUsuario) {
        ordenesFinal.push(ordenes[i]);
      }
    }
    return ordenesFinal;
  }

  async generarReporte(Excel?: boolean, PDF?: boolean, fechaInicial?: string, fechaFinal?: string,
                 usuario?: object, vehiculo?: object, modelo?: string, isMecanico?: boolean) {
    const doc = new jsPDF();
    doc.setFont('Roboto');
    let text = '';
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
          this.db.getMe('ModeloUsuarios', {
            idUsuario: (usuario as any).idUsuario
          }).then((resp) => {
            this.db.getMe('ModeloCitas').then((resp2) => {
              this.db.getMe('ModeloOrdenReparacion').then(async (resp3) => {
                if ((resp as any).resultado.length > 0) {
                  const solicitante = await this.auth.getUser();
                  let lineas = 0;
                  const cliente = (resp as any).resultado[0];
                  const citas = this.filtrarCitas((resp2 as any).resultado, cliente);
                  const fecha = moment().format('DD/MM/YYYY');
                  const vehiculos = cliente.Vehiculos;
                  const ordenes = this.filtrarOrdenes((resp3 as any).resultado, cliente);
                  text += 'Reporte de Usuario\n';
                  text += 'Solicitado por: ' + (solicitante as any).PrimerNombre + ' ' + (solicitante as any).PrimerApellido + '\n';
                  text += 'Fecha: ' + fecha + '\n\n';
                  text += 'Datos del Cliente:\n\n';
                  text += 'Nombre: ' + (cliente as any).PrimerNombre + ' ' + (cliente as any).SegundoNombre + ' ' + (cliente as any).PrimerApellido + ' ' + (cliente as any).SegundoApellido + '\n';
                  text += 'Cedula: ' + (cliente as any).Cedula + '\n';
                  text += 'Correo: ' + (cliente as any).Correo + '\n\n';
                  if (cliente.Vehiculos.length > 0) {
                    text += 'Datos de sus Vehículos:\n\n';
                    lineas = 12;
                    for (const vehicle of vehiculos) {
                      if ((lineas + 6) > 43 ) {
                        doc.text(text, 10, 10);
                        doc.addPage();
                        text = '';
                        lineas = (lineas + 6) - 43;
                      } else {
                        lineas += 6;
                      }
                      text += 'Marca: ' + (vehicle as any).Marca + '\n';
                      text += 'Modelo: ' + (vehicle as any).Modelo + '\n';
                      text += 'Año: ' + (vehicle as any).Ano + '\n';
                      text += 'Color: ' + (vehicle as any).Color + '\n';
                      text += 'Placa: ' + (vehicle as any).Placa + '\n\n';
                    }
                  } else {
                    text += 'El cliente no tiene vehículos registrados\n\n';
                  }
                  if (citas.length > 0) {
                    lineas += 2;
                    if (lineas > 43 ) {
                      doc.text(text, 10, 10);
                      doc.addPage();
                      text = '';
                      lineas -= 43;
                    }
                    text += 'Información de las citas del cliente:\n\n';
                    for (const cita of citas) {
                      if ((lineas + 5) > 43) {
                        doc.text(text, 10, 10);
                        doc.addPage();
                        text = '';
                        lineas = (lineas + 5) - 43;
                      } else {
                        lineas += 5;
                      }
                      const FTI = moment((cita as any).FechaTentativaInicial).format('DD/MM/YYYY');
                      const FTF = moment((cita as any).FechaTentativaFinal).format('DD/MM/YYYY');
                      let FA = '';
                      if ((cita as any).FechaAsignada !== null) {
                        FA = moment((cita as any).FechaAsignada).format('DD/MM/YYYY');
                      } else {
                        FA = 'No asignada';
                      }
                      text += 'Fecha Tentativa Inicial: ' + FTI + '\n';
                      text += 'Fecha Tentativa Final: ' + FTF + '\n';
                      text += 'Fecha Asignada: ' + FA + '\n';
                      text += 'Motivo: ' + (cita as any).Motivo + '\n\n';
                    }
                    if ((ordenes as any).length > 0) {
                      lineas += 2;
                      if (lineas > 43 ) {
                        doc.text(text, 10, 10);
                        doc.addPage();
                        text = '';
                        lineas -= 43;
                      }
                      text += 'Datos de las Órdenes de Reparación de los Vehículos del Cliente:\n\n';
                      for (const orden of ordenes) {
                        if ((lineas + 3) - 43) {
                          doc.text(text, 10, 10);
                          doc.addPage();
                          text = '';
                          lineas = (lineas + 3) - 43;
                        } else {
                          lineas += 3;
                        }
                        text += 'Vehículo: ' + (orden as any).Vehiculo.Marca + ' ' + (orden as any).Vehiculo.Modelo + ' ' + (orden as any).Vehiculo.Ano + ' ' + (orden as any).Vehiculo.Color + '\n';
                        text += 'Mecánico: ' + (orden as any).Mecanico.PrimerNombre + ' ' + (orden as any).Mecanico.PrimerApellido + '\n\n';
                      }
                    } else {
                      text += 'El cliente no tiene órdenes de reparación asociados a sus vehículos\n\n';
                    }
                    doc.text(text, 10, 10);
                    doc.save();
                  }
                } else {
                  console.error('El cliente del cual el reporte fue solicitado no existe');
                }
              }).catch((err) => console.error(err));
            }).catch((err) => console.error(err));
          }).catch((err) => console.error(err));
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
