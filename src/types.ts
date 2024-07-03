export type shape2d = 'C' | 'S' | 'T'

export type shape3d = 'CC' | 'CS' | 'CT' | 'SS' | 'ST' | 'TT'

export type allShapes = shape2d | shape3d

export type shapePosition = 'L' | 'M' | 'R'

export enum shapeState {
  disabled = 0,
  selected = 1,
  error = 2
}

export type shape2dSelections = {
  shape: shape2d | null
  state: shapeState | null
}

export type shape3dSelections = {
  shape: shape3d | null
  state: shapeState | null
}
