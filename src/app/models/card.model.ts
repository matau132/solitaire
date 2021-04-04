export class Card {
  image: string;
  value: number;
  suit: string;
  code: string;
  fold: boolean;

  constructor(
    img: string,
    value: number,
    suit: string,
    code: string,
    fold: boolean
  ) {
    this.image = img;
    this.value = value;
    this.suit = suit;
    this.code = code;
    this.fold = fold;
  }
}
