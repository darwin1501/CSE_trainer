import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import questionMaker from 'factory/questionMaker'
import { selectionContext } from 'context/categorySelectionContext'
import QuestionLayout from 'components/questionLayout'
import TrainingResultViewer from 'components/TrainingResultViewer'

const Questions = () => {
  const { trainingType } = useParams()
  const questionCount = useContext(selectionContext)
  const [questions, setQuestions] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [questionsCount, setQuestionsCount] = useState(0)
  const [isTestStart, setIsTestStart] = useState(false)
  const [isTestEnd, setIsTestEnd] = useState(false)
  const [questionToLayout, setQuestionToLayout] = useState({
    _id: '',
    question: '',
    questionType: '',
    explanation: '',
    choices: [],
    correctAnswer: '',
    contributor: ''
  })
  const [questionReferenceToLayout, setQuestionReferenceToLayout] = useState("")
  const [questionIndexInQuestionGroup, setQuestionIndexInQuestionGroup] = useState(0)
  const [scores, setScores] = useState({
    mainScore: 0,
    numerical: 0,
    analytical: 0,
    verbal: 0,
    philConstitution: 0,
    clerical: 0
  })
  const [answeredQuestions, setAnsweredQuestions] = useState([])
  const [questionNumber, setQuestionNumber] = useState(0)

  function recordQuestion(questionData) {
    const {
      question,
      questionType,
      explanation,
      selectedAnswer,
      correctAnswer,
      questionReference
    } = questionData

    if (questionReference !== "") {
      // group question
      
      // get last item in array
      const lastQuestion = answeredQuestions[answeredQuestions.length - 1]
      
      // if undefined this is the first question
      if (lastQuestion === undefined || lastQuestion.questionReference !== questionReference) {
        // create question group
        console.log("create new group")
        let questionGroupData = {
          questionReference,
          questionType,
          questions: [
            {
              question,
              explanation,
              selectedAnswer,
              correctAnswer
            }
          ]
        }

        setAnsweredQuestions(prev => ([...prev, questionGroupData]))

      } else {
        // check if has questionReference property
        if (lastQuestion.hasOwnProperty("questionReference")) {
          // add the new question in the current question group
          console.log("has reference")
          // update the question group

          // process of updating
          // get the the copy of old answered questions
          const copyOfAnsweredQuestions = answeredQuestions
          const findIndexOfMatchedQuestionGroup = (question) => question.questionReference === questionReference
          const IndexOfMatchedQuestionGroup = copyOfAnsweredQuestions.findIndex(findIndexOfMatchedQuestionGroup)
          const getMatchedQuestionGroup = copyOfAnsweredQuestions[IndexOfMatchedQuestionGroup]
          // insert the new question in the questions property of that object
          const modifiedQuestionGroup = {
            ...getMatchedQuestionGroup,
            questions: [
              ...getMatchedQuestionGroup.questions,
                {
                  question,
                  explanation,
                  selectedAnswer,
                  correctAnswer
                }
            ]
          }
          // delete the old question group in array and
          // insert the updated question group in the index of deleted old question group in array
          copyOfAnsweredQuestions.splice(IndexOfMatchedQuestionGroup, 1, modifiedQuestionGroup)
          
          // insert the modified copy of answered questions
          setAnsweredQuestions(copyOfAnsweredQuestions)
        }
        
      }
    } else {
      // ungroup question
      // add new answered question
      setAnsweredQuestions(prev => (
        [...prev, {
          question,
          questionType,
          explanation,
          selectedAnswer,
          correctAnswer
        }
        ]))
    }
  }

  useEffect(() => {
    const getQuestions = async () => {
      const questionsList = await questionMaker(
        questionCount.value,
        trainingType
      )
      
      setQuestions(questionsList)
      setQuestionsCount(Object.keys(questionsList).length)
    }
    getQuestions()

    return
  }, [])

  const displayQuestion = () => {
    setQuestionNumber(questionNumber + 1)
    // get the first index
    if (questionIndex < questionsCount) {
      const questionData = questions[questionIndex]
      // check if the question type is question group
      if (questionData.hasOwnProperty('referenceType')) {
        // console.log(questionIndex)
        // console.info(questionData)
        // console.log("question group")
        // console.log(questionIndexInQuestionGroup)
        const questionsInGroup = questionData.questions
        const questionsInGroupCount = Object.keys(questionsInGroup).length
        const getAQuestionInGroup = questionsInGroup[questionIndexInQuestionGroup]
        const {
          _id,
          question,
          questionType,
          explanation,
          choices,
          correctAnswer,
          contributor,
        } = getAQuestionInGroup

        const {
          questionReference,
          imageUrlAsReference
        } = questionData

        setQuestionToLayout(prev => ({
          ...prev,
          _id: _id,
          question: question,
          questionType: questionType,
          explanation: explanation,
          choices: choices,
          correctAnswer: correctAnswer,
          contributor: contributor
        }))

        if (questionReference !== "") {
          setQuestionReferenceToLayout(questionReference)
          // console.log(questionReference)
        } else if (imageUrlAsReference !== "") {
          setQuestionReferenceToLayout(imageUrlAsReference)
          // console.log(imageUrlAsReference)
        }
  
        setQuestionIndexInQuestionGroup(questionIndexInQuestionGroup + 1)
        console.log(questionIndexInQuestionGroup)

        // you can't access state value after setting it here
        // you can access it outside this function

        // subtract questionGroupCount by 1 so
        // it will be accurate to compare with the
        // questionIndexInQuestionGroup
        // because this variable doesn't give the updated value
        // after setting the state value here inside this function.

        // check if all of the questions in question group
        // has been displayed by comparing the index of the current question in question group
        // to the total number of questions in question group
        // if true
        // then reset back the question index in question group to 0
        // and add 1 to question index so that it will get
        // clear question reference for question group
        // the next question in question array
        if (questionIndexInQuestionGroup >= questionsInGroupCount - 1) {
          setQuestionIndex(questionIndex + 1)
          setQuestionIndexInQuestionGroup(0)
        } 
      } else {
        setQuestionReferenceToLayout("")
        const {
          _id,
          question,
          questionType,
          explanation,
          choices,
          correctAnswer,
          contributor
        } = questionData

        setQuestionToLayout(prev => ({
          ...prev,
          _id: _id,
          question: question,
          questionType: questionType,
          explanation: explanation,
          choices: choices,
          correctAnswer: correctAnswer,
          contributor: contributor
        }))

        console.log('ungroup  question')
        setQuestionIndex(questionIndex + 1)
      }

      // setQuestionToLayout(questionData)
    } else {
      // end of test
      setIsTestEnd(true)
    }
  }

  return (
    <div>
      <Link to='/quick-test/category-selection'>
        <div>
          <span className='material-symbols-outlined back-icon'>
            arrow_back_ios
          </span>
        </div>
      </Link>
      {/* show question layout when start has been clicked */}

      {/* hide start button when clicked */}
      <div className='flex flex-center'>
        {isTestStart ? (
          isTestEnd? 
            <TrainingResultViewer scoresData={scores} answeredQuestions={answeredQuestions} />
           : <QuestionLayout
              questionData={questionToLayout}
              displayQuestion={displayQuestion}
              scoresData={scores}
              setScores={setScores}
              questionReferenceToLayout={questionReferenceToLayout}
              recordQuestion={recordQuestion}
              questionNumber={questionNumber}
            />
        ) : (
          
            <div className="flex flex-center">
              <div className="flex flex-column flex-center align-center">
              <p style={{textAlign:"center"}}><strong>Tip:</strong> Memorize the concept not the answer.</p>
              <button
                onClick={() => {
                  displayQuestion()
                  setIsTestStart(true)
                }}
                disabled={!questions.length ? true : false}
                className="btn-simple"
              >
                {!questions.length ? 'Loading. . .' : 'Start'}
              </button>
            </div>
            </div>
        )}
      </div>
    </div>
  )
}

export default Questions
