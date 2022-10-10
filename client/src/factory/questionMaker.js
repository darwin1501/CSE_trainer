// returns an array of questions
const questionMaker = async (categories, trainingType) => {
  const questions = []
  const { numerical, analytical, verbal, philCons, clerical } = categories

  const getQuestions = async (category, questionLimit) => {
    // counter that decides wether to add question grou or not
    const mixWithQuestionGroup = 1
    // get questions and push it to question array
    const getUngroupQuestions = async (category, questionLimit) => {
      const response = await fetch(
        `http://localhost:5000/questions/get/${category}/${questionLimit}`
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
        `http://localhost:5000/question-groups/get/${category}`
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
      getUngroupQuestions(category, questionLimit)
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
      let questionGroupLimit = 0

      // assign ungroup question limit and question group limit
      const assignQuestionLimit = questionLimit => {
        ungroupQuestionLimit = Math.floor(Math.random() * questionLimit) + 1
        questionGroupLimit = Math.abs(ungroupQuestionLimit - questionLimit)
      }

      assignQuestionLimit(questionLimit)

      console.log(`ungroup limit: ${ungroupQuestionLimit}`)
      console.log(`question group limit: ${questionGroupLimit}`)

      // add some question group
      shuffledQuestionGroup.forEach(group => {
        const questionCount = Object.keys(group.questions).length
        if (questionCount <= questionGroupLimit) {
          // check if question group is still posible to add to questions array
          // by checking its question count if it reaches the limit if added
          const questionCountWhenQuestionGroupAdded = questionGroupAdded + questionCount

          if (questionCountWhenQuestionGroupAdded > questionGroupLimit) {
            console.log('question count limit exeeded')
          } else {
            questionGroupAdded += questionCount

            questions.push(group)
          }
        }
        // if question group is equal or less than to question limit
        // push to question
        // else don't push
      })

      // add some ungroup question
      await getUngroupQuestions(category, ungroupQuestionLimit)
    }
  }

  if (trainingType === 'quickTraining') {
    if (numerical) {
      getQuestions('Numerical', 3)
    }
    if (analytical) {
      getQuestions('Analytical', 3)
    }
    if (verbal) {
      getQuestions('Verbal', 3)
    }
    if (philCons) {
      getQuestions('Philippine Constitution', 3)
    }
    if (clerical) {
      getQuestions('Clerical', 3)
    }
  }

  console.log(questions)
}

export default questionMaker
