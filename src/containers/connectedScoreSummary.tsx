import React, { useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { IState } from "../reducers/index";

import { BattingSummary, StyledButton } from "../component/index";
import {
  makeSelectFirstInnForScoreCard,
  makeSelectSecondInnForScoreCard
} from "../selectors/index";
import { IConnecteScoreSummaryProps } from "../interfaces/index";

const ConnectedScoreSummary = (props: IConnecteScoreSummaryProps) => {
  const [showAndHide, setShowAndHide] = useState(false);
  function handleClick() {
    setShowAndHide(!showAndHide);
  }
  return (
    <>
      {!showAndHide ? (
        <BattingSummary
          firstInningDetail={props.updatedFirstInningDetail}
          TeamName="TeamA"
        />
      ) : (
        <BattingSummary
          firstInningDetail={props.updatedSecondInningDetail}
          TeamName="TeamB"
        />
      )}
      <StyledButton text="ScoreBoard" clicked={handleClick} />
    </>
  );
};

const mapStateToProps = createStructuredSelector<any, any>({
  updatedFirstInningDetail: makeSelectFirstInnForScoreCard(),
  updatedSecondInningDetail: makeSelectSecondInnForScoreCard()
});

export default connect(
  mapStateToProps,
  null
)(ConnectedScoreSummary);
