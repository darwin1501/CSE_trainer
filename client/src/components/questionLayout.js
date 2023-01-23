import React, { useEffect } from 'react'
import QuestionLayoutStyle from './QuestionLayoutStyle.module.css'
import backIcon from '../icon/back.svg'
import { Link } from 'react-router-dom'

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
  const LETTERS = ['A', 'B', 'C', 'D']
  let letterCounter = 0

  // set choices when page loads

  useEffect(() => {
    const choicesWithCorrectAnswer = [
      choices.choiceOne,
      choices.choiceTwo,
      choices.choiceThree,
      correctAnswer
    ]

    if (questionReferenceInQuestions !== '') {
      // check the type of question reference here
      setQuestionReference(questionReferenceInQuestions)
      if (questionReferenceInQuestions.includes('https://')) {
        sethasImageToLoad(true)
      } else {
        sethasImageToLoad(false)
      }
    }

    shuffleChoices(choicesWithCorrectAnswer)
    setCompletedChoices(choicesWithCorrectAnswer)
    setSelected('')
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
      questionType,
      explanation,
      selectedAnswer,
      correctAnswer,
      questionReference:
        questionReferenceInQuestions !== '' ? questionReference : ''
    }

    props.recordQuestion(questionCopy)

    if (selectedAnswer === correctAnswer) {
      // correct
      props.setScores(prev => {
        let currentScoreCategory = null

        if (questionType === 'Numerical') {
          currentScoreCategory = prev.numerical
        } else if (questionType === 'Analytical') {
          currentScoreCategory = prev.analytical
        } else if (questionType === 'Verbal') {
          currentScoreCategory = prev.verbal
        } else if (questionType === 'Philippine Constitution') {
          currentScoreCategory = prev.philConstitution
          category = 'philConstitution'
        } else if (questionType === 'Clerical') {
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

  const selections = completeChoices.map(data => {
    if (data !== 'none') {
      let letter = LETTERS[letterCounter]

      letterCounter += 1
      return (
        <button
          className={QuestionLayoutStyle.btn_select}
          value={data}
          onClick={getAnswer}
          disabled={disableButton}
          style={{
            backgroundColor: `${
              /* 
              correct #94d7a2
              incorrect #e7a4d0
                  new E7A4BE
            */
              data === selected
                ? selected === correctAnswer
                  ? '#94d7a2'
                  : '#e7a4d0'
                : selected && data === correctAnswer && '#94d7a2'
            }`
          }}
        >
          <div
            className={QuestionLayoutStyle.box_sm}
            style={{ padding: '10px', width: '15px' }}
          >
            {letter}
          </div>
          {data}
        </button>
      )
    }
  })

  return (
    <div className={QuestionLayoutStyle.container}>
      <div className='flex' style={{width: "100%"}}>
      <div style={{marginRight: "auto", right: "95%"}}>
        <Link to='/quick-test/category-selection'>
          <div>
            <img className='back_btn' src={backIcon} alt='back button' />
          </div>
        </Link>
      </div>
        {selected !== '' && (
          <div style={{marginLeft: "auto"}}>
            <button
              onClick={() => {
                props.displayQuestion()
                setDisableButton(false)
                setShowExplanation(false)
              }}
              className={`btn-purple ${QuestionLayoutStyle.btn_next}`}
            >
              Next
            </button>
          </div>
        )}
      </div>
      {contributor !== null && (
        <p className={QuestionLayoutStyle.info} style={{ textAlign: 'right' }}>
          <strong>Question By:</strong> <br></br>
          {contributor}
        </p>
      )}
      <div className='flex flex-center'>
        <p className={QuestionLayoutStyle.info}>{questionType}</p>
      </div>
      {/* conditionally renders the question reference */}
      {questionReferenceInQuestions !== '' && (
        <div className='flex flex-center' style={{ marginBottom: '60px' }}>
          {hasImageToLoad === true ? (
            <img
              src={`${questionReference}`}
              alt='question reference'
              className={QuestionLayoutStyle.img_reference}
            />
          ) : (
            <p style={{ whiteSpace: 'pre-line' }}>{questionReference}</p>
          )}
        </div>
      )}
      <div
        className={`flex flex-center align-left gap-md ${QuestionLayoutStyle.question_text}`}
        style={{
          marginBottom: '20px'
        }}
      >
        <div
          className={QuestionLayoutStyle.box_sm}
          style={{
            padding: '8px',
            maxWidth: '40px',
            maxHeight: '40px',
            marginTop: '-10px'
          }}
        >
          {props.questionNumber}.
        </div>
        <p
          style={{
            marginTop: '0',
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
      ></div>
      {showExplanation && explanation !== 'None' && (
        <div className={QuestionLayoutStyle.explanation_container}>
          <p
            style={{
              fontWeight: 'bolder'
            }}
          >
            Explanation
          </p>
          <p style={{ whiteSpace: 'pre-line' }}>{explanation}</p>
        </div>
      )}
    </div>
  )
}

export default QuestionLayout
