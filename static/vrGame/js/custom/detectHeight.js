class DetectHeight {
    static isAvaiable(oldY,oldZ,newX,newZ){
        var z = Math.ceil(-newZ);
        var x = Math.ceil(newX);
        var y = matrix[z][x];
        if(Math.abs(y-oldY)>1) return -1;

        if(y != oldY ){
            // console.log("come hadsadsadasdsadasdsadsaderererere");
            // var floorZ = Math.floor(-newZ);
            // var floorX = Math.floor(newX);
            // console.log("come herererere");
            // var preY = matrix[floorZ][floorX];
            console.log("oldY,",oldY);
            console.log("oldZ,",oldZ);
            console.log("newX,",newX);
            console.log("newZ,",newZ);
            console.log("Z,",z);
            var deltaY = (y-oldY)*(z+newZ)/(z+oldZ);
            y += deltaY;
            console.log("come herererere",Math.round(y*100));


        }
        return y;
    }
}