export const Alert = ({ message }) => {
  return (
    message && (
      <div
        style={{
          background: "#ffcc00",
          padding: "10px",
          borderRadius: "5px",
          margin: "0 auto 0 auto",
          textAlign: "center",
          fontWeight: "bold",
          position: "absolute",
          zIndex: 10,
        }}
      >
        {message}
      </div>
    )
  );
};
