import './index.css'

const SimilarJobs = props => {
  const {similarJobs} = props
  const {companyUrl, empType, desc, location, rating, title} = similarJobs
  return (
    <li className="similar-jobs-container">
      <div>
        <div className="s-image-title-rating">
          <img
            className="s-image"
            src={companyUrl}
            alt="similar job company logo"
          />
          <div>
            <h1>{title}</h1>
            <br />
            <p>{rating}</p>
          </div>
        </div>
        <div>
          <h4>Description</h4>
          <p>{desc}</p>
        </div>
        <div className="s-location-emp">
          <p>{location}</p>

          <div>
            <p>{empType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
