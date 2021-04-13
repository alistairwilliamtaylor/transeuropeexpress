const ticketDisplay = document.querySelector('.ticket_display')

const alameinLine = ['Flinders Street', 'Richmond', 'East Richmond', 'Burnley', 'Hawthorn', 'Glenferrie']
const glenWaverlyLine = ['Flagstaff', 'Melbourne Central', 'Parliament', 'Richmond', 'Kooyong', 'Tooronga']
const sandringhamLine = ['Southern Cross', 'Richmond', 'South Yarra', 'Prahran', 'Windsor']

let origin = 'Flagstaff'
let originLine = null
let originStpNum = null
let originRichmondNum = null
let destination = 'Kooyong'
let destinationLine = null
let destStpNum = null
let destRichmondNum = null
let totalStops = null
let travelVisual = null
let firstTravelVisual = null
let secondTravelVisual = null


if (origin === 'Richmond') {
    destinationLine = getLineArray(destination)
    originLine = destinationLine
    calculateSingleLine()
}
else if (destination === 'Richmond') {
    originLine = getLineArray(origin)
    destinationLine = originLine
    calculateSingleLine()
}
else {
    originLine = getLineArray(origin)
    destinationLine = getLineArray(destination)
    if (originLine === destinationLine) {
        calculateSingleLine()
    }
    else {
        calculateMultipleLines()
    }   
}

//finds the line that a station is on, and returns the array of the stops on this line
function getLineArray(stationName) {
    if (alameinLine.indexOf(stationName) > -1) {
        return alameinLine
    } 
    else if (glenWaverlyLine.indexOf(stationName) > -1) {
        return glenWaverlyLine
    }
    else if (sandringhamLine.indexOf(stationName) > -1) {
        return sandringhamLine
    }
}

//this function takes three arguments (originStop, destinationStop, line) and returns an object with 2 key-value pairs - numberOfStops and stopsList
function calculateStretch(originStop, destinationStop, line) {
    if (destinationStop < originStop) {
        numberOfStops = originStop - destinationStop;
        stopsList = line.slice(destinationStop, originStop+1).reverse();
    }
    else {
        numberOfStops = destinationStop - originStop;
        stopsList = line.slice(originStop, destinationStop+1);
    }
    return {numberOfStops, stopsList}
}

// calculates the number of stops and creates visual display of direction of travel FOR ONE LINE 
function calculateSingleLine() {
    originStpNum = originLine.indexOf(origin);
    destStpNum = destinationLine.indexOf(destination);
    let {numberOfStops, stopsList} = calculateStretch(originStpNum, destStpNum, originLine);
    displaySingleLine(numberOfStops, stopsList)
}

// displays a single line trip
function displaySingleLine(numberOfStops, stopsList) {
    let htmlDisplay = ''
    stopsList.forEach((stop, index) => {
        if (index === stopsList.length - 1) {
            htmlDisplay = htmlDisplay + `<h3>${stop}</h3>`
        }
        else {
            htmlDisplay = htmlDisplay + `<h3>${stop}</h3><h3>||</h3>`
        }
    })

    ticketDisplay.innerHTML = 
    `
    <h2> Origin: ${origin} </h2>
    <h2> Destination: ${destination} </h2>

    <h2> Total Stops: ${numberOfStops}</h2>

    <h2> Itinerary: <h2>
    ${htmlDisplay}
    `
}

//FOR TWO LINES calculates the total number of stops and creates two visual displays of direction of travel
function calculateMultipleLines() {
    originStpNum = originLine.indexOf(origin);
    originRichmondNum = originLine.indexOf('Richmond');
    let firstLineResult = calculateStretch(originStpNum, originRichmondNum, originLine);
    firstTravelVisual = firstLineResult.travelVisual;
    let firstLineStops = firstLineResult.numberOfStops;

    destRichmondNum = destinationLine.indexOf('Richmond');
    destStpNum = destinationLine.indexOf(destination);
    let secondLineResult = calculateStretch(destRichmondNum, destStpNum, destinationLine);
    secondTravelVisual = secondLineResult.travelVisual;
    let secondLineStops = secondLineResult.numberOfStops;

    totalStops = firstLineStops + secondLineStops;
    
    displayMultipleLines()
}

// displays a two line trip
function displayMultipleLines() {
    ticketDisplay.innerHTML = 
    `
    <h2> Origin: ${origin} </h2>
    <h2> Destination: ${destination} </h2>

    <h2> Total Stops: ${numberOfStops}</h2> 

    <h2> Itinerary <h2>
    ${htmlDisplay}
    `

    // totalStops
    // ${firstTravelVisual}
    // ${secondTravelVisual}
}
