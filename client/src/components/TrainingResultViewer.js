import React, { useContext } from "react";
import { selectionContext } from "context/categorySelectionContext";
import CollapsibleQuestion from "./CollapsibleQuestion";

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

    function getScoreInPercentage(value, totalValue) {
        return (value / totalValue ) * 100
    }

    const answeredQuestions = props.answeredQuestions.map(questionData => {
        if (questionData.hasOwnProperty("questionReference")) {
            return (
                <CollapsibleQuestion
                questionReference={questionData.questionReference}
                questions={questionData.questions}
            />
            )
        } else {
            return (
                <CollapsibleQuestion
                question={questionData.question}
                selectedAnswer={questionData.selectedAnswer}
                correctAnswer={questionData.correctAnswer}
                explanation={questionData.explanation}
            />
            )
        }
    })

    return (
        <div className="flex flex-column align-center">
            <h2>{mainScore} / {totalQuestionCount} ({getScoreInPercentage(mainScore, totalQuestionCount)}%)</h2>
            <h4 style={{margin: "0"}}>Your Score</h4>
            {numericalCount > 0 && <p>Numerical: {numerical} / {numericalCount} ({ getScoreInPercentage(numerical, numericalCount)}%)</p>}
            {analyticalCount > 0&& <p>Analytical: {analytical} / { analyticalCount } ({ getScoreInPercentage(analytical, analyticalCount)}%)</p>}
            {verbalCount > 0 && <p>Verbal: {verbal} / { verbalCount } ({ getScoreInPercentage(verbal, verbalCount)}%)</p>}
            {philConsCount > 0 && <p>Philippine Constitution: {philConstitution} / { philConsCount } ({ getScoreInPercentage(philConstitution, philConsCount)}%)</p>}
            {clericalCount > 0 && <p>Clerical: {clerical} / { clericalCount } ({ getScoreInPercentage(clerical, clericalCount)}%)</p>}
            <div  className="flex flex-column gap-md" style={{marginTop: "40px"}}>
                {answeredQuestions}
            </div>
        </div>
    )
}

export default TrainingResultViewer