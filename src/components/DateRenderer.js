import React from "react";

export const DateRenderer = ({ date, includeTime }) => {
  const event = React.useMemo(() => {
    return new Date(date);
  }, [event]);

  const dateString = React.useMemo(() => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return event.toLocaleDateString("en-GB", options);
  }, [event]);

  const timeString = React.useMemo(() => {
    return event.toLocaleTimeString("en-GB");
  }, [event]);

  return (
    <>
      {dateString}
      {includeTime && ` at ${timeString}`}
    </>
  );
};
