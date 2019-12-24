var http = require('http');
var honoiPath = [];
var modulus = Math.pow(10, 9);

//function to get cost of the move
moveCost = function (tiles, i, j) {
    if (i < j) {
        var cost = (Math.pow((j - 1), 2)) - (Math.pow((i - 1), 2));
    } else {
        var cost = (Math.pow((tiles - j), 2)) - (Math.pow((tiles - i), 2));
    }
    return cost % modulus;
}

//recurseive function to identy the number of optimal moves that BOB has to traverse
towerOfHanoi = function (n, from_rod, to_rod, aux_rod) {
    if (n === 1) {
        if (honoiPath.length == 0) {
            if (to_rod < aux_rod) {
                honoiPath.push({ 'from': to_rod, 'to': from_rod });
            } else {
                honoiPath.push({ 'from': aux_rod, 'to': from_rod });
            }
        } else {
            var lastTravel = honoiPath[honoiPath.length - 1];
            honoiPath.push({ 'from': lastTravel.to, 'to': from_rod });
        }

        honoiPath.push({ 'from': from_rod, 'to': to_rod });
        return;
    }

    towerOfHanoi(n - 1, from_rod, aux_rod, to_rod);

    if (honoiPath.length == 0) {
        honoiPath.push({ 'from': aux_rod, 'to': from_rod });
    } else {
        var lastTravel = honoiPath[honoiPath.length - 1];
        honoiPath.push({ 'from': lastTravel.to, 'to': from_rod });
    }

    honoiPath.push({ 'from': from_rod, 'to': to_rod });
    towerOfHanoi(n - 1, aux_rod, to_rod, from_rod);
}

E = function (numberOfDisk, numberOfTiles, towerA, towerB, towerC){
    
    honoiPath = [];

    towerOfHanoi(numberOfDisk, towerA, towerC, towerB);

    var pathCost = 0;
    for (let eachSegment of honoiPath) {
        pathCost += moveCost(numberOfTiles, eachSegment.from, eachSegment.to);
    }
    pathCost= pathCost % modulus;
    return pathCost;
}

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    
     
    
    res.write("E(2,5,1,3,5) has to be  60 and it is " + E(2, 5, 1, 3, 5));
    res.write("<br>");
    res.write("E(3,20,4,9,17) has to be  2358 and it is " + E(3, 20, 4, 9, 17));
    res.end('');
}).listen(3000); 