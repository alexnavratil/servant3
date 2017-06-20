import { Injectable } from '@angular/core';
import {Bon} from "./bon";
import {BonService} from "./bon.service";

@Injectable()
export class SalesService {
  private sales: Object = {};
  private readonly storageId = "sales";
  private bonMap: Map<string, Bon> = null;

  constructor(private bonService: BonService) {
    if(window.localStorage.getItem(this.storageId)) {
      this.sales = JSON.parse(window.localStorage.getItem(this.storageId));
    } else {
      this.sales = {};
      this.save();
    }

    this.bonService.list().subscribe(bonMap => this.bonMap = bonMap);
  }

  public add(billMap: Map<string, number>) {
    billMap.forEach((count, uuid) => {
      if(this.sales.hasOwnProperty(uuid)){
        this.sales[uuid] = this.sales[uuid] + count;
      } else {
        this.sales[uuid] = count;
      }
    });
    this.save();
  }

  public revert(billMap: Map<string, number>) {
    billMap.forEach((count, uuid) => {
      if(this.sales.hasOwnProperty(uuid)){
        let val = Math.max(this.sales[uuid] - count, 0);
        if(val == 0) {
          delete this.sales[uuid];
        } else {
          this.sales[uuid] = val;
        }
      }
    });
    this.save();
  }

  public removeBon(bon: Bon) {
    if(this.sales.hasOwnProperty(bon.uuid)) {
      delete this.sales[bon.uuid];
      this.save();
    }
  }

  public reset() {
    this.sales = {};
    this.save();
  }

  public salesResult(): Array<[Bon, number, number]> {
    let keys = Object.keys(this.sales);
    let salesResult: Array<[Bon, number, number]> = []; //bon, count, total price

    keys.forEach(bonUUID => {
      let bonNr = this.sales[bonUUID];
      let bon = this.bonMap.get(bonUUID);
      salesResult.push([
        bon,
        bonNr,
        bonNr*bon.price
      ]);
    });

    return salesResult;
  }

  public save() {
    window.localStorage.setItem(this.storageId, JSON.stringify(this.sales));
  }

}
