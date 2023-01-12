import {Component} from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import EmpType from '../EmpType'
import JobsContainer from '../JobsContainer'
import SalaryRange from '../SalaryRange'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobsList: [],

    joinginEmplyes: [],
    salary: '',
    jobSearch: '',
    profileDetails: '',
    profileLoadingStatus: false,
    profileApiUrlFailure: true,
    jobsStatus: false,
    jobsApiFailure: true,
  }

  componentDidMount() {
    this.apicallingToAllJobs()
    this.profileApiUrl()
  }

  basedOnEmpType = async empType => {
    //   this.instantUpdation(empType)
    const {joinginEmplyes} = this.state

    if (joinginEmplyes.includes(empType)) {
      const filterEpmData = joinginEmplyes.filter(
        eachItem => eachItem !== empType,
      )
      this.setState(
        {
          joinginEmplyes: [...filterEpmData],
          jobsStatus: false,
        },
        this.apicallingToAllJobs,
      )
    } else {
      this.setState(
        {
          joinginEmplyes: [...joinginEmplyes, empType],
          jobsStatus: false,
        },
        this.apicallingToAllJobs,
      )
    }
  }

  apicallingToAllJobs = async () => {
    const {joinginEmplyes, salary, jobSearch} = this.state

    const employeSelect = joinginEmplyes.join(',')

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs?employment_type=${employeSelect}&minimum_package=${salary}&search=${jobSearch}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const data = await fetch(url, options)
    console.log(data)
    if (data.ok === true) {
      const jsondata = await data.json()
      const camelCasedData = jsondata.jobs.map(eachJob => ({
        cmpUrl: eachJob.company_logo_url,

        empType: eachJob.employment_type,

        id: eachJob.id,

        jobDes: eachJob.job_description,
        location: eachJob.location,

        pack: eachJob.package_per_annum,

        rating: eachJob.rating,

        title: eachJob.title,
      }))

      this.setState({jobsList: camelCasedData, jobsStatus: true})
    } else {
      console.log('is executed')
      this.setState({jobsApiFailure: false, jobsStatus: true})
    }
  }

  profileApiUrl = async () => {
    console.log('profile api url is called')
    const cookiesToken = Cookies.get('jwt_token')
    console.log(cookiesToken)
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${cookiesToken}`,
      },
    }
    const userProfileApi = await fetch(url, options)
    console.log(userProfileApi)
    if (userProfileApi.ok === true) {
      //   const userProfile=await userProfileApi
      const userprofileParsedData = await userProfileApi.json()
      console.log(userprofileParsedData)
      const pfDetails = userprofileParsedData.profile_details
      const jsProfile = {
        name: pfDetails.name,
        pfImage: pfDetails.profile_image_url,
        shortBio: pfDetails.short_bio,
      }
      console.log(jsProfile)
      this.setState({profileDetails: jsProfile, profileLoadingStatus: true})
    } else {
      // this.profileApiFailure()
      this.setState({profileApiUrlFailure: false, profileLoadingStatus: true})
    }
  }

  accordingToSalaryRange = salaryRange => {
    this.setState(
      {salary: salaryRange, jobsStatus: false},
      this.apicallingToAllJobs,
    )
    console.log(salaryRange)
  }

  searchJobs = event => {
    console.log(event.target.value)
    this.setState({jobSearch: event.target.value})
  }

  onSearchIcon = () => {
    console.log('iam triggered')

    this.apicallingToAllJobs()
    this.setState({jobsStatus: false})
  }

  loaderElement = () => (
    <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
  )

  retryProfileApi = () => {
    this.setState({profileLoadingStatus: false})
    this.profileApiUrl()
  }

  retryJobsApi = () => {
    this.setState({jobsStatus: false})
    this.apicallingToAllJobs()
  }

  profileApiFailure = () => (
    <div className="retry-name">
      <button type="button" onClick={this.retryProfileApi}>
        Retry
      </button>
    </div>
  )

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

  noJobsFound = () => (
    <div className="job-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  render() {
    const {
      jobsList,
      profileDetails,
      profileLoadingStatus,
      profileApiUrlFailure,
      jobsStatus,
      jobsApiFailure,
    } = this.state
    console.log(jobsList)
    console.log(jobsList.length)
    const len = jobsList.length
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div>
        <Header />
        <div className="jobs-container">
          <div className="empTypeContainer">
            {profileLoadingStatus ? (
              <div>
                {profileApiUrlFailure ? (
                  <div className="pf-bg-container">
                    <img src={profileDetails.pfImage} alt="profile" />
                    <h1>{profileDetails.name}</h1>
                    <p>{profileDetails.shortBio}</p>
                  </div>
                ) : (
                  this.profileApiFailure()
                )}
              </div>
            ) : (
              <div className="loader-container" data-testid="loader">
                {this.loaderElement()}
              </div>
            )}
            <div className="hr-line">
              <hr />
            </div>
            <h1 className="type-of-EMP">Type of Employment</h1>
            <div>
              <ul className="ul-emp-type">
                {employmentTypesList.map(eachEmp => (
                  <EmpType
                    basedOnEmpType={this.basedOnEmpType}
                    key={eachEmp.employmentTypeId}
                    empType={eachEmp}
                  />
                ))}
              </ul>
            </div>
            <div className="hr-line">
              <hr />
            </div>
            <div>
              <h1 className="type-of-EMP">Salary Range</h1>

              <ul className="ul-emp-type">
                {salaryRangesList.map(eachRange => (
                  <SalaryRange
                    eachRange={eachRange}
                    key={eachRange.salaryRangeId}
                    accordingToSalaryRange={this.accordingToSalaryRange}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="each-job-container">
            <div className="input-element">
              <input
                className="input-filed"
                type="search"
                onChange={this.searchJobs}
                placeholder="Search"
              />
              <button
                type="button"
                onClick={this.onSearchIcon}
                data-testid="searchButton"
              >
                <AiOutlineSearch
                  className="search-icon"
                
                />
              </button>
            </div>
            {jobsStatus ? (
              <div>
                {jobsApiFailure ? (
                  <div>
                    {len > 0 ? (
                      <ul className="jobs-ul-container">
                        {jobsList.map(eachJob => (
                          <JobsContainer eachJob={eachJob} key={eachJob.id} />
                        ))}
                      </ul>
                    ) : (
                      this.noJobsFound()
                    )}
                  </div>
                ) : (
                  this.jobsFailureView()
                )}
              </div>
            ) : (
              <div className="loader-container" data-testid="loader">
                {this.loaderElement()}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Jobs)
