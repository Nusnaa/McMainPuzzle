import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Position, Tile } from './model/puzzle.model';

@Component({
  selector: 'mcmain-puzzle',
  imports: [CommonModule],
  templateUrl: './puzzle.html',
  styleUrl: './puzzle.scss',
})
export class Puzzle implements OnInit {
  gridSize = 4;
  tileSize = 100; // in pixels
  tiles: Tile[] = [];

  ngOnInit() {
    this.updateTiles();
  }

  updateTiles() {
    this.tiles = [];
    const totalTiles = this.gridSize * this.gridSize;
    for (let index = 0; index < totalTiles; index++) {
      const row = Math.floor(index / this.gridSize);
      const col = index % this.gridSize;
      this.tiles.push({
        position: { col, row },
        bgPosition: `-${col * this.tileSize}px -${row * this.tileSize}px`,
        isEmpty: index === totalTiles - 1,
      });
    }
  }

  swapTiles(currentIndex: number, newIndex: number) {
    [this.tiles[currentIndex], this.tiles[newIndex]] = [
      this.tiles[newIndex],
      this.tiles[currentIndex],
    ];

    const tempPosition = this.tiles[currentIndex].position;
    this.tiles[currentIndex].position = this.tiles[newIndex].position;
    this.tiles[newIndex].position = tempPosition;
  }

  shuffleTiles() {
    for (let index = 0; index < this.tiles.length; index++) {
      const randomIndex = Math.floor(Math.random() * this.tiles.length);
      this.swapTiles(index, randomIndex);
    }
  }

  onTileClick(clickedTile: Tile) {
    const tileIndex = this.tiles.indexOf(clickedTile);
    const emptyTileIndex = this.tiles.findIndex((t) => t.isEmpty);
    if (tileIndex !== emptyTileIndex) {
      if (this.canTileMove(this.tiles[emptyTileIndex].position, clickedTile.position)) {
        this.swapTiles(tileIndex, emptyTileIndex);
      }
    }
  }

  canTileMove(emptyTilePosition: Position, clickedTilePosition: Position): boolean {
    return (
      Math.abs(emptyTilePosition.row - clickedTilePosition.row) +
        Math.abs(emptyTilePosition.col - clickedTilePosition.col) ===
      1
    );
  }
}
