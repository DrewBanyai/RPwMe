//  Pulled from https://stackoverflow.com/questions/4270485/drawing-lines-on-html-page
//  StackOverflow user madox2

const DrawnLine = {
    create: (options) => {
        let createLineElement = (x, y, length, angle, color) => {
            var line = document.createElement("div");
            var styles = 'border: 1px solid ' + color + '; '
                        + 'width: ' + length + 'px; '
                        + 'height: 0px; '
                        + '-moz-transform: rotate(' + angle + 'rad); '
                        + '-webkit-transform: rotate(' + angle + 'rad); '
                        + '-o-transform: rotate(' + angle + 'rad); '  
                        + '-ms-transform: rotate(' + angle + 'rad); '  
                        + 'position: absolute; '
                        + 'top: ' + y + 'px; '
                        + 'left: ' + x + 'px; ';
            line.setAttribute('style', styles);  
            return line;
        };

        let createLine = (x1, y1, x2, y2, color) => {
            var a = x1 - x2;
            var b = y1 - y2;
            var c = Math.sqrt(a * a + b * b);
    
            var sx = (x1 + x2) / 2;
            var sy = (y1 + y2) / 2;
    
            var x = sx - c / 2;
            var y = sy;
    
            var alpha = Math.PI - Math.atan2(-b, a);
        
            return createLineElement(x, y, c, alpha, color);
        };

        return createLine(options.x1, options.y1, options.x2, options.y2, options.color);
    },
}

//  Module Exports
module.exports = { DrawnLine }