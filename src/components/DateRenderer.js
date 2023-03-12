import React from "react";

export const DateRenderer = ({ date, includeTime }) => {
  const event = React.useMemo(() => {
    return new Date(date);
  });

  const dateString = React.useMemo(() => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return event.toLocaleDateString("en-GB", options);
  });

  const timeString = React.useMemo(() => {
    return event.toLocaleTimeString("en-GB");
  });

  return (
    <>
      {dateString}
      {includeTime && ` at ${timeString}`}
    </>
  );
};
