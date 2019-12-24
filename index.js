var http = require('http');
var honoiPath=[];
var modulus=Math.pow(10, 9);

//function to get cost of the move
moveCost=function(tiles,i,j){
    if (i < j) {
        var cost = (Math.pow((j - 1), 2)) - (Math.pow((i - 1), 2));
    } else {
        var cost = (Math.pow((tiles - j), 2)) - (Math.pow((tiles - i), 2));
    }
    return cost % modulus;
}

//recurseive function to identy the number of optimal moves that BOB has to traverse
towerOfHanoi = function (n, from_rod, to_rod, aux_rod){
    if(n===1){
        if(honoiPath.length==0){
            if (to_rod < aux_rod){
                honoiPath.push({ 'from': to_rod, 'to': from_rod});    
            }else{
                honoiPath.push({ 'from': aux_rod, 'to': from_rod });    
            }
        }else{
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

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var summationCost=0;
    for (let n = 1; n <= 1500; n++) {
        var numberOfDisk = (n) % modulus;
        var numberOfTiles = (numberOfDisk * 10) % modulus;
        var towerA = (numberOfDisk * 3) % modulus;
        var towerB = (numberOfDisk * 6) % modulus;
        var towerC = (numberOfDisk * 9) % modulus;
        honoiPath = [];
        
        towerOfHanoi(numberOfDisk, towerA, towerC, towerB);
        
        var pathCost = 0;
        for (let eachSegment of honoiPath) {
            pathCost += moveCost(numberOfTiles, eachSegment.from, eachSegment.to);
        }
        summationCost += pathCost;
        summationCost = summationCost%modulus;
        
        
    }
    console.log(summationCost);
    res.write("∑1≤n≤10000 is " + summationCost);
    res.end('');
}).listen(3000); 