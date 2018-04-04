import { Injectable } from '@angular/core';
import { base } from '../base';
import * as jsPDF from 'jspdf';
import {DatabaseService} from '../database/database.service';
import * as moment from 'moment';
import {AuthService} from '../authService/auth.service';
import * as excelNode from 'excel4node';

@Injectable()
export class ReporteService {

  constructor(private db: DatabaseService, private auth: AuthService) { }

  private filtrarCitas(citas: Array<object>, cliente: object) {
    const citasFinal = [];
    for (const cita of citas) {
      if ((cita as any).Usuario.idUsuario === (cliente as any).idUsuario) {
        citasFinal.push(cita);
      }
    }
    return citasFinal;
  }

  private filtrarOrdenes(ordenes: Array<object>, cliente: object) {
    const ordenesFinal = [];
    const vehicles = (cliente as any).Vehiculos;
    for (let i = 0; i < ordenes.length ; i++) {
      for (const vehicle of vehicles) {
        if ((ordenes[i] as any).Vehiculo.idVehiculo === (vehicle as any).idVehiculo) {
          ordenesFinal.push(ordenes[i]);
        }
      }
    }
    return ordenesFinal;
  }

  private filtrarOrdenesMecanico(ordenes: Array<object>, mecanico: object) {
    const ordenesFinal = [];
    for (const orden of ordenes) {
      if ((orden as any).Mecanico.idUsuario === (mecanico as any).idUsuario) {
        ordenesFinal.push(orden);
      }
    }
    return ordenesFinal;
  }

  private filtrarOrdenesVehiculo(ordenes: Array<object>, vehiculo: object) {
    const ordenesFinal = [];
    for (const orden of ordenes) {
      if ((orden as any).Vehiculo.idVehiculo === (vehiculo as any).idVehiculo) {
        ordenesFinal.push(orden);
      }
    }
    return ordenesFinal;
  }

  private filtrarOrdenesModelo(ordenes: Array<object>, modelo: string) {
    const ordenesFinal = [];
    for (const orden of ordenes) {
      if ((orden as any).Vehiculo.Modelo === modelo) {
        ordenesFinal.push(orden);
      }
    }
    return ordenesFinal;
  }

  async generarReporte(Excel?: boolean, PDF?: boolean, fechaInicial?: string, fechaFinal?: string,
                 usuario?: object, vehiculo?: object, modelo?: string, isMecanico?: boolean) {
    const doc = new jsPDF();
    doc.setFont('Roboto');
    const excel = new excelNode();
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Mecánico');
    const style = workbook.createStyle({
      font: {
        color: '#FF0800',
        size: 12
      },
      numberFormat: '$#,##0.00; ($#,##0.00); -'
    });
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
          if (PDF) {
            this.db.getMe('ModeloUsuarios', {
              idUsuario: (usuario as any).idUsuario
            }).then((resp) => {
              this.db.getMe('ModeloOrdenReparacion').then(async (resp2) => {
                const solicitante = await this.auth.getUser();
                const mecanico = (resp as any).resultado[0];
                const fecha = moment().format('DD/MM/YYYY');
                if ((mecanico as any).Rol !== 3) {
                  throw new Error('El usuario del cual se solicitó el reporte no es mecánico');
                }
                let lineas = 0;
                const ordenes = this.filtrarOrdenesMecanico((resp2 as any).resultado, mecanico);
                text += 'Reporte de Mecánico\n';
                text += 'Solicitado por: ' + (solicitante as any).PrimerNombre + ' ' + (solicitante as any).PrimerApellido + '\n';
                text += 'Fecha: ' + fecha + '\n\n';
                lineas += 4;
                if (ordenes && ordenes.length > 0) {
                  text += 'Órdenes de Reparación del Mecánico:\n\n';
                  if (ordenes && ordenes.length > 0) {
                    text += 'Órdenes de Reparación del Vehículo: ' + '\n\n';
                    lineas += 14;
                    for (const orden of ordenes) {
                      if ((lineas + 4) > 43) {
                        doc.text(text, 10, 10);
                        doc.addPage();
                        text = '';
                        lineas = (lineas + 4) - 43;
                      } else {
                        lineas += 4;
                      }
                      text += 'Mecánico: ' + (orden as any).Mecanico.PrimerNombre + ' ' + (orden as any).Mecanico.PrimerApellido + '\n';
                      text += 'Kilometraje: ' + (orden as any).Kilometraje + '\n';
                      if ((orden as any).FechaRecepcion !== null && moment((orden as any).FechaRecepcion).format('DD/MM/YYYY') !== 'Invalid date') {
                        text += 'Fecha Asignada: ' + moment((orden as any).FechaRecepcion).format('DD/MM/YYYY') + '\n\n';
                      } else {
                        text += 'Fecha Asignada: No tiene fecha asignada\n\n';
                      }
                    }
                    const repuestos = (ordenes as any).Repuestos;
                    if (repuestos && repuestos.length > 0) {
                      text += 'Repuestos;\n\n';
                      lineas += 2;
                      for (const repuesto of repuestos) {
                        if ((lineas + 1) > 43) {
                          doc.text(text, 10, 10);
                          doc.addPage();
                          text = '';
                          lineas = (lineas + 1) - 43;
                        } else {
                          lineas++;
                        }
                        text += 'Nombre: ' + (repuesto as any).Nombre + '\n\n';
                      }
                    } else {
                      text += 'No hay repuestos asociados a esta orden de reparación\n';
                    }
                    doc.text(text, 10, 10);
                    doc.save();
                  } else {
                    text += 'No hay órdenes de reparación para el vehículo escogido\n\n';
                  }
                }
            }).catch((err) => console.error(err));
              }).catch((err) => console.error(err));
          }
          if (Excel) {

          }
        } else {
          // El reporte a generar tratará al usuario como cliente, sin importar su rol
          if (PDF)  {
            this.db.getMe('ModeloUsuarios', usuario).then((resp) => {
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
                    if (ordenes && ordenes.length > 0) {
                      text += 'Datos de las Órdenes'
                    }
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
                      if (lineas > 43) {
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
                          if ((lineas + 3) > 43) {
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
          if (Excel) {
            // Reporte de cliente en Excel
          }
        }
      } else if (vehiculo) {
        // Se debe generar un reporte de vehiculo
        if (PDF) {
          this.db.getMeOne('ModeloVehiculos', (vehiculo as any).idVehiculo).then((resp) => {
            const vehicle = (resp as any).resultado;
            this.db.getMe('ModeloOrdenReparacion').then(async (resp2) => {
              const solicitante = await this.auth.getUser();
              let lineas = 0;
              const ordenes = this.filtrarOrdenesVehiculo((resp2 as any).resultado, vehicle);
              const fecha = moment().format('DD/MM/YYYY');
              text += 'Reporte de Vehículo\n';
              text += 'Solicitado por: ' + (solicitante as any).PrimerNombre + ' ' + (solicitante as any).PrimerApellido + '\n';
              text += 'Fecha: ' + fecha + '\n\n';
              text += 'Datos del Vehículo:\n\n';
              text += 'Marca: ' + (vehicle as any).Marca + '\n';
              text += 'Modelo: ' + (vehicle as any).Modelo + '\n';
              text += 'Año: ' + (vehicle as any).Ano + '\n';
              text += 'Color: ' + (vehicle as any).Color + '\n';
              text += 'Placa: ' + (vehicle as any).Placa + '\n\n';
              if (ordenes && ordenes.length > 0) {
                text += 'Órdenes de Reparación del Vehículo: ' + '\n\n';
                lineas += 14;
                for (const orden of ordenes) {
                  if ((lineas + 4) > 43) {
                    doc.text(text, 10, 10);
                    doc.addPage();
                    text = '';
                    lineas = (lineas + 4) - 43;
                  } else {
                    lineas += 4;
                  }
                  text += 'Mecánico: ' + (orden as any).Mecanico.PrimerNombre + ' ' + (orden as any).Mecanico.PrimerApellido + '\n';
                  text += 'Kilometraje: ' + (orden as any).Kilometraje + '\n';
                  if ((orden as any).FechaRecepcion !== null) {
                    text += 'Fecha Asignada: ' + moment((orden as any).FechaRecepcion).format('DD/MM/YYYY') + '\n\n';
                  } else {
                    text += 'Fecha Asignada: No tiene fecha asignada\n\n';
                  }
                }
                const repuestos = (ordenes as any).Repuestos;
                if (repuestos && repuestos.length > 0) {
                  text += 'Repuestos;\n\n';
                  lineas += 2;
                  for (const repuesto of repuestos) {
                    if ((lineas + 1) > 43) {
                      doc.text(text, 10, 10);
                      doc.addPage();
                      text = '';
                      lineas = (lineas + 1) - 43;
                    } else {
                      lineas++;
                    }
                    text += 'Nombre: ' + (repuesto as any).Nombre + '\n\n';
                  }
                } else {
                  text += 'No hay repuestos asociados a esta orden de reparación\n';
                }
                doc.text(text, 10, 10);
                doc.save();
              } else {
                text += 'No hay órdenes de reparación para el vehículo escogido\n\n';
              }
            }).catch((err) => console.error(err));
          }).catch((err) => console.error(err));
        }
      } else if (modelo) {
        // Se debe generar un reporte sobre todos los vehículos del modelo
        if (PDF) {
          this.db.getMe('ModeloOrdenReparacion').then(async (resp) => {
            const ordenes = this.filtrarOrdenesModelo((resp as any).resultado, modelo);
            const solicitante = await this.auth.getUser();
            let lineas = 0;
            const fecha = moment().format('DD/MM/YYYY');
            text += 'Reporte de Vehículo\n';
            text += 'Solicitado por: ' + (solicitante as any).PrimerNombre + ' ' + (solicitante as any).PrimerApellido + '\n';
            text += 'Fecha: ' + fecha + '\n\n';
            if (ordenes && ordenes.length > 0) {
              text += 'Órdenes de Reparación del Vehículo: ' + '\n\n';
              lineas += 4;
              for (const orden of ordenes) {
                if ((lineas + 4) > 43) {
                  doc.text(text, 10, 10);
                  doc.addPage();
                  text = '';
                  lineas = (lineas + 4) - 43;
                } else {
                  lineas += 4;
                }
                text += 'Mecánico: ' + (orden as any).Mecanico.PrimerNombre + ' ' + (orden as any).Mecanico.PrimerApellido + '\n';
                text += 'Kilometraje: ' + (orden as any).Kilometraje + '\n';
                if ((orden as any).FechaRecepcion !== null && moment((orden as any).FechaRecepcion).format('DD/MM/YYYY') !== 'Invalid date') {
                  text += 'Fecha Asignada: ' + moment((orden as any).FechaRecepcion).format('DD/MM/YYYY') + '\n\n';
                } else {
                  text += 'Fecha Asignada: No tiene fecha asignada\n\n';
                }
              }
              const repuestos = (ordenes as any).Repuestos;
              if (repuestos && repuestos.length > 0) {
                text += 'Repuestos;\n\n';
                lineas += 2;
                for (const repuesto of repuestos) {
                  if ((lineas + 1) > 43) {
                    doc.text(text, 10, 10);
                    doc.addPage();
                    text = '';
                    lineas = (lineas + 1) - 43;
                  } else {
                    lineas++;
                  }
                  text += 'Nombre: ' + (repuesto as any).Nombre + '\n\n';
                }
              } else {
                text += 'No hay repuestos asociados a esta orden de reparación\n';
              }
              doc.text(text, 10, 10);
              doc.save();
            } else {
              text += 'No hay órdenes de reparación para el vehículo escogido\n\n';
            }
          }).catch((err) => console.error(err));
        }
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
