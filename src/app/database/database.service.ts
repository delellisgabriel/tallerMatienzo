import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(private http: HttpClient) { }

  /* Esta función recibe como primer argumento un string detallando el nombre del modelo
   * y como segundo argumento un objeto que indica atributos secundarios de búsqueda.
    * Por ejemplo, getMe('vehiculo', { marca: 'Chevrolet', color: 'azul' }).
    * La función regresa una promesa que recibirá un objeto como respuesta del servidor,
    * dicho objeto contendrá un array, y cada elemento del array será una instancia del modelo
    * solicitado (si el modelo contiene otros modelos como atributos, se poblarán de ser posible,
    * pero estos no podrán ser usados como atributos de búsqueda ). Tal vez dicho objecto venga
     * con funciones auxiliares para refinamiento de datos, como métodos para hacer order, limit, etc */

  getMe() {

  }

  /* Esta función recibe como primer argumento un string detallando el nombre del modelo
   * y como segundo argumento un número que indica el valor de la PK correspondiente a la
    * fila que se desea obtener. Si el modelo no tiene PKs arrojará un error.
    * La función regresa una promesa que recibirá un objeto como respuesta del servidor,
    * dicho objeto contendrá una única instancia del modelo solicitado (si el modelo contiene
    * otros modelos como atributos, se poblarán de ser posible, pero estos no podrán ser usados
    * como atributos de búsqueda). */

  getMeOne() {

  }

  /* Esta función recibe como primer argumento un string detallando el nombre del modelo
   * y como segundo argumento un objeto. Cada objeto dentro tiene atributos que serán usados
   * como factores de búsqueda de las filas a ser eliminadas.
   * Un tercer argumento es un booleano que indica si la fila debe ser borrada incluso si
   * es referenciada por otra fila.
   * La función regresa una promesa que contiene un array con los objetos eliminados exitosa-
   * mente de la base de datos. */

  killThese() {

  }

  /* Esta función recibe como primer argumento un string detallando el nombre del modelo y como
   * segundo argumento un objeto, cuyos atributos serán usados como factores de búsqueda
   * de las filas a cambiar. El tercer argumento incluye un otro objeto cuyos atributos contienen
   * los datos a sustituir, no se sustituirán aquellos atributos que no hayan sido incluidos en el
   * tercer argumento.
   * La función regresa una promesa que contiene un array con los objetos eliminados exitosamente
   * de la base de datos.*/

  changeThese() {

  }

  /* Esta función recibe como primer argumento un string detallando el nombre del modelo y como
   * segundo argumento un array de objetos. Todos los objetos del array (de ser compatibles con el
   * modelo), se añadirán a la base de datos. De lo contrario arrojará un error.
   * Esta función regresa una promesa con un array con los objetos que pudieron ser añadidos a la
   * base de datos.*/

  addThese() {

  }

  getPrueba(): Promise<Object> {
    return this.http.post(base + 'queries', {
      query: 'SELECT * FROM ul79atmbxbqwg0en.alergias;',
      password: this.clave
    }).toPromise();
  }
}
