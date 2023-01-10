import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Skill from '../Skill'
import SimilarJobs from '../SimilarJobs'
import './index.css'

class JobItemDetails extends Component {
  state = {
    eachJobDetails: '',
    skills: [],
    lifeAtCompany: '',
    similarJobsList: [],
    isLoading: false,
    jobsFailureViewStatus: false,
  }

  componentDidMount() {
    this.eachJobDetails()
  }

  eachJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const jsonData = await fetch(url, options)
    //   console.log(jsonData)

    if (jsonData.ok === true) {
      const jsData = await jsonData.json()
      //  console.log(jsData)
      const simiLarJobsJson = jsData.similar_jobs
      //  console.log(simiLarJobsJson)
      const similarJobs = simiLarJobsJson.map(eachItem => ({
        companyUrl: eachItem.company_logo_url,
        empType: eachItem.employment_type,
        id: eachItem.id,
        desc: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      //  console.log(similarJobs)
      const jobDetails = jsData.job_details
      //  console.log(jobDetails)
      const eachJobDetails = {
        companyUrl: jobDetails.company_logo_url,
        compabyWebsite: jobDetails.company_website_url,
        empType: jobDetails.employment_type,
        id: jobDetails.id,
        desc: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
      }
      //    console.log(eachJobDetails)

      const skillsList = jobDetails.skills.map(eachSkill => ({
        skillImage: eachSkill.image_url,
        name: eachSkill.name,
      }))
      console.log(skillsList)
      const lifeAtCompany = {
        des: jobDetails.life_at_company.description,
        imageUrl: jobDetails.life_at_company.image_url,
      }
      this.setState({
        eachJobDetails,
        skills: skillsList,
        lifeAtCompany,
        similarJobsList: similarJobs,
        isLoading: true,
      })
    } else {
      //    console.log('ffhhg')
      this.setState({isLoading: true, jobsFailureViewStatus: true})
    }
  }

  retryJobsApi = () => {
    this.setState({isLoading: false})
    this.eachJobDetails()
  }

  jobsFailureView = () => (
    <div className="job-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.retryJobsApi}>
        Retry
      </button>
    </div>
  )

  render() {
    // console.log(this.props)
    const {
      eachJobDetails,
      skills,
      lifeAtCompany,
      similarJobsList,
      isLoading,
      jobsFailureViewStatus,
    } = this.state
    console.log(similarJobsList)
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="jobitemdetails-container">
        <Header />

        {isLoading ? (
          <div>
            {jobsFailureViewStatus ? (
              this.jobsFailureView()
            ) : (
              <div>
                <div className="jobs-items-bg-container">
                  <div>
                    <div className="j-image-title-rating">
                      <img
                        className="j-image"
                        src={eachJobDetails.companyUrl}
                        alt="job details company logo"
                        key="title"
                      />
                      <div className="j-title-rating">
                        <p key="title">{eachJobDetails.title}</p>
                        <div>
                          <p>{eachJobDetails.rating}</p>
                        </div>
                      </div>
                    </div>
                    <div className="j-location-empType-package">
                      <div className="j-location-emp">
                        <p>{eachJobDetails.location}</p>
                        <div className="j-emp">
                          <p>{eachJobDetails.empType}</p>
                        </div>
                      </div>
                      <div>
                        <p>{eachJobDetails.packagePerAnnum}</p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div>
                    <div className="des">
                      <h1>Description</h1>

                      <a
                        href={eachJobDetails.compabyWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit
                      </a>
                    </div>
                    <p>{eachJobDetails.desc}</p>
                  </div>
                  <div>
                    <h1>Skills</h1>

                    <ul className="ul-skills">
                      {skills.map(eachSkill => (
                        <Skill eachSkill={eachSkill} key={eachSkill.name} />
                      ))}
                    </ul>
                  </div>

                  <h1>Life At Company</h1>

                  <div className="life-at-company">
                    <p className="des-p">{lifeAtCompany.des}</p>
                    <img
                      src={lifeAtCompany.imageUrl}
                      className="life-image "
                      alt="life at company"
                    />
                  </div>
                </div>
                <div className="similar-job-container">
                  <h1>Similar Jobs</h1>

                  <ul className="ul-skills ">
                    {similarJobsList.map(eachSkill => (
                      <SimilarJobs similarJobs={eachSkill} key={eachSkill.id} />
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="loader-container" data-test-id="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )}
      </div>
    )
  }
}
export default JobItemDetails
