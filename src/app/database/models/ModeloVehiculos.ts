const ModeloVehiculos = {
  tabla: 'Vehiculos',
  tienePK: true,
  idVehiculo: 'id',
  Marca: 'string',
  Modelo: 'string',
  Color: 'string',
  SerialMotor: 'string',
  Placa: 'string',
  Activado: 'boolean',
  Ano: 'string',
  Foto: 'foto',
  Usuario: {
    tipo: 'model',
    modelo: 'ModeloUsuarios',
    FK: 'Usuario_idUsuario'
  }
};

export { ModeloVehiculos };
