import TrainingTypeStyle from './trainingTypeStyle.module.css'
import Card from 'components/Card'
import { Link } from 'react-router-dom'
import backIcon from '../icon/back.svg'
import Footer from 'components/Footer'

function TrainingType () {
  return (
    <div>
      <Link to='/'>
        <div>
          <img className='back_btn' src={backIcon} alt='back button' />
        </div>
      </Link>
      <p className={TrainingTypeStyle.title}>Select Training Type</p>
      <div className={TrainingTypeStyle.cardContainer}>
        <Link to='/quick-test/category-selection'>
          {
            <Card
              title='Quick Test'
              questionCount={'5 questions each category'}
              info='A quick CSE test'
              backgroundColor='#fffad1'
            />
          }
        </Link>
        <Link to='/'>
          {
            <Card
              title='Professional'
              questionCount={300}
              info='Coming soon. . .'
              backgroundColor='#fbe5f3'
            />
          }
        </Link>
        <Link to='/'>
          {
            <Card
              title='Sub Professional'
              questionCount={250}
              info='Coming soon. . .'
              backgroundColor='#ddebf8'
            />
          }
        </Link>
      </div>
      <Footer />
    </div>
  )
}

export default TrainingType
