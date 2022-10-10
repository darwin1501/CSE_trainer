import React from "react";

const { Provider, Consumer } = React.createContext();

const CategorySelectionProvider = (props) => {
    const [selections, setSelections] = React.useState({
        numerical: false,
        analytical: false,
        verbal: false,
        philCons: false,
        clerical: false
      })

    const handleSetValue = (value) => {
        setSelections(value)
    }
    
    return (
        <Provider value={{value: selections, handleSetValue: handleSetValue}}>
           {props.children}
        </Provider>
    )
}

export {CategorySelectionProvider, Consumer as CategorySelectionConsumer}