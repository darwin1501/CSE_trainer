import TrainingTypeStyle from "./trainingTypeStyle.module.css"
import Card from "components/Card"
import { Link } from "react-router-dom";

function TrainingType(){
    return (
        <div>
            <Link to='/'>
            <div>
                <span className="material-symbols-outlined back-icon">
                    arrow_back_ios
                </span>
            </div>
            </Link>
            <p className={TrainingTypeStyle.title}>Select Training Type</p>
            <div className={TrainingTypeStyle.cardContainer}>
                <Link to="/quick-test/category-selection">
                    {<Card 
                        title="Quick Test" 
                        questionCount={"5 questions each category"} 
                        info="A quick CSE test"
                        backgroundColor = "#fffad1"
                    />}
                </Link>
                
                {<Card 
                    title="Professional" 
                    questionCount={300} 
                    info="Coming soon. . ."
                    backgroundColor = "#fbe5f3"
                />}
                {<Card 
                    title="Sub Professional" 
                    questionCount={250} 
                    info="Coming soon. . ."
                    backgroundColor = "#ddebf8"
                    />}
            </div>
       </div>
    )
}

export default TrainingType