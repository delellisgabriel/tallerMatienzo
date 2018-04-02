const ModeloOrdenReparacion = {
  tabla: 'OrdenReparacion',
  tienePK: true,
  idOrdenReparacion: 'id',
  Diagnostico: 'string',
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
  Repuestos: {
    tipo: 'through',
    modelo: 'ModeloRepuestos',
    FK: 'OrdenReparacion_idOrdenReparacion',
    modeloDebil: 'ModeloUtilizo',
    FKDebil: 'Repuestos_idRepuestos'
  },
  Mecanico: {
    tipo: 'model',
    modelo: 'ModeloUsuarios',
    FK: 'Mecanico_idUsuario'
  }
};

export { ModeloOrdenReparacion };
