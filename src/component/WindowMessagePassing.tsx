import * as React from "react";
import * as ReactDOM from "react-dom";

export type WindowMessagePassingProps = {
  isNewWindow: boolean;
  children: React.ReactNode;
  onWindowOpen?: (window: Window) => void;
  onWindowClose?: () => void;
};

export type WindowMessagePassingState = {
  window?: Window;
};

export default class WindowMessagePassing extends React.Component<
  WindowMessagePassingProps,
  WindowMessagePassingState
> {
  public state = { window: undefined };

  public componentDidCatch() {
    console.error("error thrown.");
  }

  public componentDidUpdate(
    prevProps: WindowMessagePassingProps,
    prevState: WindowMessagePassingState
  ) {
    if (!prevProps.isNewWindow && this.props.isNewWindow) {
      const newWindow = window.open(
        "abount:blank",
        "ゴマ団子",
        "width=400,height=300,toolbar=no,menubar=no,location=no,status=no"
      );

      if (newWindow) {
        (newWindow as any).React = React;
        (newWindow as any).ReactDOM = ReactDOM;
        (newWindow as any).children = this.props.children;
        (newWindow as any).render = renderChild.bind(
          newWindow,
          newWindow,
          this.props.children
        );
        const script = newWindow.document.createElement("script");
        script.innerText = `render()`;
        newWindow.document.body.appendChild(script);
        this.setState({
          window: newWindow
        });
      }
    }

    if (this.state.window != null && this.state.window !== prevState.window) {
      if (this.props.onWindowOpen) {
        this.props.onWindowOpen(this.state.window!);
      }
      window.onbeforeunload = () => {
        this.setState({
          window: undefined
        });
        if (this.props.onWindowClose) {
          this.props.onWindowClose();
        }
      };
    }
  }

  render() {
    if (this.props.isNewWindow) {
      return null;
    }

    return this.props.children;
  }
}

function renderChild(window: Window, children: React.ReactNode) {
  setInterval(() => {
    const element = window.document.createElement("div");
    window.document.body.appendChild(element);
    (window as any).ReactDOM.render(
      <ChildWinowRenderer window={window} children={children} />,
      element
    );
  });
}

class ChildWinowRenderer extends React.Component<{ window: Window }> {
  render() {
    return (this.props.window as any).children;
  }
}
