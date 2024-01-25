const ShowList = (props) => {
  const tvList = props.tvList;
  return (
    <section>
      <ul>
        {tvList.map((tvShow) => {
          return <li key={tvShow.showName}>{tvShow.showName}</li>;
        })}
      </ul>
    </section>
  );
};

export default ShowList;
