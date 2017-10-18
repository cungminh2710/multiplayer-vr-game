var characterConfig = {}
//tank
characterConfig[1] = {
    model:"models/tank",
    health:500,
    cameraHeight: 1.4,
    localPosition:"0 -1.4 0",
    moveSpeed:0.03,
    runSpeed: 0.05,
    skill:{
        attack:{
            damage:50,
            target: false,
            maxDistance: 3,
            buff:"",
            cd:1.5
        },
        skill1:{
            name: "Cage",
            damage:0,
            target: true,
            maxDistance: 10,
            buff: "disableMove",
            cd: 8
        },
        skill2:{
            name: "Rocket",
            damage: 100,
            target: false,
            maxDistance: 20,
            buff:"",
            cd: 8
        }

    }

}
//adc
characterConfig[2] = {
    model:"models/adc",
    health:200,
    cameraHeight: 0.85,
    localPosition:"0 -0.85 0.21",
    moveSpeed: 0.025,
    runSpeed: 0.045,
    skill:{
        attack:{
            damage: 30,
            target: false,
            maxDistance: 3,
            buff:"",
            cd:1.5
        },
        skill1:{            
            name: "Flash",
            damage:0,
            target: false,
            maxDistance: 10,
            buff: "flash",
            cd: 5
        },
        skill2:{
            name: "Lazer",            
            damage: 200,
            target: true,
            maxDistance: 20,
            buff:"",
            cd: 8
        }

    }

}
//healer
characterConfig[3] = {
    model:"models/healer",
    health:300,
    cameraHeight: 0.75,
    localPosition:"0 -0.75 0.17",
    moveSpeed: 0.035,
    runSpeed: 0.055,
    skill:{
        attack:{
            damage: -10,
            target: true,
            maxDistance: 3,
            buff:"",
            cd:1.5
        },
        skill1:{
            name: "Cure",
            damage:-50,
            target: true,
            maxDistance: 10,
            buff: "disableMove",
            cd: 8
        },
        skill2:{
            name: "Wish",
            damage: -100,
            target: false,
            maxDistance: Infinity,
            buff:"",
            cd: 15
        }

    }

}