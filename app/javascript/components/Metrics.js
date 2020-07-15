import React from "react";
import PivotTableUI from "react-pivottable/PivotTableUI";
import TableRenderers from "react-pivottable/TableRenderers";
import Plot from "react-plotly.js";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";

// create Plotly renderers via dependency injection
const PlotlyRenderers = createPlotlyRenderers(Plot);

class Metrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    return (
      <PivotTableUI
        data={this.props.objects}
        onChange={(s) => this.setState(s)}
        renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
        {...this.state}
      />
    );
  }
}

export default Metrics;
