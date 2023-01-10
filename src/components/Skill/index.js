import './index.css'

const Skill = props => {
  const {eachSkill} = props
  const {skillImage, name} = eachSkill
  return (
    <li className="each-skill">
      <div className="each-skill-name">
        <img className="each-skill-image" src={skillImage} alt={name} />
        <span className="skill-name">{name}</span>
      </div>
    </li>
  )
}
export default Skill
