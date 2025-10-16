export function ToyLoader() {
  const cubes = ["A", "B", "C", "D"];

  return (
    <div className="toy-loader-cubes">
      {cubes.map((letter, i) => (
        <div key={i} className={`cube cube-${i + 1}`}>
          <span>{letter}</span>
        </div>
      ))}
    </div>
  );
}