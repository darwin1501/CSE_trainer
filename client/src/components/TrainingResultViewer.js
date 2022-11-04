import React, { useContext, useState } from "react";
import { selectionContext } from "context/categorySelectionContext";
import CollapsibleQuestion from "./CollapsibleQuestion";
import TrainingResultViewerStyle from "./TrainingResultViewerStyle.module.css"
import { Link } from "react-router-dom";

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
    let questionNumber = 0
    
    
    Object.entries(questionCount).forEach(count => {
        // get the question count
        totalQuestionCount += count[1]
    });

    function getScoreInPercentage(value, totalValue) {
        return Math.trunc((value / totalValue ) * 100)
    }

    function displayByCategory(categegory) {

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
        
            const questionCountInGroup = questionData.questions.length
            // add 1 to correct the numbering at the start of questions in question group
            const prevQuestionNumber = questionNumber + 1
            // subtract 1 to correct the numbering at the end of questions in question group
            const newQuestionNumber = (questionNumber + questionCountInGroup)
            // add question count to question number
            questionNumber += questionCountInGroup

            const questionNumberToLayout = questionCountInGroup > 1 ? [prevQuestionNumber, newQuestionNumber] : questionNumber
            return (
                <CollapsibleQuestion
                    questionReference={questionData.questionReference}
                    questionType={questionData.questionType}
                    questions={questionData.questions}
                    questionNumber={questionNumberToLayout}
                />
            )
        } else {
            questionNumber += 1
            return (
                <CollapsibleQuestion
                    question={questionData.question}
                    questionType={questionData.questionType}
                    selectedAnswer={questionData.selectedAnswer}
                    correctAnswer={questionData.correctAnswer}
                    explanation={questionData.explanation}
                    questionNumber={questionNumber}
                />
            )
        }

        
    })

    return (
        <div className="flex flex-column align-center">
            <div className={TrainingResultViewerStyle.main_score_container}>
                <p className={TrainingResultViewerStyle.text_main_score}>{getScoreInPercentage(mainScore, totalQuestionCount)}%</p>
                <p className={TrainingResultViewerStyle.subtext_main_score}>({mainScore} / {totalQuestionCount})</p>
            </div>
            <h4 style={{margin: "0"}}>You Score</h4>
            {numericalCount > 0 && <p>Numerical: {numerical} / {numericalCount} ({ getScoreInPercentage(numerical, numericalCount)}%)</p>}
            {analyticalCount > 0&& <p><b>Analytical:</b> {analytical} / { analyticalCount } ({ getScoreInPercentage(analytical, analyticalCount)}%)</p>}
            {verbalCount > 0 && <p><b>Verbal:</b> {verbal} / { verbalCount } ({ getScoreInPercentage(verbal, verbalCount)}%)</p>}
            {philConsCount > 0 && <p><b>Philippine Constitution:</b> {philConstitution} / { philConsCount } ({ getScoreInPercentage(philConstitution, philConsCount)}%)</p>}
            {clericalCount > 0 && <p><b>Clerical:</b> {clerical} / { clericalCount } ({ getScoreInPercentage(clerical, clericalCount)}%)</p>}
            <div className="flex flex-center gap-sm">
                <p>Try Again?</p>
                <Link to="/trainingtype">
                    <div className="btn-simple" style={{padding: "5px !important"}}>
                        Yes
                    </div>
                </Link>
                <Link to="/">
                    <div className="btn-simple" style={{padding: "5px !important"}}>
                        No
                    </div>
                </Link>
            </div>
            <div style={{ marginTop: "80px" }}>
                <div className="flex flex-center">
                    <div className="flex flex-wrap flex-center gap-sm">
                    <button 
                        className="btn-simple"
                        onClick={() => {
                            displayByCategory("All")
                        }}
                    >
                        All
                    </button>
                    {
                        analyticalCount > 0 &&
                        <button 
                        className="btn-simple"
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
                            className="btn-simple"
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
                            className="btn-simple"
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
                            className="btn-simple"
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
                            className="btn-simple"
                            onClick={() => {
                                displayByCategory("Clerical")
                            }}
                        >
                        Clerical
                        </button>
                    }
                    </div>
                </div>
                <div  className={`flex flex-column gap-md ${TrainingResultViewerStyle.answered_question_container}`} style={{ marginTop: "20px", marginBottom: "15%" }}>
                    {answeredQuestions}
                </div>
            </div>
        </div>
    )
}

export default TrainingResultViewer