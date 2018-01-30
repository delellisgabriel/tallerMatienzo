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
  FechaCulminacion: 'fecha',
  Vehiculo: {
    tipo: 'model',
    modelo: 'ModeloVehiculos',
    FK: 'Vehiculos_idVehiculo'
  },
  Fotos: {
    tipo: 'collection',
    modelo: 'ModeloFotos',
    FK: 'OrdenReparacion_idOrdenReparacion'
  },
  Repuestos: {
    tipo: 'through',
    modelo: 'ModeloRepuestos',
    FK: 'Repuestos_idRepuestos',
    modeloDebil: 'ModeloUtilizo',
    FKDebil: 'Repuestos_idRepuestos'
  }
};

export { ModeloOrdenReparacion };
