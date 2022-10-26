import React, { useEffect } from 'react'
import QuestionLayoutStyle from './QuestionLayoutStyle.module.css'

const QuestionLayout = props => {
  const [showExplanation, setShowExplanation] = React.useState(false)
  const [selected, setSelected] = React.useState('')
  const [questionReference, setQuestionReference] = React.useState('')
  const [hasImageToLoad, sethasImageToLoad] = React.useState(false)
  const [completeChoices, setCompletedChoices] = React.useState([])
  const [disableButton, setDisableButton] = React.useState(false)
  const {
    _id,
    question,
    questionType,
    explanation,
    choices,
    correctAnswer,
    contributor
  } = props.questionData
  const questionReferenceInQuestions = props.questionReferenceToLayout

  // set choices when page loads

  useEffect(() => {
    const choicesWithCorrectAnswer = [
      choices.choiceOne,
      choices.choiceTwo,
      choices.choiceThree,
      correctAnswer
    ]

    if (questionReferenceInQuestions !== "") {
      // check the type of question reference here
      setQuestionReference(questionReferenceInQuestions)
      if (questionReferenceInQuestions.includes("https://")) {
        sethasImageToLoad(true)
      } else {
        sethasImageToLoad(false)
      }
    }

    shuffleChoices(choicesWithCorrectAnswer)
    setCompletedChoices(choicesWithCorrectAnswer)
  }, [props.questionData])

  

  const shuffleChoices = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }

  const getAnswer = event => {
    const selectedAnswer = event.target.value
    let category = questionType.toLowerCase()
    
    setShowExplanation(true)
    setSelected(selectedAnswer)
    setDisableButton(true)

    let questionCopy = {
      question,
      explanation,
      selectedAnswer,
      correctAnswer,
      questionReference : questionReferenceInQuestions !== "" ? questionReference : ""
    }

    props.recordQuestion(questionCopy)
    

    if (selectedAnswer === correctAnswer) {
      // correct
      props.setScores(prev => {
        let currentScoreCategory = null

        if (questionType === "Numerical") {
          currentScoreCategory = prev.numerical
        } else if (questionType === "Analytical") {
          currentScoreCategory = prev.analytical
        } else if (questionType === "Verbal") {
          currentScoreCategory = prev.verbal
        } else if (questionType === "Philippine Constitution") {
          currentScoreCategory = prev.philConstitution
          category = "philConstitution"
        } else if (questionType === "Clerical") {
          currentScoreCategory = prev.clerical
        }

        return {
          ...props.scoresData,
          mainScore: prev.mainScore + 1,
          [category]: currentScoreCategory + 1
        }
      })
    }
  }

  const selections = completeChoices.map(data => (
    <button
      className={QuestionLayoutStyle.btn_select}
      value={data}
      onClick={getAnswer}
      disabled={disableButton}
    >
      {data}
      {data === selected
        ? selected === correctAnswer
          ? '   correct'
          : '   incorrect'
        : ''}
    </button>
  ))
  
  return (
    <div className={QuestionLayoutStyle.bg}>
      <div className={QuestionLayoutStyle.container}>
      <div className='flex flex-end'>
          <button
            onClick={() => {
              props.displayQuestion()
              setDisableButton(false)
              setShowExplanation(false)
            }}
            style={{ padding: '10px', width: '100px' }}
          >
            Next
          </button>
        </div>
        <div className='flex flex-start'>
          <p
            style={{
              fontSize: '18px',
              fontWeight: 'bolder',
              opacity: '0.7'
            }}
          >
            {questionType}
          </p>
        </div>
        {/* conditionally renders the question reference */}
        {
          questionReferenceInQuestions !== "" &&
          <div className='flex flex-center'>
          {hasImageToLoad === true ? (
            <img
              src={`${questionReference}`}
              alt='question reference'
              style={{
                width: '30%'
              }}
            />
          ) : (
            <p style={{ whiteSpace: 'pre-line' }}>{questionReference}</p>
          )}
        </div>
        }
        <div
          className={`flex flex-center ${QuestionLayoutStyle.question_text}`}
          style={{
            marginBottom: '20px'
          }}
        >
          <p
            style={{
              marginTop: '40px',
              marginBottom: '20px',
              whiteSpace: 'pre-line'
            }}
          >
            {question}
          </p>
        </div>
        <div className=' flex flex-center'>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '30px'
            }}
          >
            {selections}
          </div>
        </div>
        <div
          className='flex flex-end'
          style={{
            fontWeight: 'bolder'
          }}
        >
          <p>
            <p style={{ opacity: '0.7' }}>Question By:</p> {contributor}
          </p>
        </div>
        {(showExplanation && explanation !== "None") && (
          <div className={QuestionLayoutStyle.explanation_container}>
            <p
              style={{
                fontWeight: 'bolder'
              }}
            >
              Explanation
            </p>
            <p style={{whiteSpace: "pre-line"}} >{explanation}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionLayout
