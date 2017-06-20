import {Injectable} from '@angular/core';
import {Bon} from "./bon";
import {v4} from "uuid";
import {forEach} from "@angular/router/src/utils/collection";
import {ReplaySubject} from "rxjs/ReplaySubject";

@Injectable()
export class BonService {
  private bonMap: Map<string, Bon> = null;
  private bonMapSubject: ReplaySubject<Map<string, Bon>> = new ReplaySubject<Map<string, Bon>>(1);
  private readonly storageId = "bonmap";

  constructor() {
    let storageBonMap = window.localStorage.getItem(this.storageId);
    if (storageBonMap) {
      this.initializeMap(JSON.parse(storageBonMap));
      this.bonMapSubject.next(this.bonMap);
    } else {
      this.bonMap = new Map<string, Bon>();
      this.save();
    }
  }

  private initializeMap(json: Object) {
    this.bonMap = new Map<string, Bon>();
    for (var uuid in json) {
      this.bonMap.set(uuid, json[uuid]);
    }
  }

  public list(): ReplaySubject<Map<string, Bon>> {
    return this.bonMapSubject;
  }

  public add(bon: Bon) {
    if (bon.uuid == null) {
      bon.uuid = v4();
    }

    this.bonMap.set(bon.uuid, bon);
    this.save();
  }

  public edit(updatedBon: Bon) {
    this.bonMap.set(updatedBon.uuid, new Bon(
      updatedBon.name,
      updatedBon.price,
      updatedBon.color,
      updatedBon.uuid,
      updatedBon.sortNr
    ));

    this.save();
  }

  public batchEdit(updatedBonList: Array<Bon>) {
    updatedBonList.forEach(updatedBon => {
      this.bonMap.set(updatedBon.uuid, new Bon(
        updatedBon.name,
        updatedBon.price,
        updatedBon.color,
        updatedBon.uuid,
        updatedBon.sortNr
      ));
    });

    this.save();
  }

  public remove(bon: Bon) {
    this.bonMap.delete(bon.uuid);
    this.save();
  }

  public save() {
    let bonObject = {};
    this.bonMap.forEach((bon, uuid) => bonObject[uuid] = bon);
    window.localStorage.setItem(this.storageId, JSON.stringify(bonObject));
    this.bonMapSubject.next(this.bonMap);
  }

  public import(json: string) {
    this.initializeMap(JSON.parse(json));
    this.save();
  }

  public export(): string {
    return window.localStorage.getItem(this.storageId);
  }

}
