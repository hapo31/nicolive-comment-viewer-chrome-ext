import * as React from "react";
import { BOUYOMI_SERVER } from "../constant/Servers";

export default class YomiageSkeltonComponent extends React.Component<{
  message?: string;
  speed?: number;
  tone?: number;
  volume?: number;
  voice?: number;
}> {
  render() {
    if (!this.props.message) {
      return null;
    }
    return (
      <>
        <img
          style={{ display: "none" }}
          src={this.buildRequestQuery(this.props)}
        />
      </>
    );
  }

  private buildRequestQuery(
    props: {
      message?: string;
      speed?: number;
      tone?: number;
      volume?: number;
      voice?: number;
    } & {
      [x: string]: any;
    }
  ) {
    const query = Object.keys(props)
      .map(v => `${v}=${encodeURIComponent(props[v])}`)
      .join("&");
    return `${BOUYOMI_SERVER}?${query}`;
  }
}
