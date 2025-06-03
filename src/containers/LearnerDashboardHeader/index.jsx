import React, { useEffect, useState } from "react";

import MasqueradeBar from "containers/MasqueradeBar";
import { AppContext } from "@edx/frontend-platform/react";
import Header from "@edx/frontend-component-header";
import { reduxHooks } from "hooks";
import urls from "data/services/lms/urls";

import ConfirmEmailBanner from "./ConfirmEmailBanner";

import { useLearnerDashboardHeaderMenu, findCoursesNavClicked } from "./hooks";

import "./index.scss";
import { useAppContext } from "../../../context";
import Partners from "./partners";
import ExtraCaption from "./extraCaption";

export const LearnerDashboardHeader = () => {
  const { authenticatedUser } = React.useContext(AppContext);
  const { courseSearchUrl } = reduxHooks.usePlatformSettingsData();

  const exploreCoursesClick = () => {
    findCoursesNavClicked(urls.baseAppUrl(courseSearchUrl));
  };

  const learnerHomeHeaderMenu = useLearnerDashboardHeaderMenu({
    courseSearchUrl,
    authenticatedUser,
    exploreCoursesClick,
  });
  const { customization, multiTenancyloading } = useAppContext();

  const [colors, setColors] = useState({
    activeColor: customization?.INDIGO_PRIMARY_COLOR,
    activeHoverColor: customization?.INDIGO_PRIMARY_COLOR,
    hoverColor: customization?.INDIGO_PRIMARY_COLOR,
  });

  useEffect(() => {
    if (customization) {
      setColors({
        activeColor: customization.INDIGO_PRIMARY_COLOR,
        activeHoverColor: customization.INDIGO_PRIMARY_COLOR,
        hoverColor: customization.INDIGO_PRIMARY_COLOR,
      });
    }
  }, [customization]);

  return (
    <>
      {multiTenancyloading ? (
        <div>loading ...</div>
      ) : (
        <>
          <ConfirmEmailBanner />
          <div
            style={{
              "--active-bg": colors?.activeColor,
              "--active-hover-bg": colors?.activeHoverColor,
              "--hover-bg": colors?.hoverColor,
            }}
          >
            <Header
              mainMenuItems={learnerHomeHeaderMenu.mainMenu}
              secondaryMenuItems={learnerHomeHeaderMenu.secondaryMenu}
              userMenuItems={learnerHomeHeaderMenu.userMenu}
            />
            {customization?.data?.bannerImage && (
              <div
                className="w-100 d-flex justify-content-center align-items-center"
                style={{
                  height: "550px",
                  backgroundImage: `url(${process.env.tanancy}/${customization?.data?.bannerImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {customization?.data?.banner?.alternateHtml ? (
                  <pre className="text-white">
                    {customization?.data?.banner?.alternateHtml}
                  </pre>
                ) : (
                  <div className="flex flex-col gap-y-0 p-0 p-5 text-white text-center">
                    <p className="fw-bold display-1 mb-2  p-0">
                      {customization?.data?.banner?.title}
                    </p>
                    <p
                      className="fw-semibold  mb-0  p-0"
                      style={{ fontSize: "24px" }}
                    >
                      {customization?.data?.banner?.subTitle}
                    </p>
                    <p className="  mb-0 p-0">
                      {customization?.data?.banner?.p}
                    </p>
                  </div>
                )}
              </div>
            )}
            {customization?.data?.partners && (
              <div className="w-100">
                <Partners partners={customization?.data?.partners} />
              </div>
            )}
            <div className="w-100">
              <ExtraCaption customization={customization} />
            </div>
          </div>
          <MasqueradeBar />
        </>
      )}
    </>
  );
};

LearnerDashboardHeader.propTypes = {};

export default LearnerDashboardHeader;
