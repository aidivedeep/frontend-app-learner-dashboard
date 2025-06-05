import React from "react";
import { Helmet } from "react-helmet";

import { useIntl } from "@edx/frontend-platform/i18n";
import { logError } from "@edx/frontend-platform/logging";
import { initializeHotjar } from "@edx/frontend-enterprise-hotjar";

import { ErrorPage, AppContext } from "@edx/frontend-platform/react";
import FooterSlot from "@openedx/frontend-slot-footer";
import { Alert } from "@openedx/paragon";

import { RequestKeys } from "data/constants/requests";
import store from "data/store";
import { selectors, actions } from "data/redux";
import { reduxHooks } from "hooks";
import Dashboard from "containers/Dashboard";

import track from "tracking";

import fakeData from "data/services/lms/fakeData/courses";

import AppWrapper from "containers/WidgetContainers/AppWrapper";
import LearnerDashboardHeader from "containers/LearnerDashboardHeader";

import { getConfig } from "@edx/frontend-platform";
import messages from "./messages";
import "./App.scss";
import { useAppContext } from "../context";
import LoadingView from "./containers/Dashboard/LoadingView";

export const App = () => {
  const { authenticatedUser } = React.useContext(AppContext);
  const { formatMessage } = useIntl();
  const isFailed = {
    initialize: reduxHooks.useRequestIsFailed(RequestKeys.initialize),
    refreshList: reduxHooks.useRequestIsFailed(RequestKeys.refreshList),
  };
  const hasNetworkFailure = isFailed.initialize || isFailed.refreshList;
  const { supportEmail } = reduxHooks.usePlatformSettingsData();
  const loadData = reduxHooks.useLoadData();
  const { customization, multiTenancyloading } = useAppContext();
  const [colors, setColors] = React.useState({
    activeColor: customization?.INDIGO_PRIMARY_COLOR || "#0A3055",
    activeHoverColor: customization?.INDIGO_PRIMARY_COLOR || "#0A3055",
    hoverColor: customization?.INDIGO_PRIMARY_COLOR || "#0A3055",
  });

  React.useEffect(() => {
    if (
      authenticatedUser?.administrator ||
      getConfig().NODE_ENV === "development"
    ) {
      window.loadEmptyData = () => {
        loadData({ ...fakeData.globalData, courses: [] });
      };
      window.loadMockData = () => {
        loadData({
          ...fakeData.globalData,
          courses: [...fakeData.courseRunData, ...fakeData.entitlementData],
        });
      };
      window.store = store;
      window.selectors = selectors;
      window.actions = actions;
      window.track = track;
    }
    if (getConfig().HOTJAR_APP_ID) {
      try {
        initializeHotjar({
          hotjarId: getConfig().HOTJAR_APP_ID,
          hotjarVersion: getConfig().HOTJAR_VERSION,
          hotjarDebug: !!getConfig().HOTJAR_DEBUG,
        });
      } catch (error) {
        logError(error);
      }
    }
  }, [authenticatedUser, loadData]);

  React.useEffect(() => {
    if (customization) {
      setColors({
        activeColor: customization.INDIGO_PRIMARY_COLOR || "#0A3055",
        activeHoverColor: customization.INDIGO_PRIMARY_COLOR || "#0A3055",
        hoverColor: customization.INDIGO_PRIMARY_COLOR || "#0A3055",
      });
    }
  }, [customization]);

  return (
    <>
      {multiTenancyloading ? (
        <LoadingView />
      ) : (
        <div
          style={{
            "--active-bg": colors?.activeColor,
            "--active-hover-bg": colors?.activeHoverColor,
            "--hover-bg": colors?.hoverColor,
          }}
        >
          <Helmet>
            <title>{formatMessage(messages.pageTitle)}</title>
            <link
              rel="shortcut icon"
              href={getConfig().FAVICON_URL}
              type="image/x-icon"
            />
          </Helmet>
          <div>
            <AppWrapper>
              <LearnerDashboardHeader />
              <main>
                {hasNetworkFailure ? (
                  <Alert variant="danger">
                    <ErrorPage
                      message={formatMessage(messages.errorMessage, {
                        supportEmail,
                      })}
                    />
                  </Alert>
                ) : (
                  <Dashboard />
                )}
              </main>
            </AppWrapper>
            <FooterSlot />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
