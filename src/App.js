import './App.css'

import Loader from 'react-loader-spinner'
import {Component} from 'react'
import ProjectItem from './components/ProjectItem'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class App extends Component {
  state = {
    activeOption: categoriesList[0].id,
    apiStatus: '',
    projectData: [],
  }

  componentDidMount() {
    this.getProjectData()
  }

  getProjectData = async () => {
    this.setState({apiStatus: 'LOADING'})

    const {activeOption} = this.state

    const url = `https://apis.ccbp.in/ps/projects?category=${activeOption}`

    console.log(url)

    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()

      const updatedData = data.projects.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        imageUrl: eachItem.image_url,
      }))
      this.setState({apiStatus: 'SUCCESS', projectData: updatedData})
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  getOptionId = event => {
    this.setState({activeOption: event.target.value}, this.getProjectData)
  }

  renderSuccessView = () => {
    const {projectData} = this.state

    return (
      <ul>
        {projectData.map(eachItem => (
          <ProjectItem details={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the you are looking for</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getProjectData}
      >
        Retry
      </button>
    </div>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return this.renderLoadingView()
    }
  }

  render() {
    return (
      <div className="project-page-container">
        <nav className="nav-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="logo"
          />
        </nav>
        <select className="select-option-container" onChange={this.getOptionId}>
          {categoriesList.map(each => (
            <option key={each.id} value={each.id}>
              {each.displayText}
            </option>
          ))}
        </select>
        {this.renderApiStatus()}
      </div>
    )
  }
}

export default App
