import * as React from "react";
import { BOUYOMI_SERVER } from "../constant/Servers";

export default class YomiageSkeltonComponent extends React.Component<
  {
    message?: string;
    speed?: number;
    tone?: number;
    volume?: number;
    voice?: number;
  },
  {
    hasError: boolean;
  }
> {
  componentWillMount() {
    this.setState({
      hasError: false
    });
  }

  render() {
    if (!this.props.message || this.state.hasError) {
      return null;
    }
    return (
      <>
        <img
          onError={this.onError}
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

  private onError = (_: React.SyntheticEvent<HTMLImageElement>) => {
    this.setState({
      hasError: true
    });
  };
}
