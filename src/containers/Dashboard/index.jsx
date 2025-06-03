import React, { useEffect, useState } from "react";

import { reduxHooks } from "hooks";
import { RequestKeys } from "data/constants/requests";
import EnterpriseDashboardModal from "containers/EnterpriseDashboardModal";
import SelectSessionModal from "containers/SelectSessionModal";
import CoursesPanel from "containers/CoursesPanel";

import LoadingView from "./LoadingView";
import DashboardLayout from "./DashboardLayout";
import hooks from "./hooks";
import "./index.scss";
import { useAppContext } from "../../../context";

export const Dashboard = () => {
  hooks.useInitializeDashboard();
  const { pageTitle } = hooks.useDashboardMessages();
  const hasCourses = reduxHooks.useHasCourses();
  const hasAvailableDashboards = reduxHooks.useHasAvailableDashboards();
  const initIsPending = reduxHooks.useRequestIsPending(RequestKeys.initialize);
  const showSelectSessionModal = reduxHooks.useShowSelectSessionModal();
  const { customization, multiTenancyloading } = useAppContext();
  const [colors, setColors] = useState({
    activeColor: customization?.INDIGO_PRIMARY_COLOR,
    activeHoverColor: customization?.INDIGO_PRIMARY_COLOR,
    hoverColor: customization?.INDIGO_PRIMARY_COLOR,
  });

  useEffect(() => {
    if (customization) {
      setColors({
        activeColor: customization.INDIGO_PRIMARY_COLOR  || "#0A3055",
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
          id="dashboard-container"
          className="d-flex flex-column p-2 pt-0"
          style={{
            "--active-bg": colors?.activeColor,
            "--active-hover-bg": colors?.activeHoverColor,
            "--hover-bg": colors?.hoverColor,
          }}
        >
          <h1 className="sr-only">{pageTitle}</h1>
          {!initIsPending && (
            <>
              {hasAvailableDashboards && <EnterpriseDashboardModal />}
              {hasCourses && showSelectSessionModal && <SelectSessionModal />}
            </>
          )}
          <div id="dashboard-content" data-testid="dashboard-content">
            {initIsPending ? (
              <LoadingView />
            ) : (
              <DashboardLayout>
                <CoursesPanel />
              </DashboardLayout>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
