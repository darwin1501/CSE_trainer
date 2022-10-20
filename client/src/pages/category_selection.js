import React from 'react'
import { Link } from 'react-router-dom'
import CategorySelectionStyle from './categorySelectionStyle.module.css'
import { CategorySelectionConsumer } from 'context/categorySelectionContext'
import { useNavigate } from 'react-router-dom'

const CategorySelection = () => {
  const [selections, setSelections] = React.useState({
    numerical: false,
    analytical: false,
    verbal: false,
    philCons: false,
    clerical: false
  })

  const navigate = useNavigate()

  const changeSelection = event => {
    const name = event.target.name
    const value = event.target.checked

    setSelections(prev => ({
      ...prev,
      [name]: value
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
        <CategorySelectionConsumer>
          {data => (
            <form
              onSubmit={() => {
                data.handleSetValue(selections)
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
                    name='numerical'
                    type='checkbox'
                    onChange={changeSelection}
                    checked={selections.numerical}
                  />
                  <span>Numerical</span>
                </label>
                <label className='flex flex-center align-center gap-sm'>
                  <input
                    className='checkbox'
                    name='analytical'
                    type='checkbox'
                    onChange={changeSelection}
                    checked={selections.analytical}
                  />
                  <span>Analytical</span>
                </label>
                <label className='flex flex-center align-center gap-sm'>
                  <input
                    className='checkbox'
                    name='verbal'
                    type='checkbox'
                    onChange={changeSelection}
                    checked={selections.verbal}
                  />
                  <span>Verbal</span>
                </label>
                <label className='flex flex-center align-center gap-sm'>
                  <input
                    className='checkbox'
                    name='philCons'
                    type='checkbox'
                    onChange={changeSelection}
                    checked={selections.philCons}
                  />
                  <span>Philippine Constitution</span>
                </label>
                <label className='flex flex-center align-center gap-sm'>
                  <input
                    className='checkbox'
                    name='clerical'
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
          )}
        </CategorySelectionConsumer>
      </div>
    </div>
  )
}

export default CategorySelection
