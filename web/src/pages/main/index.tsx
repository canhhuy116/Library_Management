import { useCounter } from '@/hooks/useCounter';

const Main = () => {
  const { count, increment } = useCounter();

  return (
    <>
      <h2 className="test">Hello Vite + React!</h2>
      <button type="button" onClick={increment}>
        count is: {count}
      </button>
    </>
  );
};

export default Main;
