import { Injectable } from '@angular/core';

@Injectable()
export class PartsService {

partSelected = {};

  constructor() { }

public getPart(){
  return this.partSelected;
}

  public setPart(part) {
    this.partSelected = part;
  }

}
