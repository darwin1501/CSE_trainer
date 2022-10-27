import React, { useContext, useState } from "react";
import { selectionContext } from "context/categorySelectionContext";
import CollapsibleQuestion from "./CollapsibleQuestion";
import TrainingResultViewerStyle from "./TrainingResultViewerStyle.module.css"

const TrainingResultViewer = (props) => {
    let totalQuestionCount = 0
    const selectionData = useContext(selectionContext)
    const [answeredQuestionToView, setansweredQuestionsToView] = useState(props.answeredQuestions)
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
        return Math.trunc((value / totalValue ) * 100)
    }

    function displayByCategory(categegory) {

        console.log(categegory)

        if(categegory !== "All") {
            const questionOnCategory = props.answeredQuestions.filter(question => {
                return question.questionType === categegory
            })
            console.log(props.answeredQuestions)
            console.log(questionOnCategory)
            setansweredQuestionsToView(questionOnCategory)
        } else {
            setansweredQuestionsToView(props.answeredQuestions)
        }
    }

    const answeredQuestions = answeredQuestionToView.map(questionData => {
        if (questionData.hasOwnProperty("questionReference")) {
            return (
                <CollapsibleQuestion
                    questionReference={questionData.questionReference}
                    questionType={questionData.questionType}
                    questions={questionData.questions}
                />
            )
        } else {
            return (
                <CollapsibleQuestion
                    question={questionData.question}
                    questionType={questionData.questionType}
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
            <div style={{ marginTop: "40px" }}>
                <div className="flex flex-center">
                    <div className="flex flex-wrap flex-center gap-sm">
                    <button 
                        className={TrainingResultViewerStyle.btn_categories}
                        onClick={() => {
                            displayByCategory("All")
                        }}
                    >
                        All
                    </button>
                    {
                        analyticalCount > 0 &&
                        <button 
                            className={TrainingResultViewerStyle.btn_categories}
                            onClick={() => {
                                displayByCategory("Analytical")
                            }}
                        >
                        Analytical
                    </button>
                    }
                    {
                        numericalCount > 0 &&
                        <button 
                            className={TrainingResultViewerStyle.btn_categories}
                            onClick={() => {
                                displayByCategory("Numerical")
                            }}
                        >
                        Numerical
                        </button>
                    }
                    {
                        verbalCount > 0 &&
                        <button 
                            className={TrainingResultViewerStyle.btn_categories}
                            onClick={() => {
                                displayByCategory("Verbal")
                            }}
                        >
                            Verbal
                        </button>
                    }
                    {
                        philConsCount > 0 &&
                        <button 
                        className={TrainingResultViewerStyle.btn_categories}
                        onClick={() => {
                            displayByCategory("philCons")
                        }}
                        >
                        Philippine Constitution
                        </button>
                    }
                    {
                        clericalCount > 0 &&
                        <button 
                        className={TrainingResultViewerStyle.btn_categories}
                        onClick={() => {
                            displayByCategory("Clerical")
                        }}
                        >
                        Clerical
                        </button>
                    }
                    </div>
                </div>
                <div  className="flex flex-column gap-md" style={{ marginTop: "40px" }}>
                    {answeredQuestions}
                </div>
            </div>
        </div>
    )
}

export default TrainingResultViewer