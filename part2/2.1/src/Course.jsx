const Part = (props) => {
    return (
      <div>
        {props.parts.map(part => <p key={part.id}> {part.name} {part.exercises}</p>)}
      </div>
    )
  }
  
  const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        <Part parts={props.parts}/>
      </div>
    )
  }
  
  const Total = (props) => {
    return (
      <div>
        <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
      </div>
    )
  }

const Course = (props) => {
    const { course } = props
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
        </div>
    )
  }

export default Course