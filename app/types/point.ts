export class Point2D {
  constructor(public x: number, public y: number, public convexType?: 'Hull' | 'Inner' | 'Colinear') {}
}

export class Point3D {
  constructor(public x: number, public y: number, public z: number, public convexType?: 'Hull' | 'Inner') {}
}
