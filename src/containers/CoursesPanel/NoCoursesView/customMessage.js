import React from "react";

const CustomMessage = ({ data }) => {
  return (
    <div>
      {data?.alternateHtml ? (
        <pre
          dangerouslySetInnerHTML={{
            __html: data?.alternateHtml,
          }}
        />
      ) : (
        <div>
          <p
            className="my-0 py-0"
            style={{ fontWeight: "600", fontSize: "24px" }}
          >
            {data?.title}
          </p>
          <p className="my-0 py-0" style={{ fontSize: "14px" }}>
            {data?.p}
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomMessage;
