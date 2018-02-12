const ModeloCitas = {
  tabla: 'Citas',
  tienePK: true,
  FechaTentativaInicial: 'fecha',
  FechaTentativaFinal: 'fecha',
  FechaAsignada: 'fecha',
  Motivo: 'string',
  Usuario: {
    tipo: 'model',
    modelo: 'ModeloUsuarios',
    FK: 'Usuarios_idUsuario'
  },
  Vehiculo: {
    tipo: 'model',
    modelo: 'ModeloVehiculos',
    FK: 'Vehiculos_idVehiculo'
  }
};

export { ModeloCitas };
