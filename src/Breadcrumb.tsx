import * as React from "react";

export interface Props {
  values: number[];
}

export class Breadcrumb extends React.PureComponent<Props> {
  render() {
    return (
      <div className="breadcrumb">
        <ul>
          {this.props.values.map((value, index) => {
            return (
              <li key={index}>{value.toFixed(3)}</li>
            )
          })}
        </ul>
      </div>
    );
  }
}
