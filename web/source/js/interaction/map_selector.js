define(['lib/d3', 'interaction/updater'], function(d3, updater) {
    var mapContainer = d3.select('.m-map');
    var startPoint = undefined;

    var mapSelection = d3.select('.m-map__selection');
    var topLayer = d3.select('.m-map__photo-selector');

    function hideSelection() {
        mapSelection.style('display', 'none');
        updater.updateMapFilter(undefined);
    }

    function showSelection() {
        mapSelection.style('display', 'block');
    }

    function updateSelection(saveFilter) {
        var endPoint = d3.mouse(mapContainer.node());

        var x1 = Math.min(startPoint[0], endPoint[0]),
            y1 = Math.min(startPoint[1], endPoint[1]),
            x2 = Math.max(startPoint[0], endPoint[0]),
            y2 = Math.max(startPoint[1], endPoint[1]);

        if ((x1 == x2 || y1 == y2) && saveFilter !== undefined ) {
            hideSelection();
        }
        else {
            showSelection();
        }

        mapSelection
            .style('left', x1 + 'px')
            .style('top', y1 + 'px')
            .style('width', (x2 - x1) + 'px')
            .style('height', (y2 - y1) + 'px');

        if (saveFilter !== undefined)
            updater.updateMapFilter(x1, y1, x2 - x1, y2 - y1);
    }

    function activate() {
        topLayer.on('mousedown', function() {
            d3.event.preventDefault();
            startPoint = d3.mouse(mapContainer.node());
        });

        topLayer.on('mouseup', function() {
            d3.event.preventDefault();

            if (startPoint !== undefined) {
                updateSelection(true);
                startPoint = undefined;
            }
        });

        topLayer.on('mouseleave', function() {
            d3.event.preventDefault();
            if (startPoint !== undefined) {
                startPoint = undefined;
                hideSelection();
            }
        });

        topLayer.on('mousemove', function() {
            d3.event.preventDefault();
            if (startPoint !== undefined)
                updateSelection();
        });
    }


    return {
        activate: activate
    }
});
