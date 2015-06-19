define(['libs/d3', 'constants'], function(d3, constants) {
    var scale = d3.scale.linear()
        .domain([0, constants.streetLength])
        .range([0, constants.streetWidth]);

    return {
        streetContainer: d3.select('#streetMap svg'),
        allPhotosContainer: d3.select('#allPhotos'),
        hourPhotosContainer: d3.select('#hourPhotos'),
        scale: scale,        
    }
});