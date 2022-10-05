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
                <Link to="/category-selection">
                    {<Card 
                        title="Quick Test" 
                        questionCount={"5 questions each category"} 
                        info="A quick CSE test"
                    />}
                </Link>
                
                {<Card 
                    title="Professional" 
                    questionCount={300} 
                    info="Coming soon. . ."
                />}
                {<Card 
                    title="Sub Professional" 
                    questionCount={250} 
                    info="Coming soon. . ."
                    />}
            </div>
       </div>
    )
}

export default TrainingType