import overview from "../assets/sidebar/overview.svg";
import cases from "../assets/sidebar/cases.svg";
import reports from "../assets/sidebar/reports.svg";
import notifications from "../assets/sidebar/notifications.svg";
import settings from "../assets/sidebar/settings.svg";
import help from "../assets/sidebar/help.svg";
import logout from "../assets/sidebar/logout.svg";

const sidebarItems = [
  {
    title: "Overview",
    route: "dashboard/overview",
    icon: overview,
  },
  {
    title: "Cases",
    route: "dashboard/cases",
    icon: cases,
  },
  {
    title: "Logout",
    route: "dashboard/logout",
    icon: logout,
  },
  // {
  //   title: "Settings",
  //   route: "dashboard/settings",
  //   icon: settings,
  // },
  // {
  //   title: "Help Center",
  //   route: "dashboard/help",
  //   icon: help,
  // },
];

export default sidebarItems;
