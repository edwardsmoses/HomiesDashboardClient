import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const LoadingComponent: React.FC<{ content?: string }> = ({ content }) => {
  return (
    <Dimmer active>
      <Loader inverted={false} content={content} />
    </Dimmer>
  );
};

export default LoadingComponent;
