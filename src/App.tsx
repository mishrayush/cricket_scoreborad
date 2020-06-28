import * as React from "react";
import { Route, Switch } from "react-router";
import { connect } from "react-redux";
import {
  ConnectedList,
  ConnectedMatchDetail,
  ConnectScoreSummary
} from "./containers/index";
import { getTeamDetail, fetchInningDetail } from "./actions/index";

interface IStateProps {
  // history: {
  //   push(url: string): void;
  // };
}

interface IDispatchProps {
  fetchTeamList: (id: string) => void;
  onfetchInningDetail: () => void;
}

function App(props: IStateProps & IDispatchProps) {
  let id = localStorage.getItem("matchId");
  React.useEffect(() => {
    if (id !== null) {
      props.fetchTeamList(id);
      props.onfetchInningDetail();
      // props.history.push("/match");
    }
  }, [id]);
  return (
    <>
      <Switch>
        <Route exact={true} path="/" component={ConnectedList} />
        <Route exact={true} path="/match" component={ConnectedMatchDetail} />
        <Route path="/scoreboard" component={ConnectScoreSummary} />
      </Switch>
    </>
  );
}
// const mapStateToProps = (state: IState) => ({
//   val: state.teams
// });

const mapDispatchToProps = (dispatch: any) => ({
  //   teamDetail: () => dispatch(teamDetail())
  // saveData: (data: any) => dispatch(saveData(data)),
  fetchTeamList: (matchId: string) => dispatch(getTeamDetail(matchId)),
  onfetchInningDetail: () => dispatch(fetchInningDetail())
});
export default connect(
  null,
  mapDispatchToProps
)(App);
