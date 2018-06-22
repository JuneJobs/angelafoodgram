//# dc.js Getting Started and How-To Guide
'use strict';
/*

location,incorporationDate,year_cd,indust_cd,indust_nm
LEEDS,2012.9.11,2012,99999, Dormant Company
LONDON,2010.9.21,2010,59112, Video production activities
LONDON,2017.10.11,2017,62090, Other information technology service activities
ABERDEEN,2012.4.11,2012,70229, Management consultancy activities other than financial management
SILSOE,2014.7.30,2014,58190, Other publishing activities
ST PETER PORT,2012.11.30,2012,None Supplied,
STANSTED AIRPORT,2011.6.29,2011,70229, Management consultancy activities other than financial management
BROCKLEY,1992.5.12,1992,90010, Performing arts
WATERLOOVILLE,2016.7.12,2016,33200, Installation of industrial machinery and equipment

*/
/**
 * Step 1: Create the dc.js chart objects
 */
var zipCodeChart = dc.barChart('#zipCode-chart');
var locationChart = dc.barChart('#location-chart');
var industryTypeChart = dc.barChart('#industryType-chart');
var volumeChart = dc.barChart('#monthly-volume-chart');
var dataTable = dc.dataTable('.dc-data-table');

/**
 * Step 2: Loead data from csv file
 */
d3.csv("data/industry.csv").then(function (data) {
    /**
     * Step3 Create Dimension that we'll need
     */
    var ndx = crossfilter(data);
    var all = ndx.groupAll();

    var dateFormatSpecifier = '%m/%d/%Y';
    var dateFormat = d3.timeFormat(dateFormatSpecifier);
    var dateFormatParser = d3.timeParse(dateFormatSpecifier);
    var numberFormat = d3.format('.2f');

    data.forEach(function (d) {
        d.dd = dateFormatParser(d.incorporationDate);
        d.month = d3.timeMonth(d.dd); // pre-calculate month for better performance
    });

    // Determine a histogram of percent changes
    var zipCode = ndx.dimension(function (d) {
        return d.FinalZipCode;
    });
    var zipCodeGroup = zipCode.group();
    zipCodeGroup = getTops(zipCodeGroup);

    // Determine a histogram of percent changes
    var location = ndx.dimension(function (d) {
        return d.location;
    });
    var locationGroup = location.group();
    locationGroup = getTops(locationGroup);

    // Determine a histogram of percent changes
    var industryType = ndx.dimension(function (d) {
        return d.IndustryCode;
    });
    var industryTypeGroup = industryType.group();
    industryTypeGroup = getTops(industryTypeGroup);

    // Dimension by month
    var moveMonths = ndx.dimension(function (d) {
        return d.month;
    });
    // Group by total volume within move, and scale down result
    var volumeByMonthGroup = moveMonths.group().reduceSum(function (d) {
        return 1;
    });

    // Dimension by full date
    var dateDimension = ndx.dimension(function (d) {
        return d.dd;
    });

    /** 
     * Step 4 Create the Visualiztations
    */

    zipCodeChart
        .width(990)
        .height(180)
        .margins({ top: 10, right: 100, bottom: 30, left: 40 })
        .dimension(zipCode)
        .group(zipCodeGroup)
        .colors('#81D3EB')
        .elasticY(true) //.elasticY and .elasticX determine whether the chart should rescale each axis to fit the data.
        .x(d3.scaleOrdinal().domain(zipCodeGroup))
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Zip Code")
        .yAxisLabel("Zip Code Quantity")
        .barPadding(0.05)
        .outerPadding(0.05)
        .renderHorizontalGridLines(true)

    zipCodeChart.yAxis().ticks(5);
    
    locationChart
        .width(990)
        .height(180)
        .margins({ top: 10, right: 100, bottom: 30, left: 40 })
        .dimension(location)
        .group(locationGroup)
        .colors('#FFCC4E')
        .elasticY(true) //.elasticY and .elasticX determine whether the chart should rescale each axis to fit the data.
        .x(d3.scaleOrdinal().domain(locationGroup))
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Location Type")
        .yAxisLabel("Location Quantity")
        .barPadding(0.05)
        .outerPadding(0.05)
        .renderHorizontalGridLines(true)

    locationChart.yAxis().ticks(5);

    industryTypeChart
        .width(990)
        .height(180)
        .margins({ top: 10, right: 100, bottom: 30, left: 40 })
        .dimension(industryType)
        .group(industryTypeGroup)
        .colors('#F9C0C7')
        .elasticY(true) //.elasticY and .elasticX determine whether the chart should rescale each axis to fit the data.
        .x(d3.scaleOrdinal().domain(industryTypeGroup))
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Industry Type")
        .yAxisLabel("Industry Type Quantity")
        .barPadding(0.05)
        .outerPadding(0.05)
        .renderHorizontalGridLines(true)

    industryTypeChart.yAxis().ticks(5);





    // Determine a histogram of percent changes
    volumeChart.width(990) /* dc.barChart('#monthly-volume-chart', 'chartGroup'); */
        .height(100)    //height
        .margins({ top: 0, right: 50, bottom: 20, left: 40 })
        .dimension(moveMonths)  //dimension
        .group(volumeByMonthGroup)  //group
        .centerBar(true)
        .colors('#4EB8B9')
        .gap(1)
        .x(d3.scaleTime().domain([new Date(2000, 0, 1), new Date(2017, 11, 31)]))
        //.y(d3.scaleLinear().domain([0, 100]))
        .round(d3.timeMonth.round)
        .alwaysUseRounding(true)
        .renderHorizontalGridLines(true) //Grid liner
        .xUnits(d3.timeMonths);

    //table

    dataTable /* dc.dataTable('.dc-data-table', 'chartGroup') */
        .dimension(dateDimension)
        // Data table does not use crossfilter group but rather a closure
        // as a grouping function
        .group(function (d) {
            var format = d3.format('02d');
            return d.dd.getFullYear() + '/' + format((d.dd.getMonth() + 1));
        })
        // (_optional_) max number of records to be shown, `default = 25`
        .size(51707)
        // There are several ways to specify the columns; see the data-table documentation.
        // This code demonstrates generating the column header automatically based on the columns.
        .columns([
            'incorporationDate',
            'FinalZipCode',
            'location',
            'IndustryCode',
            'indust_nm'
        ])

        // (_optional_) sort using the given field, `default = function(d){return d;}`
        .sortBy(function (d) {
            return d.dd;
        })
        // (_optional_) sort order, `default = d3.ascending`
        .order(d3.ascending)
        // (_optional_) custom renderlet to post-process chart using [D3](http://d3js.org)
        .on('renderlet', function (table) {
            table.selectAll('.dc-table-group').classed('info', true);
        });


    volumeChart.yAxis().ticks(0);

    //#### Rendering
    /** 
     * Step 5 Rendering
    */

    //simply call `.renderAll()` to render all charts on the page
    dc.renderAll();

});
/**
 * Get Top x lanks from the source group.
 * @param {source_group} source_group 
 */
function getTops(source_group) {
    return {
        all: function () {
            return source_group.top(10);
        }
    };
}