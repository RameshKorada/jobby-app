const SalaryRange = props => {
  const {eachRange, accordingToSalaryRange} = props
  const {salaryRangeId, label} = eachRange
  const salaryRangeSeleted = event => {
    //  console.log(event.target.value)
    accordingToSalaryRange(event.target.value)
  }
  return (
    <li>
      <input
        onChange={salaryRangeSeleted}
        type="radio"
        id={salaryRangeId}
        name="salaryrange"
        value={salaryRangeId}
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}
export default SalaryRange
