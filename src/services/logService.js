import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn:
      "https://41af60dfe48d4286b15bfd44bbc420c2@o380070.ingest.sentry.io/5205511",
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log,
};
