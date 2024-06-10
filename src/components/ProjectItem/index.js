import './index.css'

const ProjectItem = props => {
  const {details} = props
  const {name, imageUrl} = details

  return (
    <li>
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
    </li>
  )
}

export default ProjectItem
