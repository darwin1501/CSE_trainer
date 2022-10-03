import CardStyle from 'components/CardStyle.module.css'

function Card(props) {
    return(
        <div className={CardStyle.card}>
        <p className={CardStyle.title}>{props.title}</p>
        <p className={CardStyle.textQCount}><strong>Questions:</strong> {props.questionCount}</p>
        <p className={CardStyle.info}>{props.info}</p>
        </div>
    )
}

export default Card