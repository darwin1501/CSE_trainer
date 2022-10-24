import React, { useContext } from "react";
import { selectionContext } from "context/categorySelectionContext";

const TrainingResultViewer = (props) => {
    let totalQuestionCount = 0
    const selectionData = useContext(selectionContext)
    const questionCount = selectionData.value
    const {
        numericalCount,
        analyticalCount,
        verbalCount,
        philConsCount,
        clericalCount
      } = questionCount
    const {
        mainScore,
        numerical,
        analytical,
        verbal,
        philConstitution,
        clerical }
        = props.scoresData
    
    Object.entries(questionCount).forEach(count => {
        // get the question count
        totalQuestionCount += count[1]
    });

    return (
        <div className="flex flex-column">
            <p>Your Score: {mainScore} / {totalQuestionCount}</p>
            {numericalCount > 0 && <p>Numerical: {numerical} / { numericalCount }</p>}
            {analyticalCount > 0&& <p>Analytical: {analytical} / { analyticalCount }</p>}
            {verbalCount > 0 && <p>Verbal: {verbal} / { verbalCount }</p>}
            {philConsCount > 0 && <p>Philippine Constitution: {philConstitution} / { philConsCount }</p>}
            {clericalCount > 0 && <p>Clerical: {clerical} / { clericalCount }</p>}
        </div>
    )
}

export default TrainingResultViewer