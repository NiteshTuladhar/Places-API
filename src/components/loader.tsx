const Loader = ({ Loader, desc }: any) => {
  return (
    <div className="loader-spin">
      <Loader height="80" width="80" color="green" ariaLabel="loading" />
      <p style={{ marginTop: "15px" }}>{desc}</p>
    </div>
  );
};

export default Loader;
