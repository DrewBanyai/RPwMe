//  Ray-casting algorithm based on https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html
//  Found at https://github.com/substack/point-in-polygon

const PointInPolygon = (point, shapeVerts) => {
    var inside = false;
    var start = 0;
    var end = shapeVerts.length;
    for (var i = 0, j = shapeVerts.length - 1; i < shapeVerts.length; j = i++) {
        var xi = shapeVerts[i+start].x, yi = shapeVerts[i+start].y;
        var xj = shapeVerts[j+start].x, yj = shapeVerts[j+start].y;
        var intersect = ((yi > point.y) !== (yj > point.y)) && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
};

//  Module Exports
module.exports = { PointInPolygon }