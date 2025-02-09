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
    const total = props.parts.map(part => part.exercises).reduce((accumulator, current) => accumulator + current, 0)
    return (
      <div>
        <b>total of exercises {total}</b>
      </div>
    )
  }

const Course = (props) => {
    const { course } = props
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
  }

export default Course