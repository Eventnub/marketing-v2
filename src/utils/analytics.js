import ReactGA4 from "react-ga4";

export const GoogleAnalytics = {
  trackPageView: (page) => {
    ReactGA4.send({
      hitType: "pageview",
      page,
    });
  },
  trackEvent: (name, params) => {
    ReactGA4.event(name, params);
  },
};
