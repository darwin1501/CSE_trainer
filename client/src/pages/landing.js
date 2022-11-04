
import LandingStyle from "./landingStyle.module.css"
import { Link } from "react-router-dom"
import Footer from "components/Footer"

function Landing(){
    return(
        <div className={LandingStyle.container}>
            <p className={LandingStyle.title}>CSE Trainer</p>
            <p className={LandingStyle.info}>
                A simple CSE test generator that creates a test result summary at the end.
            </p>
            <div className={LandingStyle.btnContainer}>
                <Link to="/trainingtype">
                    <button className="btn-purple">
                        Start Training
                    </button>
                </Link>
            </div>
            <Footer />
        </div>
    )
}

export default Landing