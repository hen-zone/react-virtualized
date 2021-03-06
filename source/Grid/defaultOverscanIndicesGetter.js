// @flow

export const SCROLL_DIRECTION_BACKWARD = -1;
export const SCROLL_DIRECTION_FORWARD = 1;

export const SCROLL_DIRECTION_HORIZONTAL = "horizontal";
export const SCROLL_DIRECTION_VERTICAL = "vertical";

/**
 * Calculates the number of cells to overscan before and after a specified range.
 * This function ensures that overscanning doesn't exceed the available cells.
 *
 * @param direction One of SCROLL_DIRECTION_HORIZONTAL or SCROLL_DIRECTION_VERTICAL
 * @param cellCount Number of rows or columns in the current axis
 * @param scrollDirection One of SCROLL_DIRECTION_BACKWARD or SCROLL_DIRECTION_FORWARD
 * @param overscanCellsCount Maximum number of cells to over-render in either direction
 * @param startIndex Begin of range of visible cells
 * @param stopIndex End of range of visible cells
 */

type Params = {
  cellCount: number,
  scrollDirection: -1 | 1,
  overscanCellsCount: number,
  startIndex: number,
  stopIndex: number
};

type Returns = {
  overscanStartIndex: number,
  overscanStopIndex: number
};

export default function defaultOverscanIndicesGetter({
  cellCount,
  overscanCellsCount,
  scrollDirection,
  startIndex,
  stopIndex
}: Params): Returns {
  if (scrollDirection === SCROLL_DIRECTION_FORWARD) {
    return {
      overscanStartIndex: Math.max(0, startIndex),
      overscanStopIndex: Math.min(cellCount - 1, stopIndex + overscanCellsCount)
    };
  } else {
    return {
      overscanStartIndex: Math.max(0, startIndex - overscanCellsCount),
      overscanStopIndex: Math.min(cellCount - 1, stopIndex)
    };
  }
}
