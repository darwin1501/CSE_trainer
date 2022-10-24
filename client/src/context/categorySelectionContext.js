import React from "react";

const selectionContext = React.createContext()

const { Provider, Consumer } = selectionContext;

const CategorySelectionProvider = (props) => {
    const [questionCount, setQuestionCount] = React.useState({
        numericalCount: 0,
        analyticalCount: 0,
        verbalCount: 0,
        philConsCount: 0,
        clericalCount: 0
      })

    const handleSetValue = (value) => {
        setQuestionCount(value)
    }
    
    return (
        <Provider value={{value: questionCount, handleSetValue: handleSetValue}}>
           {props.children}
        </Provider>
    )
}

export {CategorySelectionProvider, Consumer as CategorySelectionConsumer, selectionContext}