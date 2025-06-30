import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Partners = ({ partners }) => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 6 },
    desktop: { breakpoint: { max: 1024, min: 768 }, items: 4 },
    tablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
  };

  return (
    <>
      {partners?.alternateHtml ? (
        <div>
          <pre
            dangerouslySetInnerHTML={{
              __html: partners?.alternateHtml,
            }}
          />
        </div>
      ) : (
        <div
          className="w-100"
          style={{
            backgroundColor: partners?.css?.backgroundColor || undefined,
            borderTop: partners?.css?.borderColor
              ? `0.5px solid ${partners.css.borderColor}`
              : undefined,
            borderBottom: partners?.css?.borderColor
              ? `0.5px solid ${partners.css.borderColor}`
              : undefined,
            boxShadow: partners?.css?.shadowColor
              ? `0 4px 12px ${partners.css.shadowColor}`
              : undefined,
            padding: "10px",
          }}
        >
          <Carousel
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            keyBoardControl={true}
            customTransition="all 1s"
            transitionDuration={1000}
            containerClass="w-100"
            itemClass="d-flex justify-content-center align-items-center "
            removeArrowOnDeviceType={[
              "tablet",
              "mobile",
              "desktop",
              "superLargeDesktop",
            ]}
            dotListClass="custom-dot-list-style"
          >
            {partners?.partners?.map((i) => (
              <div
                key={i}
                className="w-100 d-flex justify-content-center align-items-center"
                style={{ height: "120px" }}
              >
                <a
                  href={i?.url}
                  target={i?.openExternal ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                >
                  <img
                    className="img-fluid w-auto object-fit-cover"
                    style={{ height: "100px", maxHeight: "100px" }}
                    src={i?.imageUrl}
                    alt={i?.url || "logo"}
                  />
                </a>
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </>
  );
};

export default Partners;
