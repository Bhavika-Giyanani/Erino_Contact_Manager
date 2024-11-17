import SplashSVG from "./SplashSVG";

const Splash = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <SplashSVG className="tracking-out-expand-fwd-top" />
    </div>
  );
};

export default Splash;
