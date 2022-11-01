import React ,{useState} from 'react'
import Collapsible from 'react-collapsible'
import CollapsibleQuestionStyle from "./CollapsibleQuestionStyle.module.css"

export default function CollapsibleQuestion(props) {

    const [questionStatus, setQuestionStatus] = useState("") 

    function TriggerElement() {
        return (
            <div className={CollapsibleQuestionStyle.trigger_element}>
                
                {/* if question number has two set of number
                    this is question group
                */}
                {
                    Array.isArray(props.questionNumber) ? 
                    <div className="flex align-center" style={{gap: "4px"}}>
                        <div className={CollapsibleQuestionStyle.number_box}>
                        {props.questionNumber[0]}
                            </div>
                            <p> - </p>
                        <div className={CollapsibleQuestionStyle.number_box}>
                            {props.questionNumber[1]}
                        </div>
                    </div>
                        :
                        <div className={CollapsibleQuestionStyle.number_box}>
                            {props.questionNumber}
                        </div>
                }
                {questionStatus}
            </div>
        )
    }
    console.log(questionStatus)

    function UngroupQuestion() {
        if (props.selectedAnswer === props.correctAnswer) {
            setQuestionStatus("correct")
        } else {
            setQuestionStatus("incorrect")
        }

        return (
            <div>
                <p>
                    <strong>Question:</strong> {props.question}
                </p>
                <p>
                    <strong>Your Answer:</strong> {props.selectedAnswer}
                </p>
                <p>
                    <strong>Correct Answer:</strong> {props.correctAnswer}
                </p>
                <p>
                    <strong>Explanation:</strong> {props.explanation}
                </p>
            </div>
        )
    }

    function GroupQuestion() {
        let status = ""

        const questions = props.questions.map(questionData => {
            if (questionData.selectedAnswer === questionData.correctAnswer) {
                status += " correct"
            } else {
                status += " incorrect"
            }
            return (
                <div>
                    <hr></hr>
                    <p>
                        <strong>Question:</strong> {questionData.question}
                    </p>
                    <p>
                        <strong>Your Answer:</strong> {questionData.selectedAnswer}
                    </p>
                    <p>
                        <strong>Correct Answer:</strong> {questionData.correctAnswer}
                    </p>
                    <p>
                        <strong>Explanation:</strong> {questionData.explanation}
                    </p>
                    <hr></hr>
            </div>
            )
        })

        setQuestionStatus(status)

        return (
            <div>
                {/* <p>Reference: {props.questionReference}</p> */}
   
                {props.questionReference.includes("https") ? (
                    <img
                    src={`${props.questionReference}`}
                    alt='question reference'
                    style={{
                        width: '90%'
                    }}
                    />
                ) : (
                    <p style={{ whiteSpace: 'pre-line' }}>{props.questionReference}</p>
                )}
                <div>
                    {questions}
                </div>
            </div>
        )
    }

    function CollapsibleContent() {
        if (props.hasOwnProperty("questionReference")) {
            return (<GroupQuestion />)
        } else {
            return (<UngroupQuestion />)
        }
    }

    return (
        <Collapsible trigger={<TriggerElement />} transitionTime={ 200}>
            <div className={CollapsibleQuestionStyle.collasible_container}>
                <CollapsibleContent />
            </div>
        </Collapsible>
    )
}