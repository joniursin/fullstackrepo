const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  const Header = ({ name }: { name: string }) => {
    return <h1>{name}</h1>;
  };

  interface Part {
    name: string;
    exerciseCount: number;
  }

  interface ContentProps {
    parts: Part[];
  }

  const Content = ({ parts }: ContentProps) => {
    return (
      <div>
        {parts.map((part) => (
          <p key={part.name}>
            {part.name} {part.exerciseCount}
          </p>
        ))}
      </div>
    );
  };

  const Total = ({ total }: { total: number }) => {
    return <p>Number of exercises {total}</p>;
  };

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;
