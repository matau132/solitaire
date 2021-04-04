import { GetdataService } from './../getdata.service';
import { Card } from './../models/card.model';
import { Component, OnInit } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.css'],
})
export class MainBoardComponent implements OnInit {
  // check: any;
  bg_fold: string = '../../assets/img/back-card.png';
  deck: Card[] = [];
  deck_unfold: Card[] = [];
  finish_pile1: Card[] = [];
  finish_pile2: Card[] = [];
  finish_pile3: Card[] = [];
  finish_pile4: Card[] = [];
  pile1: Card[] = [];
  pile2: Card[] = [];
  pile3: Card[] = [];
  pile4: Card[] = [];
  pile5: Card[] = [];
  pile6: Card[] = [];
  pile7: Card[] = [];
  pile_group: any[] = [
    this.pile1,
    this.pile2,
    this.pile3,
    this.pile4,
    this.pile5,
    this.pile6,
    this.pile7,
  ];
  constructor(private svc: GetdataService) { }

  async ngOnInit() {
    let temp_deck = [];
    await this.svc.getData().then((data: any) => {
      temp_deck = data['cards'];
    });
    temp_deck.forEach((card) => {
      let value;
      switch (card.code.charAt(0)) {
        case 'A':
          value = 1;
          break;
        case '0':
          value = 10;
          break;
        case 'J':
          value = 11;
          break;
        case 'Q':
          value = 12;
          break;
        case 'K':
          value = 13;
          break;
        default:
          value = parseInt(card.code.charAt(0));
      }
      this.deck.push(new Card(card.image, value, card.suit, card.code, true));
    });
    let count = 1;
    for (let pile of this.pile_group) {
      for (let i = 0; i < count; i++) {
        if (i === count - 1) {
          this.deck[i].fold = false;
        }
        pile.push(this.deck[i]);
      }
      this.deck.splice(0, count);
      count++;
    }
  }
  deckClick(index) {
    this.deck[index].fold = false;
    if (this.deck_unfold.length > 0) {
      this.deck_unfold[0].fold = true;
      this.deck.unshift(this.deck_unfold[0]);
      this.deck_unfold.splice(0, 1);
    }
    this.deck_unfold.push(this.deck[index]);
    this.deck.splice(index, 1);
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.container.data.length
      );
    }
    event.container.data[event.container.data.length-1].fold = false;
  }
  deckSortPredicate(
    index: number,
    drag: CdkDrag<any>,
    drop: CdkDropList<any>
  ): boolean {
    return false;
  }
  noEnter(): boolean {
    return false;
  }
  pileEnterPredicate(drag: CdkDrag, drop: CdkDropList) {
    if (drag!==undefined && drop!==undefined) {
      let last_card = drop.data[drop.data.length - 1];
      let drag_card = drag.data;
      if (last_card.suit == 'HEARTS' || last_card.suit == 'DIAMONDS') {
        if ((drag_card.suit == 'CLUBS' || drag_card.suit == 'SPADES')&&(last_card.value-1==drag_card.value)&&!last_card.fold) {
          return true;
        }
        return false;
      }
      else {
        if ((drag_card.suit == 'HEARTS' || drag_card.suit == 'DIAMONDS')&&(last_card.value-1==drag_card.value)&&!last_card.fold) {
          return true;
        }
        return false;
      }
    }
    return false;
  }
}
