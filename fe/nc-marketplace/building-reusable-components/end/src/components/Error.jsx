const Error = ({ error }) => {
  return (
    <div className="error-display">
      <h2>Houston we have a problem!</h2>
      <p>An error occurred while trying to fetch data:</p>
      <pre>
        {error.status} {error.statusText}
      </pre>
    </div>
  );
};

export default Error;
