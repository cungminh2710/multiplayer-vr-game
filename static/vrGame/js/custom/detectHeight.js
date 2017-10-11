class DetectHeight {
    static isAvaiable(oldY,newX,newZ){
        var ceilZ = Math.ceil(-newZ);
        var ceilX = Math.ceil(newX);
        var ceilY = matrix[ceilZ][ceilX];
        var newY = ceilY;
        var floorZ = Math.floor(-newZ);
        var floorX = Math.floor(newX);
        // console.log("come herererere");
        var nearestY = matrix[Math.round(-newZ)][Math.round(newX)]
        console.log("Z",-newZ)
        console.log("X",newX)
        console.log("roundZ",Math.round(-newZ))
        console.log("roundX",Math.round(newX))
        var floorY = matrix[floorZ][floorX];
        console.log("oldY ", oldY);
        console.log("*******************");
        if(Math.abs(nearestY-oldY)>=1){
            console.log("collide")
            return -1;
        }
        if(ceilY!=oldY && Math.abs(ceilY-oldY)<0.5){
    var altitude = 0;
  
    var x1 = Math.floor(newX);
    var x2 = Math.ceil(newX);
    var z1 = Math.floor(newZ);
    var z2 = Math.ceil(newZ);
    var y1 = matrix[-z1][x1];
    var y2 = matrix[-z1][x2];
    // var y1 = getGridAltitude(x1,z1);
    // var y2 = getGridAltitude(x1,z2);
    var ya1 = (newZ - z2) / (z1 - z2) * (y1 - y2) + y2;
    var y3 = matrix[-z1][x2];
    var y4 = matrix[-z2][x2];
    // var y3 = getGridAltitude(x2,z1);
    // var y4 = getGridAltitude(x2,z2);
    var ya2 = (newZ - z2) / (z1 - z2) * (y3 - y4) + y4;
     
               altitude = (newX - x2) / (x1 - x2) * (ya1 - ya2) + ya2;
               //System.out.println(altitude);
                    
              return altitude;

            // console.log("CALCULATE Y");
            // var currPos = new THREE.Vector2(newX,-newZ);
            // var d = currPos.distanceTo( new THREE.Vector2(ceilX,ceilZ));

            // // console.log("ceilY,",ceilY);
            // // console.log("currY,",oldY);
            // // console.log("floorY,",floorY);
            // // console.log("d,",d);
            // var deltaY = (floorY-ceilY)*d;
            // // console.log("deltaY ",deltaY);
            // newY = ceilY + deltaY;  
            // console.log("*******************");

            // return newY;
        }
        return oldY;
    }
 }
 //public double altitude(double x, double z) {
//     double altitude = 0;
  
//     double x1 = Math.floor(x);
//     double x2 = Math.ceil(x);
//     double z1 = Math.floor(z);
//     double z2 = Math.ceil(z);
    
//     double y1 = getGridAltitude((int)x1,(int)z1);
//      double y2 = getGridAltitude((int)x1,(int)z2);
//      double ya1 = (z - z2) / (z1 - z2) * (y1 - y2) + y2;

//      double y3 = getGridAltitude((int)x2,(int)z1);
//      double y4 = getGridAltitude((int)x2,(int)z2);
//      double ya2 = (z - z2) / (z1 - z2) * (y3 - y4) + y4;
     
//                altitude = (x - x2) / (x1 - x2) * (ya1 - ya2) + ya2;
//                //System.out.println(altitude);
                    
//               return altitude;
//          }