AFRAME.registerComponent('move', {
    init: function () {
this.repeating = false;
this.repeatRateTimer = null;
var count = this.count = 0;
var el = this.el;
window.addEventListener( 'keyup', function( e ) {
    if( this.repeatRateTimer != null )
    {
        clearTimeout( this.repeatRateTimer );
        this.repeatRateTimer = null;
    }
    console.log("keyUp");

    count = 0;
    this.repeating = false;
} );

window.addEventListener( 'keydown', function( e ) {
    e.preventDefault( );
//       var greyMaterial = new THREE.MeshStandardMaterial( { color:0x696969,roughness: 1, metalness: 0.5 } )


    
    
//     var box = new THREE.Mesh( new THREE.BoxBufferGeometry(0.6, 0.5, 0.5), greyMaterial); 
    
//     // console.log( document.querySelector("#man").object3D);
// var hand = document.querySelector("#man").object3D.children[0].children[0].children[2].children[0].children[0].children[2].children[0].children[0].children[0].children[0];
//hand.add(box);
    if( this.repeating == true )
    {
       if( this.repeatRateTimer == null ){
            this.repeatRateTimer = setTimeout( function( ) {
            this.repeating = false;
            clearTimeout( this.repeatRateTimer );
            this.repeatRateTimer = null;
            }, 10 );
        }
        return;
    }
    this.repeating = true;
    console.log("press");
    var pos = el.getAttribute("position");
    e = e ||window.event; // to deal with IE
    var map = {};
    map[e.keyCode] = e.type == 'keydown';
    if(map[37]){ //left arrow
        pos.x-=0.4;
        el.setAttribute("position",pos);
        console.log(count);
       count++;
        map = {};
    }
    else if(map[38]){// up arrow
        pos.z-=0.4;
         el.setAttribute("position",pos);

        count++;
        map = {};   
    }
    else if(map[39]){// right 
        pos.x+=0.4;
        el.setAttribute("position",pos);
        console.log(el.getAttribute("position"));

        count++;
        map = {};
    }
    else if(map[40]){//down arrow
         pos.z+=0.4; 
          el.setAttribute("position",pos);

         
        count++;
        map = {};   
    }
    
} );

    }
  });
