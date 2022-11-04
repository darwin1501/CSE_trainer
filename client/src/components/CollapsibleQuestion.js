import React ,{useState} from 'react'
import Collapsible from 'react-collapsible'
import CollapsibleQuestionStyle from "./CollapsibleQuestionStyle.module.css"
import ExpandLessIcon from "../icon/expand_less.svg"
import ExpandMoreIcon from "../icon/expand_more.svg"

export default function CollapsibleQuestion(props) {

    const [questionStatus, setQuestionStatus] = useState("");
    const [isExpand, setIsExpand] = useState(false);
    const CORRECT_STATUS = " #94d7a2"
    const INCORRECT_STATUS = " #e7a4d0"

    // eslint-disable-next-line array-callback-return
    const questionStatusWithStyle = questionStatus.split(" ").map(status => {
            if (status !== "") {
                return (
                    <div style={{ backgroundColor: `${status}`, height: "15px", width: "15px" }}>
                    </div>
                )
            }
        }
    )

    function handleChangeExpand() {
        setIsExpand(!isExpand)
    }

    function TriggerElement() {
        return (
            <div className={CollapsibleQuestionStyle.trigger_element}
                onClick={() => handleChangeExpand()}
                style={{cursor:"pointer"}}
            >
                
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
                <div className="flex gap-sm">{questionStatusWithStyle}</div>
                <div style={{ marginLeft: "auto" }}>
                    {
                        isExpand ?
                        <img src={ExpandLessIcon} alt="close" />
                        :                           
                        <img src={ExpandMoreIcon} alt="expand"/>
                    }
                </div>
            </div>
        )
    }
    console.log(questionStatus)

    function UngroupQuestion() {
        if (props.selectedAnswer === props.correctAnswer) {
            setQuestionStatus(CORRECT_STATUS)
        } else {
            setQuestionStatus(INCORRECT_STATUS)
        }

        return (
            <div className={CollapsibleQuestionStyle.text_container}>
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
                status += ` ${CORRECT_STATUS}`
            } else {
                status += ` ${INCORRECT_STATUS}`
            }
            return (
                <div className={CollapsibleQuestionStyle.text_container}>
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