import React, { createContext, useState } from 'react'
export const IsOpen = createContext()

const IsOpenContext = (props) => {
    const [variableOne, setVariableOne] = useState(true)

    return (
         <IsOpen.Provider
            value={{ variableOne }}>
            {props.children}
         </IsOpen.Provider>
    )
}
export default IsOpenContext