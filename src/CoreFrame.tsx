// A frame that centers all the components.
export function CoreFrame({ children }: any) {
  return (
    <div
      style={{
        display: "flex",
        height: "98vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
}
