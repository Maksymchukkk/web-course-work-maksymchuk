import { makeAutoObservable} from "mobx";

class RadiosStore {
    currentRadio ;
    currentMap;
    constructor() {
        makeAutoObservable(this)
    }

    changeCurrentRadio(value) {
        this.currentRadio = value
        console.log(this.currentRadio.model)
    }

    pushRadioToCurrentMap(radio){
        this.currentMap.radios.push(radio)
        console.log(this.currentMap)
    }

    changeCurrentMap(value) {
        this.currentMap = value
        console.log(this.currentMap.name)
    }

}

const radiosStore = new RadiosStore()
export default radiosStore