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
import { makeThemePersistent } from "./custom-theme-config";

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
  function hexToRgb(hex) {
    if (!hex) return "0, 0, 0"; // fallback
    hex = hex.replace(/^#/, "");
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((char) => char + char)
        .join("");
    }
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  }
  const { customization, multiTenancyloading, setMultiTenancyLoading } =
    useAppContext();

  const [colors, setColors] = React.useState({
    activeColor: customization?.colors?.INDIGO_PRIMARY_COLOR || "#15376D",
    activeHoverColor: customization?.colors?.INDIGO_PRIMARY_COLOR || "#15376D",
    hoverColor: customization?.colors?.INDIGO_PRIMARY_COLOR || "#15376D",
    linksColor: customization?.colors?.INDIGO_LINKS_COLOR || "#15376D",
    linksColorHover:
      customization?.colors?.INDIGO_LINKS_HOVER_COLOR || "#15376D",
  });

  React.useEffect(() => {
    if (customization) {
      setColors({
        activeColor: customization?.colors?.INDIGO_PRIMARY_COLOR || "#15376D",
        activeHoverColor:
          customization?.colors?.INDIGO_PRIMARY_COLOR || "#15376D",
        hoverColor: customization?.colors?.INDIGO_PRIMARY_COLOR || "#15376D",
        linksColor: customization?.colors?.INDIGO_LINKS_COLOR || "#15376D",
        linksColorHover:
          customization?.colors?.INDIGO_LINKS_HOVER_COLOR || "#15376D",
      });
    }
  }, [customization]);

  React.useEffect(() => {
    if (customization) {
      const cleanup = makeThemePersistent(customization);
      return cleanup;
    }
  }, [customization]);

  React.useEffect(() => {
    if (customization) {
      const root = document.documentElement;
      const hex = customization?.colors?.INDIGO_PRIMARY_COLOR || "#15376D";
      const rgb = hexToRgb(hex);
      root.style.setProperty("--custom-shadow", rgb);
      root.style.setProperty(
        "--active-bg",
        customization?.colors?.INDIGO_PRIMARY_COLOR || "#15376D"
      );
      root.style.setProperty(
        "--active-hover-bg",
        customization?.colors?.INDIGO_PRIMARY_COLOR || "#15376D"
      );
      root.style.setProperty(
        "--hover-bg",
        customization?.colors?.INDIGO_PRIMARY_COLOR || "#15376D"
      );
      root.style.setProperty(
        "--links-color",
        customization?.colors?.INDIGO_LINKS_COLOR || "#15376D"
      );
      root.style.setProperty(
        "--links-color-hover",
        customization?.colors?.INDIGO_LINKS_HOVER_COLOR || "#15376D"
      );
    }
  }, [customization]);

  return (
    <>
      {multiTenancyloading ? (
        <LoadingView />
      ) : (
        <div>
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
