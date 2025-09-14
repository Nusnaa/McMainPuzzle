import { Puzzle } from './puzzle';
import { Tile } from './model/puzzle.model';

describe('PuzzleComponent', () => {
  let component: Puzzle;

  beforeEach(() => {
    component = new Puzzle();
    spyOn(component, 'gridSize').and.returnValue(3);
    spyOn(component, 'tileSize').and.returnValue(100);
    spyOn(component, 'updateScreenProperties');
  });

  describe('updateTiles', () => {
    it('should create correct number of tiles', () => {
      component.updateTiles();
      expect(component.tiles.length).toBe(9);
    });

    it('should assign correct position and backgroundPosition', () => {
      component.updateTiles();
      const tile = component.tiles[4];
      expect(tile.position).toEqual({ row: 1, col: 1 });
      expect(tile.backgroundPosition).toBe('-100px -100px');
    });

    it('should mark last tile as empty', () => {
      component.updateTiles();
      const lastTile = component.tiles[8];
      expect(lastTile.isEmpty).toBeTrue();
    });

    it('should call updateScreenProperties', () => {
      component.updateTiles();
      expect(component.updateScreenProperties).toHaveBeenCalled();
    });
  });

  describe('updateScreenProperties', () => {
    beforeEach(() => {
      component = new Puzzle();
      spyOn(component, 'gridSize').and.returnValue(3);
      spyOn(component, 'tileSize').and.returnValue(100);
    });

    it('should set correct PuzzleStyle and TileStyle', () => {
      component.updateScreenProperties();

      expect(component.screenProperties).toBeDefined();

      expect(component.screenProperties.PuzzleStyle).toEqual({
        'grid-template-columns': 'repeat(3, 100px)',
        'grid-template-rows': 'repeat(3, 100px)',
      });

      expect(component.screenProperties.TileStyle).toEqual({
        'background-size': '300px 300px',
      });
    });
  });

  describe('getTileStyle', () => {
    it('should merge TileStyle with tile backgroundPosition', () => {
      component.screenProperties = {
        PuzzleStyle: {},
        TileStyle: {
          'background-size': '300px 300px',
        },
      };

      const tile: Tile = {
        position: { row: 1, col: 1 },
        backgroundPosition: '-100px -100px',
        isEmpty: false,
      };

      const style = component.getTileStyle(tile);
      expect(style).toEqual({
        'background-size': '300px 300px',
        'background-position': '-100px -100px',
      });
    });
  });

  describe('swapTiles', () => {
    beforeEach(() => {
      component.tiles = [
        { position: { row: 0, col: 0 }, backgroundPosition: '', isEmpty: false },
        { position: { row: 0, col: 1 }, backgroundPosition: '', isEmpty: false },
      ];
    });

    it('should swap tile objects and their positions', () => {
      component.tiles = [
        {
          position: { row: 0, col: 0 },
          backgroundPosition: 'A',
          isEmpty: false,
        },
        {
          position: { row: 0, col: 1 },
          backgroundPosition: 'B',
          isEmpty: false,
        },
      ];

      const tile0Before = { ...component.tiles[0] };
      const tile1Before = { ...component.tiles[1] };

      component.swapTiles(0, 1);

      // Check that the tile objects were swapped
      expect(component.tiles[0].backgroundPosition).toBe('B');
      expect(component.tiles[1].backgroundPosition).toBe('A');

      // Check that the positions were swapped back
      expect(component.tiles[0].position).toEqual(tile0Before.position);
      expect(component.tiles[1].position).toEqual(tile1Before.position);
    });
  });

  describe('shuffleTiles', () => {
    beforeEach(() => {
      component.tiles = Array.from({ length: 9 }, (_, i) => ({
        position: { row: Math.floor(i / 3), col: i % 3 },
        backgroundPosition: '',
        isEmpty: i === 8,
      }));
      spyOn(component, 'swapTiles');
    });

    it('should call swapTiles for each tile', () => {
      component.shuffleTiles();
      expect(component.swapTiles).toHaveBeenCalledTimes(9);
    });
  });

  describe('onTileClick', () => {
    beforeEach(() => {
      component.tiles = [
        { position: { row: 0, col: 0 }, backgroundPosition: '', isEmpty: false },
        { position: { row: 0, col: 1 }, backgroundPosition: '', isEmpty: true },
      ];
      spyOn(component, 'canTileMove').and.returnValue(true);
      spyOn(component, 'swapTiles');
    });

    it('should swap tiles if move is valid', () => {
      component.onTileClick(component.tiles[0]);
      expect(component.canTileMove).toHaveBeenCalled();
      expect(component.swapTiles).toHaveBeenCalledWith(0, 1);
    });

    it('should not swap if clicked tile is empty', () => {
      component.onTileClick(component.tiles[1]);
      expect(component.swapTiles).not.toHaveBeenCalled();
    });
  });

  describe('canTileMove', () => {
    it('should return true for adjacent tiles', () => {
      const empty = { row: 0, col: 0 };
      const clicked = { row: 0, col: 1 };
      expect(component.canTileMove(empty, clicked)).toBeTrue();
    });

    it('should return false for non-adjacent tiles', () => {
      const empty = { row: 0, col: 0 };
      const clicked = { row: 1, col: 1 };
      expect(component.canTileMove(empty, clicked)).toBeFalse();
    });
  });
});
