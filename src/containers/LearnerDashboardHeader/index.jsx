import React from "react";

import MasqueradeBar from "containers/MasqueradeBar";
import { AppContext } from "@edx/frontend-platform/react";
import Header from "@edx/frontend-component-header";
import { reduxHooks } from "hooks";
import urls from "data/services/lms/urls";

import ConfirmEmailBanner from "./ConfirmEmailBanner";

import { useLearnerDashboardHeaderMenu, findCoursesNavClicked } from "./hooks";

import "./index.scss";
import Partners from "./partners";
import ExtraCaption from "./extraCaption";
import { useAppContext } from "../../../context";

export const LearnerDashboardHeader = () => {
  const { authenticatedUser } = React.useContext(AppContext);
  const { courseSearchUrl } = reduxHooks.usePlatformSettingsData();
  const { customization } = useAppContext();
  const exploreCoursesClick = () => {
    findCoursesNavClicked(urls.baseAppUrl(courseSearchUrl));
  };

  const learnerHomeHeaderMenu = useLearnerDashboardHeaderMenu({
    courseSearchUrl,
    authenticatedUser,
    exploreCoursesClick,
  });

  return (
    <>
      <ConfirmEmailBanner />
      <div>
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
                <p className="  mb-0 p-0">{customization?.data?.banner?.p}</p>
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
  );
};

LearnerDashboardHeader.propTypes = {};

export default LearnerDashboardHeader;
