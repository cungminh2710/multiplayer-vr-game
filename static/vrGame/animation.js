class Animation{

    static setAnimation(id, movement){
        var player = document.querySelector("#"+id);
        player.setAttribute("animation-mixer","clip:"+movement)
        
    }


}