import React from "react";
import { Link } from "react-router-dom";
import { CategorySelectionConsumer } from "context/categorySelectionContext";
import { useParams } from "react-router-dom";
import questionMaker from "factory/questionMaker";


const Questions = () => {
    const { trainingType } = useParams()
    
    return (
        <div>
            <Link to='/quick-test/category-selection'>
                <div>
                    <span className="material-symbols-outlined back-icon">
                        arrow_back_ios
                    </span>
                </div>
            </Link>
            <h1>This is question page</h1>
            <CategorySelectionConsumer>
                {data => {
                    // console.log(data.value)
                    questionMaker(data.value, trainingType)
                } }
            </CategorySelectionConsumer>
        </div>
    )
}

export default Questions