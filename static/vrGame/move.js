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
        console.log(el.getAttribute("position"));
        el.setAttribute("position",pos);
        console.log(count);
        
        map = {};
        // the variable need to send is pos and el.getAttribute("id")
        
        gameRoom.send({
            
        })
    }
    else if(map[38]){// up arrow
        pos.z-=0.4;
         el.setAttribute("position",pos);


        map = {};   
    }
    else if(map[39]){// right 
        pos.x+=0.4;
        el.setAttribute("position",pos);
        console.log(el.getAttribute("position"));

     
        map = {};
    }
    else if(map[40]){//down arrow
         pos.z+=0.4; 
          el.setAttribute("position",pos);

         
   
        map = {};   
    }
    
} );

    }
  });
