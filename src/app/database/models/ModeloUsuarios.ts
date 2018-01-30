const ModeloUsuarios = {
  tabla: 'Usuarios',
  tienePK: true,
  idUsuario: 'id',
  PrimerNombre: 'string',
  SegundoNombre: 'string',
  PrimerApellido: 'string',
  SegundoApellido: 'string',
  Cedula: 'number',
  Password: 'string',
  Foto: 'foto',
  Rol: 'number',
  Correo: 'string',
  Vehiculos: {
    tipo: 'collection',
    modelo: 'ModeloVehiculos',
    FK: 'Usuario_idUsuario'
  }
};

export { ModeloUsuarios };
