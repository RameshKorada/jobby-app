const EmpType = props => {
  const {empType, basedOnEmpType} = props
  const {label, employmentTypeId} = empType

  const onEmpChange = event => {
    basedOnEmpType(event.target.value)
  }

  return (
    <li>
      <input
        type="checkbox"
        id={employmentTypeId}
        value={employmentTypeId}
        onChange={onEmpChange}
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}

export default EmpType
