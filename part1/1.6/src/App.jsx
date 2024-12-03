import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const FeedbackAmount = ({text, amount}) => <div>{text} {amount}</div>

const Total = ({good, neutral, bad}) => <div>all {good + neutral + bad}</div>

const Average = ({good, neutral, bad}) => <div>average {(good - bad) / (good + neutral + bad)}</div>

const PositivePercentage = ({good, neutral, bad}) => <div>positive {((good) / (good + neutral + bad))*100} %</div>

const Statistics = ({good, neutral, bad}) => {
  if (good != 0 || neutral != 0 || bad != 0) {
    return (
      <div>
        <FeedbackAmount text={"good"} amount={good} />
        <FeedbackAmount text={"neutral"} amount={neutral} />
        <FeedbackAmount text={"bad"} amount={bad} />
        <Total good={good} neutral={neutral} bad={bad} />
        <Average good={good} neutral={neutral} bad={bad} />
        <PositivePercentage good={good} neutral={neutral} bad={bad} />
      </div>
      )
  }
  return (
    <div>No feedback given</div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App