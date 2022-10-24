import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import CategorySelectionStyle from './categorySelectionStyle.module.css'
// import { CategorySelectionConsumer } from 'context/categorySelectionContext'
import { selectionContext } from 'context/categorySelectionContext'
import { useNavigate } from 'react-router-dom'


const CategorySelection = () => {

  let questionCount = 5
  const categorySelection = useContext(selectionContext)
  const [selections, setSelections] = React.useState({
    numericalCount: 0,
    analyticalCount: 0,
    verbalCount: 0,
    philConsCount: 0,
    clericalCount: 0
  })

  const navigate = useNavigate()
  
  const changeSelection = event => {
    const name = event.target.name
    const value = event.target.checked

    if (value === false) {
      questionCount = 0
    }

    setSelections(prev => ({
      ...prev,
      [name]: questionCount
    }))
  }

  return (
    <div>
      <Link to='/trainingtype'>
        <div>
          <span className='material-symbols-outlined back-icon'>
            arrow_back_ios
          </span>
        </div>
      </Link>
      <div className={CategorySelectionStyle.cardContainer}>
        <p style={{ textAlign: 'center' }}>Select Categories</p>
          <form
            onSubmit={() => {
              categorySelection.handleSetValue(selections)
              navigate(`/questions/${"quickTraining"}`)
            }}
          >
            <div
              className='flex flex-column flex-center align-left gap-md'
              style={{ marginTop: '40px' }}
            >
              <label className='flex flex-center align-center gap-sm'>
                <input
                  className='checkbox'
                  name='numericalCount'
                  type='checkbox'
                  onChange={changeSelection}
                  checked={selections.numerical}
                />
                <span>Numerical</span>
              </label>
              <label className='flex flex-center align-center gap-sm'>
                <input
                  className='checkbox'
                  name='analyticalCount'
                  type='checkbox'
                  onChange={changeSelection}
                  checked={selections.analytical}
                />
                <span>Analytical</span>
              </label>
              <label className='flex flex-center align-center gap-sm'>
                <input
                  className='checkbox'
                  name='verbalCount'
                  type='checkbox'
                  onChange={changeSelection}
                  checked={selections.verbal}
                />
                <span>Verbal</span>
              </label>
              <label className='flex flex-center align-center gap-sm'>
                <input
                  className='checkbox'
                  name='philConsCount'
                  type='checkbox'
                  onChange={changeSelection}
                  checked={selections.philCons}
                />
                <span>Philippine Constitution</span>
              </label>
              <label className='flex flex-center align-center gap-sm'>
                <input
                  className='checkbox'
                  name='clericalCount'
                  type='checkbox'
                  onChange={changeSelection}
                  checked={selections.clerical}
                />
                <span>Clerical</span>
              </label>
            </div>
            <div className='flex flex-center' style={{ marginTop: '40px' }}>
              <button style={{ padding: '10px' }}>Start Quiz</button>
            </div>
          </form>
      </div>
    </div>
  )
}

export default CategorySelection
