import React from "react";
import { Link } from "react-router-dom";

const CategorySelection = () => {
    return (
        
        <div>
            <Link to='/trainingtype'>
            <div >
                <span className="material-symbols-outlined">
                    arrow_back_ios
                </span>
            </div>
            </Link>
            <p>Select Categories</p>
        </div>
    )
}

export default CategorySelection