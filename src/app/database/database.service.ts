import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ModeloCitas,
  ModeloFotos,
  ModeloOrdenReparacion,
  ModeloRepuestos,
  ModeloUsuarios,
  ModeloUtilizo,
  ModeloVehiculos
} from './models/';
import 'rxjs/add/operator/toPromise';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

const base = 'http://localhost:3000/';

@Injectable()
export class DatabaseService {

  private clave = 'z9>nV?:"&)~4*d_T[6k{T3wy2;.#Vd*+';
  private modelos: object;

  constructor(private http: HttpClient) {
    this.modelos = {
      ModeloCitas,
      ModeloFotos,
      ModeloOrdenReparacion,
      ModeloRepuestos,
      ModeloUsuarios,
      ModeloUtilizo,
      ModeloVehiculos
    };
  }

  dameSubModelos(modelo: object): Array<object> {
    const array: Array<object> = [];
    for (const llave of Object.keys(modelo)) {
      if (typeof modelo[llave] === 'object') {
        array.push(modelo[llave]);
      }
    }
    return array;
  }

  subModelosParaEnviar(modelo: object): Array<object> {
    const array: Array<object> = [];
    for (const llave of Object.keys(modelo)) {
      if (typeof modelo[llave] === 'object') {
        if (modelo['tipo'] === 'through') {
          array.push({ [llave]: this.modelos[modelo[llave]['modeloDebil']] });
        } else {
          array.push({ [llave]: this.modelos[modelo[llave]['modelo']] });
        }
      }
    }
    return array;
  }

  encuentraID(modelo: object): string {
    for (const llave of Object.keys(modelo)) {
      if (modelo[llave] === 'id') {
        return llave;
      }
    }
    return undefined;
  }

  atributosBusqueda(atributos: object): string {
    const llaves = Object.keys(atributos);
    let cadena = ' where ';
    for (const llave of llaves) {
      const comillas = (typeof atributos[llave] === 'string' ? '\'' : '');
      if (llave === llaves[llaves.length - 1]) {
        cadena += (llave + ' = ' + comillas + atributos[llave] + comillas + '; ');
      } else {
        cadena += (llave + ' = ' + comillas + atributos[llave] + comillas + ' and ');
      }
    }
    return cadena;
  }

  atributosEstanBien(atributos: object, modelo: object): boolean {
    for (const atributo of Object.keys(atributos)) {
      if (!modelo[atributo]) {
        return false;
      }
      switch (modelo[atributo]) { // no hace validación de fecha, pero podría implementarse fácilmente con moment.js
        case 'id':
          if (typeof atributos[atributo] !== 'number') {
            return false;
          }
          break;
        case 'string':
          if (typeof atributos[atributo] !== 'string') {
            return false;
          }
          break;
        case 'number':
          if (typeof atributos[atributo] !== 'number') {
            return false;
          }
          break;
        case 'boolean':
          if (typeof atributos[atributo] !== 'boolean') {
            return false;
          }
          break;
        // case fecha: (con moment.js, usando el método .isValid()) lo dejo para alguien menos flojo
        default:
          if (typeof atributos[atributo] === 'object') {
            return false;
          }
          break;
      }
    }
    return true;
  }

  modeloEsValido(modelo: object): boolean {
    let buleano = false;
    if (modelo['tienePK']) {
      for (const llave of Object.keys(modelo)) {
        if (modelo[llave] === 'id') {
          buleano = true;
        }
      }
      return modelo['tabla'] && buleano;
    } else {
      return modelo['tabla'];
    }
  }

  subModeloEsValido(subModelo: object): boolean {
    if (subModelo['tipo'] === 'model' || subModelo['tipo'] === 'collection' || subModelo['tipo'] === 'through') {
      if (subModelo['tipo'] === 'through') {
        if (!(subModelo['modeloDebil'] && subModelo['FKDebil'])) {
          return false;
        }
      }
      return (this.modelos[subModelo['modelo']] && subModelo['tipo'] && subModelo['FK']);
    } else {
      return false;
    }
  }

  lanzarError(mensaje: string): Promise<Object> {
    return new Promise((req, res) => {
      console.error(mensaje);
      throw new Error(mensaje);
    });
  }

  /* Esta función recibe como primer argumento un string detallando el nombre del modelo
   * y como segundo argumento un objeto que indica atributos secundarios de búsqueda.
   * Por ejemplo, getMe('ModeloVehiculo', { marca: 'Chevrolet', color: 'azul' }).
   * La función regresa una promesa que recibirá un objeto como respuesta del servidor,
   * dicho objeto contendrá un array, y cada elemento del array será una instancia del modelo
   * solicitado (si el modelo contiene otros modelos como atributos, se poblarán de ser posible,
   * pero estos no podrán ser usados como atributos de búsqueda ). Podrían añadirse a dicho objeto
   * funciones auxiliares para refinamiento de datos, como métodos para hacer order, limit, etc */

  getMe(modelo: string, atributos?: object, vieneDeOne?: boolean): Promise<Object> {
    const model = this.modelos[modelo];
    let query: string = 'select * from ' + model.tabla;
    if (model) {
      if (!this.modeloEsValido(model)) {
        return this.lanzarError('El modelo solicitado tiene un formato inválido.');
      }
      let where = '';
      if (atributos) {
        if (this.atributosEstanBien(atributos, model)) {
          where = this.atributosBusqueda(atributos);
        } else {
          return this.lanzarError('Atributos de búsqueda inválidos.');
        }
      }
      const subModelos = this.dameSubModelos(model);
      if (subModelos) {
        let joins = '';
        for (const subModelo of subModelos) {
          if (!this.subModeloEsValido(subModelo)) {
            return this.lanzarError('El formato de algún objeto anidado en el modelo es inválido');
          }
          const modeloExterno = this.modelos[subModelo['modelo']];
          if (!this.modeloEsValido(modeloExterno)) {
            return this.lanzarError('El formato de algún modelo anidado es inválido');
          }
          const idModeloExterno = this.encuentraID(modeloExterno);
          let inner = '';
          switch (subModelo['tipo']) {
            case 'model':
              inner = ' left join ' + modeloExterno['tabla'] + ' on ';
              inner += model['tabla'] + '.' + subModelo['FK'] + ' = ' + modeloExterno['tabla'] + '.' + idModeloExterno;
              break;
            case 'collection':
              if (!this.encuentraID(model)) {
                return this.lanzarError('El modelo solicitado no tiene PK, y por tanto no puede tener un submodelo de tipo collection');
              }
              inner = ' left join ' + modeloExterno['tabla'] + ' on ';
              inner += model['tabla'] + '.' + this.encuentraID(model) + ' = ' + modeloExterno['tabla'] + '.' + subModelo['FK'];
              break;
            case 'through':
              if (!this.encuentraID(model)) {
                return this.lanzarError('El modelo solicitado no tiene PK, y por tanto no puede tener un submodelo de tipo through');
              }
              if (!this.encuentraID(modeloExterno)) {
                return this.lanzarError('El modelo externo de un submodelo de tipo through debe tener PK');
              }
              const modeloDebil = this.modelos[subModelo['modeloDebil']];
              inner += ' left join ' + modeloDebil['tabla'] + ' on ';
              inner += modeloDebil['tabla'] + '.' + subModelo['FK'] + ' = ' + model['tabla'] + '.' + this.encuentraID(model);
              inner += ' right join ' + modeloExterno['tabla'] + ' on ';
              inner += modeloExterno['tabla'] + '.' + this.encuentraID(modeloExterno)
                + ' = ' + modeloDebil['tabla'] + '.' + subModelo['FKDebil'];
              break;
            default:
              return this.lanzarError('Algún objeto anidado tiene un \'tipo\' inválido');
          }
          joins += inner;
        }
        query += joins + where;
        return this.http.post(base + 'queries', {
          query,
          password: this.clave,
          subModelos: this.subModelosParaEnviar(model),
          modelo: model,
          funcion: (vieneDeOne ? 'getMeOne' : 'getMe')
        }).toPromise();
      } else {
        query += where;
        return this.http.post(base + 'queries', {
          password: this.clave,
          query,
          funcion: (vieneDeOne ? 'getMeOne' : 'getMe'),
          modelo: model
          // No hay subModelos
        }).toPromise();
      }
    } else {
      return this.lanzarError('No existe el modelo solicitado');
    }
  }

  /* Esta función recibe como primer argumento un string detallando el nombre del modelo
   * y como segundo argumento un número que indica el valor de la PK correspondiente a la
   * fila que se desea obtener. Si el modelo no tiene PKs arrojará un error.
   * La función regresa una promesa que recibirá un objeto como respuesta del servidor,
   * dicho objeto contendrá una única instancia del modelo solicitado (si el modelo contiene
   * otros modelos como atributos, se poblarán de ser posible, pero estos no podrán ser usados
   * como atributos de búsqueda). */

  getMeOne(modelo: string, ID: number): Promise<Object> {
    const model = this.modelos[modelo];
    if (ID <= 0) {
      this.lanzarError('ID de búsqueda inválido.');
    } else {
      const id = this.encuentraID(model);
      if (model && id) {
        return this.getMe(modelo, { [id]: ID }, true);
      } else {
        return this.lanzarError('Modelo inválido, es posible que el modelo no exista o que el modelo no tenga PK');
      }
    }
  }

  /* Esta función recibe como primer argumento un string detallando el nombre del modelo
   * y como segundo argumento un array de objetos. Cada objeto dentro tiene atributos que
   * serán usados como factores de búsqueda de las filas a ser eliminadas.
   * La función regresa una promesa que contiene un booleano que indica si la operación se
   * completó satisfactoriamente. */

  killThese(modelo: string, lista: Array<object>): Promise<Object> {
    const model = this.modelos[modelo];
    let query = 'delete from ' + model['tabla'] + ' where (';
    if (!this.modeloEsValido(model)) {
      return this.lanzarError('Modelo inválido, es posible que el modelo no exista o que el modelo no tenga PK');
    }
    for (const atributo of lista) {
      const esUltimo = (atributo === lista[lista.length - 1]);
      if (atributo) {
        const llaves = Object.keys(atributo);
        for (const llave of llaves) {
          const ultimaLlave = (llave === llaves[llaves.length - 1]);
          if (!model[llave]) {
            return this.lanzarError('Alguno de los atributos usados para refinar la eliminación no existen en el modelo');
          }
          const comillas = (typeof atributo[llave] === 'string' ? '\'' : '');
          query += llave + ' = ' + comillas + atributo[llave] + comillas;
          if (ultimaLlave) {
            query += ')';
          } else {
            query += ' and ';
          }
        }
        if (!esUltimo) {
          query += ' or (';
        }
      } else {
        return this.lanzarError('Alguno de los objetos en la lista de atributos está vacío.');
      }
    }
    return this.http.post(base + 'queries', {
      query,
      password: this.clave,
      funcion: 'killThese'
    }).toPromise();
  }

  /* Esta función recibe como primer argumento un string detallando el nombre del modelo y como
   * segundo argumento un objeto, cuyos atributos serán usados como factores de búsqueda
   * de las filas a cambiar. El tercer argumento incluye otro objeto cuyos atributos contienen
   * los datos a sustituir, no se sustituirán aquellos atributos que no hayan sido incluidos en el
   * tercer argumento.
   * La función regresa una promesa que contiene un booleano que indica si la operación se
   * completó satisfactoriamente. */

  changeThis(modelo: string, atributos: object, aInsertar: object): Promise<Object> {
    const model = this.modelos[modelo];
    let query = 'update ' + model['tabla'] + ' set ';
    if (model) {
      let i = 0;
      const llaves = Object.keys(aInsertar);
      for (const columna of llaves) {
        i++;
        if (!model[columna]) {
          return this.lanzarError('Alguna de las columnas a insertar no existe en el modelo solicitado.');
        }
        const comillas = (typeof aInsertar[columna] === 'string' ? '\'' : '');
        const coma = (i === llaves.length ? '' : ',');
        query += columna + ' = ' + comillas + aInsertar[columna] + comillas + coma + ' ';
      }
      for (const atributo of Object.keys(atributos)) {
        if (!model[atributo]) {
          return this.lanzarError('Alguno de los atributos de refinamiento no existe en el modelo.');
        }
      }
      const where = this.atributosBusqueda(atributos);
      query += where;
      return this.http.post(base + 'queries', {
        query,
        password: this.clave,
        funcion: 'changeThese'
      }).toPromise();
    } else {
      return this.lanzarError('No existe el modelo solicitado.');
    }
  }

  /* Esta función recibe como primer argumento un string detallando el nombre del modelo y como
   * segundo argumento un objeto. El objeto del segundo arugmento (de ser compatible con el
   * modelo señalado), se añadirá a la base de datos. De lo contrario se arrojará un error.
   * Esta función regresa una promesa con un booleano que indica si la operación se completó
   * satisfactoriamente. */

  addThis(modelo: string, aInsertar: object): Promise<object> {
    const model = this.modelos[modelo];
    let query = 'insert into ' + model['tabla'] + ' (';
    if (model) {
      if (!aInsertar) {
        return this.lanzarError('El objeto a ser añadido a la base datos está vacío.');
      }
      const llaves = Object.keys(aInsertar);
      console.log(llaves);
      for (const llave of llaves) {
        if (!model[llave]) {
          if (typeof model[llave] === 'string' && model[llave].length > 0) {
            return this.lanzarError('Alguno de los atributos del objeto a insertar no está presente en el modelo.');
          }
        }
        const esUltima = (llave === llaves[llaves.length - 1]);
        query += ' ' + llave;
        esUltima ? query += ') values (' : query += ',';
      }
      for (const llave of llaves) {
        const esUltima = (llave === llaves[llaves.length - 1]);
        const comillas = (typeof aInsertar[llave] === 'string' ? '\'' : '');
        query += ' ' + comillas + aInsertar[llave] + comillas;
        esUltima ? query += ')' : query += ',';
      }
      return this.http.post(base + 'queries', {
        query,
        password: this.clave,
        funcion: 'addThese'
      }).toPromise();
    } else {
      return this.lanzarError('El modelo solicitado no existe.');
    }
  }
}
