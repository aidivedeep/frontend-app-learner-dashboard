import React from "react";
import { useIntl } from "@edx/frontend-platform/i18n";
import { Button, Image } from "@openedx/paragon";
import { Search } from "@openedx/paragon/icons";
import { baseAppUrl } from "data/services/lms/urls";

import emptyCourseSVG from "assets/empty-course.svg";
import { reduxHooks } from "hooks";

import messages from "./messages";
import "./index.scss";
import { useAppContext } from "../../../../context";
import CustomMessage from "./customMessage";

export const NoCoursesView = () => {
  const { formatMessage } = useIntl();
  const { courseSearchUrl } = reduxHooks.usePlatformSettingsData();
  const { customization, multiTenancyloading } = useAppContext();
  return (
    <>
      {multiTenancyloading ? (
        <div>Loading ..</div>
      ) : (
        <div
          id="no-courses-content-view"
          className="d-flex align-items-center justify-content-center mb-4.5"
        >
          {customization?.data?.courseContainer &&
          <CustomMessage data={customization?.data?.courseContainer?.top} />
          }
          <Image src={emptyCourseSVG} alt={formatMessage(messages.bannerAlt)} />
          <h1>{formatMessage(messages.lookingForChallengePrompt)}</h1>
          <p>{formatMessage(messages.exploreCoursesPrompt)}</p>
          <Button
            variant="brand"
            as="a"
            href={baseAppUrl(courseSearchUrl)}
            iconBefore={Search}
          >
            {formatMessage(messages.exploreCoursesButton)}
          </Button>

          {customization?.data?.courseContainer &&
          <CustomMessage data={customization?.data?.courseContainer?.bottom} />
          }
        </div>
      )}
    </>
  );
};

export default NoCoursesView;
