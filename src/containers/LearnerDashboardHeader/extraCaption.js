import React from "react";

const ExtraCaption = ({ customization }) => {
  return (
    <div className="w-100">
      {customization?.data?.extraCaption?.alternateHtml ? (
        <pre>{customization?.data?.extraCaption?.alternateHtml}</pre>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center flex-column text-center p-5"
          style={{
            backgroundColor:
              customization?.data?.extraCaption?.css?.backgroundColor || "#FAFAFA",
            border: customization?.data?.extraCaption?.css?.borderColor
              ? `1px solid ${customization.data.extraCaption.css.borderColor}`
              : "",
            boxShadow: customization?.data?.extraCaption?.css?.shadowColor
              ? `0px 4px 10px ${customization.data.extraCaption.css.shadowColor}`
              : "",
          }}
        >
          <h2
            className="course-list-title m-0"
            style={{
              color: customization?.data?.extraCaption?.css?.titleColor,
            }}
          >
            {customization?.data?.extraCaption?.title || "My Courses"}
          </h2>
          <h5
            style={{
              color: customization?.data?.extraCaption?.css?.paragraphColor,
            }}
            className="m-0"
          >
            {customization?.data?.extraCaption?.p || ""}
          </h5>
        </div>
      )}
    </div>
  );
};

export default ExtraCaption;
