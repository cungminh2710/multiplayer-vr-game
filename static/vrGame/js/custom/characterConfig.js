var characterConfig = {}
//tank
characterConfig[1] = {
    model:"models/tank",
    health:2500,
    cameraHeight: 1.4,
    healthBarPos: 2,
    localPosition:"0 -1.4 0.20",
    moveSpeed:0.075,
    runSpeed: 0.08,
    gazeDistance:17,
    boundingBox:{
        width:1.4649,
        length:1.4012
    },
    skill:{
        attack:{
            name: "Punch",
            damage:100,
            target: false,
            maxDistance: 3,
            buff:"",
            cd:1500
        },
        skill1:{
            name: "Cage",
            damage:0,
            target: true,
            maxDistance: 10,
            buff: "disableMove",
            cd: 7000
        },
        skill2:{
            name: "Rocket",
            damage: 300,
            target: false,
            maxDistance: 20,
            buff:"",
            cd: 10000
        }

    }

}
//adc
characterConfig[2] = {
    model:"models/adc",
    health:1500,
    cameraHeight: 0.85,
    healthBarPos: 1.6,
    localPosition:"0 -0.85 0.3",
    moveSpeed: 0.065,
    runSpeed: 0.07,
    gazeDistance:20,
    boundingBox:{
        width:0.5660,
        length:0.7255
    },
    skill:{
        attack:{
            name: "Bullet",
            damage: 70,
            target: false,
            maxDistance: 3,
            buff:"",
            cd:1000
        },
        skill1:{            
            name: "Flash",
            damage:0,
            target: false,
            maxDistance: 10,
            buff: "flash",
            cd: 6500
        },
        skill2:{
            name: "Lazer",            
            damage: 400,
            target: true,
            maxDistance: 20,
            buff:"",
            cd: 8000
        }

    }

}
//healer
characterConfig[3] = {
    model:"models/healer",
    health:1700,
    cameraHeight: 0.75,
    healthBarPos: 1.45,
    localPosition:"0 -0.75 0.20",
    moveSpeed: 0.06,
    runSpeed: 0.065,
    gazeDistance:14,
    boundingBox:{
        width:0.5337,
        length:0.5127
    },
    skill:{
        attack:{
            name: "Cure",
            damage: -40,
            target: true,
            maxDistance: 3,
            buff:"",
            cd:1700
        },
        skill1:{
            name: "FireBall",
            damage:100,
            target: true,
            maxDistance: 10,
            cd: 3000
        },
        skill2:{
            name: "Wish",
            damage: -500,
            target: false,
            maxDistance: Infinity,
            buff:"",
            cd: 13000
        }

    }

}