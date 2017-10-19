class Adc{
    
        static attack(){
    
            gameRoom.send({action: "SKILLANIMATION", data:"attack"});
        }
    
        static skill1(){
            gameRoom.send({action: "SKILLANIMATION", data:"skill1"});
        }
        
        static skill2(){
            gameRoom.send({action: "SKILLANIMATION", data:"skill2"});
        }
    
    }