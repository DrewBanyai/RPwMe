//  Ray-casting algorithm based on https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html
//  Found at https://github.com/substack/point-in-polygon

const PointInPolygon = (point, shapeVerts) => {
  let inside = false
  for (let i = 0, j = shapeVerts.length - 1; i < shapeVerts.length; j = i++) {
    const xi = shapeVerts[i].x; const yi = shapeVerts[i].y
    const xj = shapeVerts[j].x; const yj = shapeVerts[j].y
    const intersect = ((yi > point.y) !== (yj > point.y)) && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi)
    if (intersect) inside = !inside
  }
  return inside
}

//  Module Exports
module.exports = { PointInPolygon }
