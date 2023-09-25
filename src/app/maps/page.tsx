import FormComponent from "@/components/form.comp";
import JSONData from "@/components/jsonData";
import Map from "@/components/maps";

const MapHomePage = () => {
  return (
    <div className="main-container">
      {/* Maps */}
      <Map />
      {/* Side bar */}
      <div className="sub-right-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "25px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Latticrete Marketplace</p>
          <FormComponent />
        </div>
        <hr style={{ marginBottom: "20px" }} />
        <JSONData />
      </div>
    </div>
  );
};

export default MapHomePage;
