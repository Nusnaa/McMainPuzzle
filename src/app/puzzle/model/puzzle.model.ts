export interface Tile {
  position: Position;
  backgroundPosition: string;
  isEmpty: boolean;
}

export interface Position {
  col: number;
  row: number;
}

export interface ScreenProperties {
  PuzzleStyle: { [key: string]: string };
  TileStyle: { [key: string]: string };
}
