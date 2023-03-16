import { Helmet } from "react-helmet-async";

const App = (props: any) => {
  return (
    <>
      <Helmet>
        <title>Goodbye World</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <h1>Hello ss World</h1>
    </>
  );
};

export default App;
