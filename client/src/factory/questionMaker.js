const PORT = 3080
const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://cse-questions-api.onrender.com'
    : `http://localhost:${PORT}`
// returns an array of questions
const questionMaker = async (questionCountOnEachCategories, trainingType) => {
  const questions = []
  const {
    numericalCount,
    analyticalCount,
    verbalCount,
    philConsCount,
    clericalCount
  } = questionCountOnEachCategories

  const getQuestions = async (category, questionLimit) => {
    // counter that decides wether to add question group or not
    const mixWithQuestionGroup = 1
    // get questions and push it to question array
    const getUngroupQuestions = async (category, questionLimit) => {
      const response = await fetch(
        `${baseURL}/questions/get/${category}/${questionLimit}`
      )
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`
        window.alert(message)
        return
      }

      const result = await response.json()

      result.forEach(questionData => {
        questions.push(questionData)
      })
    }
    // returns an array of question group
    const getQuestionGroup = async category => {
      const response = await fetch(
        `${baseURL}/question-groups/get/${category}`
      )
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`
        window.alert(message)
        return
      }

      const result = await response.json()

      return result
    }

    if (mixWithQuestionGroup === 0) {
      await getUngroupQuestions(category, questionLimit)
    } else if (mixWithQuestionGroup === 1) {
      const questionGroup = await getQuestionGroup(category)
      const shuffle = sourceArray => {
        for (var i = 0; i < sourceArray.length - 1; i++) {
          var j = i + Math.floor(Math.random() * (sourceArray.length - i))

          var temp = sourceArray[j]
          sourceArray[j] = sourceArray[i]
          sourceArray[i] = temp
        }
        return sourceArray
      }
      const shuffledQuestionGroup = shuffle(questionGroup)
      let questionGroupAdded = 0
      let ungroupQuestionLimit = 0
      let questionGroupQuestionsLimit = 0

      // assign ungroup question limit and question group limit
      const assignQuestionLimit = questionLimit => {
        ungroupQuestionLimit = Math.floor(Math.random() * questionLimit) + 1
        questionGroupQuestionsLimit = Math.abs(
          ungroupQuestionLimit - questionLimit
        )
      }

      assignQuestionLimit(questionLimit)

      // console.log(`ungroup limit: ${ungroupQuestionLimit}`)
      // console.log(`question group limit: ${questionGroupQuestionsLimit}`)

      // add some question group
      shuffledQuestionGroup.forEach(group => {
        const questionCount = Object.keys(group.questions).length
        if (questionCount <= questionGroupQuestionsLimit) {
          const questionCountWhenQuestionGroupAdded =
            questionGroupAdded + questionCount
          // check if question group is still posible to add to questions array
          // by checking its question count if it reaches the limit when added
          if (
            questionCountWhenQuestionGroupAdded > questionGroupQuestionsLimit
          ) {
            console.log('question count limit exeeded')
          } else {
            questionGroupAdded += questionCount

            questions.push(group)
          }
        }
      })

      //if question group is 0 or question group questions added in questions array is than the question group questions limit
      if (
        Object.keys(questionGroup).length === 0 ||
        questionGroupAdded < questionGroupQuestionsLimit
      ) {
        // add the remaining question group limit to ungroup question limit
        ungroupQuestionLimit += questionGroupQuestionsLimit
      }

      // add some ungroup question in questions array
      await getUngroupQuestions(category, ungroupQuestionLimit)
    }
  }

  if (trainingType === 'quickTraining') {
    if (numericalCount > 0) {
      await getQuestions('Numerical', numericalCount)
    }
    if (analyticalCount > 0) {
      await getQuestions('Analytical', analyticalCount)
    }
    if (verbalCount > 0) {
      await getQuestions('Verbal', verbalCount)
    }
    if (philConsCount > 0) {
      await getQuestions('Philippine Constitution', philConsCount)
    }
    if (clericalCount > 0) {
      await getQuestions('Clerical', clericalCount)
    }
  }

  return questions
}

export default questionMaker
