import { Injectable } from '@angular/core';
import {Bon} from "./bon";
import {v4} from "uuid";
import {forEach} from "@angular/router/src/utils/collection";
import {ReplaySubject} from "rxjs/ReplaySubject";

@Injectable()
export class BonService {
  private bonList: Array<Bon> = null;
  private bonListSubject: ReplaySubject<Array<Bon>> = new ReplaySubject<Array<Bon>>(1);
  private readonly storageId = "bonlist";

  constructor() {
    if(window.localStorage.getItem(this.storageId)) {
      this.bonList = JSON.parse(window.localStorage.getItem(this.storageId));
      this.bonListSubject.next(this.bonList);
    } else {
      this.bonList = [];
      this.save();
    }
  }

  public list(): ReplaySubject<Array<Bon>> {
    return this.bonListSubject;
  }

  public add(bon: Bon) {
    if(bon.uuid == null) {
      bon.uuid = v4();
    }

    this.bonList.push(bon);
    this.save();
  }

  public remove(bon: Bon) {
    this.bonList = this.bonList.filter(filterBon => {
      return bon != filterBon;
    });
    this.save();
  }

  public save() {
    window.localStorage.setItem(this.storageId, JSON.stringify(this.bonList));
    this.bonListSubject.next(this.bonList);
  }

}
