import {AiFillStar} from 'react-icons/ai'
import {ImLocation2} from 'react-icons/im'
import {TiShoppingBag} from 'react-icons/ti'
import {Link} from 'react-router-dom'
import './index.css'

const JobsContainer = props => {
  const {eachJob} = props
  const {empType, title, cmpUrl, jobDes, location, pack, rating, id} = eachJob

  return (
    <li className="each-job-container-element">
      <Link to={`jobs/${id}`} className="link-style">
        <div>
          <div className="image-title-rating">
            <div className="cmp-url">
              <img className="cmp-url" src={cmpUrl} alt="company logo" />
            </div>
            <div className="title-star">
              <h1>{title}</h1>
              <AiFillStar className="star-color" /> <p>{rating}</p>
            </div>
          </div>
          <div className="location-emp-pack">
            <div className="loc-emp">
              <div>
                <ImLocation2 className="location-icon" />
                <p className="empType-element ">{location}</p>
              </div>
              <div>
                <TiShoppingBag />
                <p>{empType}</p>
              </div>
            </div>
            <div>{pack}</div>
          </div>
          <hr />
          <div>
            <h1>Description</h1>
            <p>{jobDes}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default JobsContainer
