
import LandingStyle from "./landingStyle.module.css"
import { Link } from "react-router-dom"

function Landing(){
    return(
        <div className={LandingStyle.container}>
            <p className={LandingStyle.title}>CSE Trainer</p>
            <p className={LandingStyle.info}>Test your Civil Service
knowledge with thousands of questions for you to answer.</p>
            <div className={LandingStyle.btnContainer}>
                <Link to="/trainingtype">
                    <button className={LandingStyle.btn}>
                        Start Training
                    </button>
                </Link>
            </div>
            <footer>
                <p>Created by: <strong>Darwin</strong></p>
            </footer>
        </div>
    )
}

export default Landing