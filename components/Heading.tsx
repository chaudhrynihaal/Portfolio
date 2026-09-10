export default function Heading({ first, second }: { first: string; second: string }) {
  return (
    <h2 className="display">
      {first}
      <span>{second}</span>
    </h2>
  );
}
