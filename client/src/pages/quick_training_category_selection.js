import React, {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import CategorySelectionStyle from './categorySelectionStyle.module.css'
// import { CategorySelectionConsumer } from 'context/categorySelectionContext'
import { selectionContext } from 'context/categorySelectionContext'
import { useNavigate } from 'react-router-dom'
import backIcon from "../icon/back.svg"
import Footer from 'components/Footer'


const CategorySelection = () => {

  let questionCount = 5
  const categorySelection = useContext(selectionContext)
  const [selections, setSelections] = useState({
    numericalCount: 0,
    analyticalCount: 0,
    verbalCount: 0,
    philConsCount: 0,
    clericalCount: 0
  })
  const [isNextShowed, setIsNextShowed] = useState(false) 

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

  useEffect(() => {
    checkSelections()
  },[selections])

  function checkSelections() {
    let selectionCount = 0
    Object.values(selections).forEach(val => selectionCount += val);
  
    if (selectionCount === 0) {
      setIsNextShowed(false)
    } else {
      setIsNextShowed(true)
    }
  }

  

  return (
    <div style={{paddingBottom: "250px"}}>
      <Link to='/trainingtype'>
      <div >
          <img className="back_btn" src={backIcon} alt="back button"/>
      </div>
      </Link>
      <div className={`${CategorySelectionStyle.cardContainer} shadow-sm`}>
        <p className={CategorySelectionStyle.title}>Select Categories</p>
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
          {isNextShowed && <button className="btn-simple">Next</button>}
            </div>
          </form>
      </div>
      <Footer />
    </div>
  )
}

export default CategorySelection
