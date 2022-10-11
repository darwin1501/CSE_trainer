import React from "react";

const QuestionLayout = (props) => {
   
    return (
        <h1>
            Question here
          {props.questionData._id}
        </h1>
    )
}

export default QuestionLayout