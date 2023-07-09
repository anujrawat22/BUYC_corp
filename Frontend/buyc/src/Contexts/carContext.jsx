import { useState, createContext, useContext } from "react";


 const carContext = createContext()

export  function  CarId(){
 return useContext(carContext)
}

export function CarProvider({children}){
    const initalvalue = {
        OEMid : null,
        UserId : null,
        DealerId : null
    }


    const [CarObj, setCarObj] = useState(initalvalue)

    const value = {
        CarObj,
        setCarObj
    }

    return (
        <carContext.Provider value={value}>{children}</carContext.Provider>
    )
}