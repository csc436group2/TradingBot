import styled from "@emotion/styled";
import { Divider, Grid } from "@mui/material";

function StockDetail() {
  return (
    <StockDetailContainer>
      <h4 style={{ marginTop: -24, marginBottom: 4 }}>Stock Detail</h4>
      <Divider />
      <Grid container direction="row" rowSpacing={-4}>
        <Grid item xs={3}>
          <h6>Symbol</h6>
        </Grid>
        <Grid item xs={3}>
          <p>MSFT</p>
        </Grid>
        <Grid item xs={3}>
          <h6>P/E</h6>
        </Grid>
        <Grid item xs={3}>
          <p>9.82</p>
        </Grid>
        <Grid item xs={3}>
          <h6>EPS (ttm)</h6>
        </Grid>
        <Grid item xs={3}>
          <p>4.86</p>
        </Grid>
        <Grid item xs={3}>
          <h6>PEG</h6>
        </Grid>
        <Grid item xs={3}>
          <p>1.66</p>
        </Grid>
        <Grid item xs={3}>
          <h6>Short Ratio</h6>
        </Grid>
        <Grid item xs={3}>
          <p>1.72</p>
        </Grid>
        <Grid item xs={3}>
          <h6>Book/sh</h6>
        </Grid>
        <Grid item xs={3}>
          <p>22.29</p>
        </Grid>
        <Grid item xs={3}>
          <h6>Sales</h6>
        </Grid>
        <Grid item xs={3}>
          <p>198.27B</p>
        </Grid>
        <Grid item xs={3}>
          <h6>P/S</h6>
        </Grid>
        <Grid item xs={3}>
          <p>9.47</p>
        </Grid>
        <Grid item xs={3}>
          <h6>EPS this Y</h6>
        </Grid>
        <Grid item xs={3}>
          <p>19.80%</p>
        </Grid>
        <Grid item xs={3}>
          <h6>P/B</h6>
        </Grid>
        <Grid item xs={3}>
          <p>11.07</p>
        </Grid>
        <Grid item xs={3}>
          <h6>ROI</h6>
        </Grid>
        <Grid item xs={3}>
          <p>31.30%</p>
        </Grid>
        <Grid item xs={3}>
          <h6>Perf Half Y</h6>
        </Grid>
        <Grid item xs={3}>
          <p>-16.60%</p>
        </Grid>
        <Grid item xs={3}>
          <h6>ROA</h6>
        </Grid>
        <Grid item xs={3}>
          <p>20.38%</p>
        </Grid>
        <Grid item xs={3}>
          <h6>Current Ratio</h6>
        </Grid>
        <Grid item xs={3}>
          <p>1.82</p>
        </Grid>
        <Grid item xs={3}>
          <h6>Employees</h6>
        </Grid>
        <Grid item xs={3}>
          <p>221,543</p>
        </Grid>
        <Grid item xs={3}>
          <h6>Gross Margin</h6>
        </Grid>
        <Grid item xs={3}>
          <p>64.80%</p>
        </Grid>
      </Grid>
    </StockDetailContainer>
  );
}

const StockDetailContainer = styled.div`
  min-width: 30%;
  max-width: 30%;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.9);
  height: 100%;
  min-height: 400px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 3rem;
  border-radius: 24px;
  margin-left: 2rem;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease-in;
  &:hover {
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.8);
  }

  p {
    color: black;
    font-size: 18px;
    font-weight: 900;
    margin-top: 10px;
    align-self: end;
    text-align: end;
    margin-right: 2rem;
  }

  h6 {
    color: grey;
    font-size: 18px;
    align-self: start;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

export default StockDetail;
