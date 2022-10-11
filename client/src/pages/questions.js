import React, {useEffect, useContext, useState} from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import questionMaker from "factory/questionMaker";
import { selectionContext } from "context/categorySelectionContext";
import QuestionLayout from "components/questionLayout";


const Questions = () => {
    const { trainingType } = useParams()
    const categorySelection = useContext(selectionContext)
    const [questions, setQuestions] = useState([])
    const [questionIndex, setQuestionIndex] = useState(0);
    const [questionsCount, setQuestionsCount] = useState(0);
    const [questionToLayout, setQuestionToLayout] = useState({
        _id: "",
        question: "",
        questionType: "",
        explanation: "",
        choices: [],
        correctAnwer: ""
    })

    useEffect(() => {
        const getQuestions = async () =>{
            const questionsList = await questionMaker(categorySelection.value, trainingType)

            setQuestions(questionsList)
            setQuestionsCount(Object.keys(questionsList).length)
        }
        getQuestions()
        
        return
    }, [])


    const displayQuestion = () => {
        // get the first index
        if( questionIndex < questionsCount) {
            const questionData = questions[questionIndex]
                // check if the question type is question group
                if (questionData.hasOwnProperty("referenceType")) {
                    console.log("question group")
                    
                    // add 1 if all of the questions in question group has been displayed
                    setQuestionIndex(questionIndex + 1)
                } else {
                    console.log("ungroup  question")
                    setQuestionIndex(questionIndex + 1)
                }
                console.log(questionData)
            
            setQuestionToLayout(questionData)
            
        } else {
            console.log("This is the last question")
        }
    }

    return (
        <div>
            <Link to='/quick-test/category-selection'>
                <div>
                    <span className="material-symbols-outlined back-icon">
                        arrow_back_ios
                    </span>
                </div>
            </Link>
            <QuestionLayout questionData={questionToLayout} />
            <button onClick={displayQuestion}
                disabled={!questions.length ? true : false}
                style={{padding: "10px"}}>
                {!questions.length ? "Loading": "Start"}
            </button>
        </div>
    )
}

export default Questions