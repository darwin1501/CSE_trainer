import React from "react";

const TrainingResultViewer = (props) => {
    const {
        mainScore,
        numerical,
        analytical,
        verbal,
        philConstitution,
        clerical }
        = props.scoresData
    return (
        <div className="flex flex-column">
            <p>Your Score: { mainScore }</p>
            <p>Numerical: { numerical }</p>
            <p>Analytical: {analytical}</p>
            <p>Verbal: {verbal}</p>
            <p>Philippine Constitution: {philConstitution}</p>
            <p>Clerical: { clerical }</p>
        </div>
    )
}

export default TrainingResultViewer