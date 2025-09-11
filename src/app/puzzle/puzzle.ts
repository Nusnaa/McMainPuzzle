import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Position, ScreenProperties, Tile } from './model/puzzle.model';
import { Settings } from './settings/settings';
import { ButtonDirective } from '../shared/directives/button';

@Component({
  selector: 'mcmain-puzzle',
  imports: [CommonModule, Settings, ButtonDirective],
  templateUrl: './puzzle.html',
  styleUrl: './puzzle.scss',
})
export class Puzzle implements OnInit {
  gridSize = signal(4);
  tileSize = signal(85);
  tiles: Tile[] = [];
  screenProperties!: ScreenProperties;

  ngOnInit() {
    this.updateTiles();
  }

  updateTiles() {
    this.tiles = [];
    const totalTiles = this.gridSize() * this.gridSize();
    for (let index = 0; index < totalTiles; index++) {
      const row = Math.floor(index / this.gridSize());
      const col = index % this.gridSize();
      this.tiles.push({
        position: { col, row },
        backgroundPosition: `-${col * this.tileSize()}px -${row * this.tileSize()}px`,
        isEmpty: index === totalTiles - 1,
      });
    }
    this.updateScreenProperties();
  }

  updateScreenProperties() {
    this.screenProperties = {
      PuzzleStyle: {
        'grid-template-columns': 'repeat(' + this.gridSize() + ', ' + this.tileSize() + 'px)',
        'grid-template-rows': 'repeat(' + this.gridSize() + ', ' + this.tileSize() + 'px)',
      },
      TileStyle: {
        'background-size':
          this.gridSize() * this.tileSize() + 'px ' + this.gridSize() * this.tileSize() + 'px',
      },
    };
  }

  getTileStyle(tile: Tile): { [key: string]: string } {
    return {
      ...this.screenProperties.TileStyle,
      'background-position': tile.backgroundPosition,
    };
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
