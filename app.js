const ticketDisplay = document.querySelector('.ticket_display')
const originInput = document.querySelector('#origin')
const destinationInput = document.querySelector('#destination')
const stationList = document.querySelector('#stations')
const form = document.querySelector('form')

const blueLine = ['Malmo', 'Copenhagen', 'Berlin', 'Erfurt', 'Munich', 'Zurich', 'Milan', 'Florence', 'Rome']
const redLine = ['Barcelona', 'Toulouse', 'Paris', 'Strasbourg', 'Munich', 'Prague', 'Krakow', 'Warsaw', 'Kaliningrad']
const yellowLine = ['Amsterdam', 'Antwerp', 'Brussels', 'Frankfurt', 'Munich', 'Vienna', 'Budapest', 'Belgrade', 'Bucharest']

const allStations = [...blueLine, ...redLine, ...yellowLine]
allStations
        .map(station => `<option value=${station}>`)
        .forEach(htmlLine => stationList.innerHTML = stationList.innerHTML + htmlLine);

form.addEventListener('submit', event => {
    event.preventDefault()
    let origin = originInput.value
    let destination = destinationInput.value
    let { originLineStops, originLineName, destinationLineStops, destinationLineName } = determineLines(origin, destination)
    if (isSameLine(originLineName, destinationLineName)) {
        let { numberOfStops, stopsList } = calculateSingleLine(originLineStops, origin, destination)
        displaySingleLine(origin, destination, numberOfStops, stopsList, originLineName)
    } else {
        let { totalNumberofStops, originLineStopList, destinationLineStopList } = calculateMultipleLines(originLineStops, destinationLineStops, origin, destination)
        console.log(`IMPORTANT ${originLineStopList}`)
        displayMultipleLines(origin, destination, totalNumberofStops, originLineStopList, destinationLineStopList, originLineName, destinationLineName)
    }

    //it's working up to here

})

const isSameLine = (originLine, destinationLine) => 
    originLine === destinationLine

//deals with Munich being on all lines to determine lines travelled  - SUCCESS
function determineLines(origin, destination) {

    if (origin === 'Munich') {
        let [destinationLineStops, destinationLineName] = getLineArray(destination)
        let [originLineStops, originLineName] = [destinationLineStops, destinationLineName]
        return { originLineStops, originLineName, destinationLineStops, destinationLineName }
    }
    else if (destination === 'Munich') {
        let [originLineStops, originLineName] = getLineArray(origin)
        let [destinationLineStops, destinationLineName] = [originLineStops, originLineName]
        return { originLineStops, originLineName, destinationLineStops, destinationLineName }
    }
    else {
        let [originLineStops, originLineName] = getLineArray(origin)
        let [destinationLineStops, destinationLineName] = getLineArray(destination)
        return { originLineStops, originLineName, destinationLineStops, destinationLineName }
    }
    
}

//finds the line that a station is on - SUCCESS
function getLineArray(stationName) {
    if (blueLine.includes(stationName)) {
        console.log(blueLine)
        console.log('blue')
        return [blueLine, 'blue']
    } 
    else if (redLine.includes(stationName)) {
        console.log(redLine)
        console.log('red')
        return [redLine, 'red']
    }
    else if (yellowLine.includes(stationName)) {
        console.log(yellowLine)
        console.log('yellow')
        return [yellowLine, 'yellow']
    }
}

//finds station numbers on line for singleLine - SUCCESS
function calculateSingleLine(line, origin, destination) {
    let originStpNum = line.indexOf(origin);
    let destStpNum = line.indexOf(destination);
    let [numberOfStops, stopsList] = calculateStretch(originStpNum, destStpNum, line);
    return { numberOfStops, stopsList }
}

//calculates the stations travelled through on a line given station number - SUCCESS
function calculateStretch(originStop, destinationStop, line) {
    if (destinationStop < originStop) {
        numberOfStops = originStop - destinationStop;
        stopsList = line.slice(destinationStop, originStop+1).reverse();
    }
    else {
        numberOfStops = destinationStop - originStop;
        stopsList = line.slice(originStop, destinationStop+1);
    }
    return [numberOfStops, stopsList]
}

// displays a single line trip (COULD REFACTOR OUT ORIGIN AND DESTINATION AND GET FROM STOPSLIST) - SUCCESS
function displaySingleLine(origin, destination, numberOfStops, stopsList, lineName) {
    let htmlDisplay = ''
    stopsList.forEach((stop, index) => {
        if (index === stopsList.length - 1) {
            htmlDisplay = htmlDisplay + `<h3>${stop}</h3>`
        }
        else {
            htmlDisplay = htmlDisplay + `<h3>${stop}</h3><h3 class="${lineName}">||</h3>`
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

//finds station numbers on line for multiple lines
function calculateMultipleLines(originLine, destinationLine, origin, destination) {
    let originStpNum = originLine.indexOf(origin);
    let originMunichNum = originLine.indexOf('Munich');
    let [originLineNumberofStops, originLineStopList] = calculateStretch(originStpNum, originMunichNum, originLine);

    let destMunichNum = destinationLine.indexOf('Munich');
    let destStpNum = destinationLine.indexOf(destination);
    let [destinationLineNumberofStops, destinationLineStopList] = calculateStretch(destMunichNum, destStpNum, destinationLine);

    let totalNumberofStops = originLineNumberofStops + destinationLineNumberofStops;
    
    return { totalNumberofStops, originLineStopList, destinationLineStopList }
}

// displays a two line trip
function displayMultipleLines(origin, destination, totalNumberofStops, originLineStopList, destinationLineStopList, originLineName, destinationLineName) {
    
    let originLineHTMLDisplay = ''
    originLineStopList.forEach((stop, index) => {
        if (index === originLineStopList.length - 1) {
            originLineHTMLDisplay = originLineHTMLDisplay + `<h3>${stop}</h3>`
        }
        else {
            originLineHTMLDisplay = originLineHTMLDisplay + `<h3>${stop}</h3><h3 class="${originLineName}">||</h3>`
        }
    })
   
    let destinationLineHTMLDisplay = ''
    destinationLineStopList.forEach((stop, index) => {
        if (index === destinationLineStopList.length - 1) {
            destinationLineHTMLDisplay = destinationLineHTMLDisplay + `<h3>${stop}</h3>`
        }
        else {
            destinationLineHTMLDisplay = destinationLineHTMLDisplay + `<h3>${stop}</h3><h3 class="${destinationLineName}">||</h3>`
        }
    })

    
    
    ticketDisplay.innerHTML = 
    `
    <h2> Origin: ${origin} </h2>
    <h2> Destination: ${destination} </h2>

    <h2> Total Stops: ${totalNumberofStops}</h2> 

    <h2> Itinerary <h2>
    ${originLineHTMLDisplay}
    <h3 class="${originLineName}">||</h3>
    <h3> TRANSFER </h3>
    <h3 class="${destinationLineName}">||</h3>
    ${destinationLineHTMLDisplay}
    `

    // totalStops
    // ${firstTravelVisual}
    // ${secondTravelVisual}
}