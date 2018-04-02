const ModeloOrdenReparacion = {
  tabla: 'OrdenReparacion',
  tienePK: true,
  idOrdenReparacion: 'id',
  Diagnostico: 'string',
  Kilometraje: 'number',
  Cauchos: 'string',
  Llaves: 'string',
  Gato: 'string',
  Herramientas: 'string',
  Carroceria: 'string',
  EquipoSonido: 'string',
  Otros: 'string',
  Completada: 'boolean',
  FechaRecepcion: 'fecha',
  idVehiculo: 'id',
  Vehiculo: {
    tipo: 'model',
    modelo: 'ModeloVehiculos',
    FK: 'Vehiculos_idVehiculo'
  },
  Repuestos: 'string',
  Mecanico: {
    tipo: 'model',
    modelo: 'ModeloUsuarios',
    FK: 'Mecanico_idUsuario'
  }
};

export { ModeloOrdenReparacion };
