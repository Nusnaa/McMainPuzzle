export interface Tile {
  position: Position;
  bgPosition: string;
  isEmpty: boolean;
}

export interface Position {
  col: number;
  row: number;
}
