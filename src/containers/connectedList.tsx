import * as React from "react";
import { connect } from "react-redux";
import { saveData, getTeamDetail } from "../actions/index";
import { IState } from "../reducers/index";
import { GridComponent, NameComponent, PlayerList } from "../component/index";
import { IStateProps, IDispatchProps } from "../interfaces";

const ConnectedList = (props: IStateProps & IDispatchProps) => {
  const [teamName, setTeamName] = React.useState();
  const [isPlayerListShow, setIsPlayerListShow] = React.useState(false);

  function handleSaveTeamData(data: Object) {
    props.saveData(data);
    props.history.push("/match");
  }
  let id = localStorage.getItem("matchId");
  console.log("id", id === "null", id !== null);
  React.useEffect(() => {
    if (id !== null || id !== undefined) {
      // props.fetchTeamList(id);
      props.history.push("/match");
    }
    if (id === null) {
      props.history.push("/");
    }
  }, [id]);

  return (
    <>
      <GridComponent />
      <NameComponent teamName={setTeamName} showList={setIsPlayerListShow} />
      {isPlayerListShow ? (
        <PlayerList
          firstTeamName={teamName.firstTeamName}
          secondTeamName={teamName.secondTeamName}
          dataSave={handleSaveTeamData}
        />
      ) : (
        ""
      )}
    </>
  );
};

const mapStateToProps = (state: IState) => ({
  val: state.teams
});

const mapDispatchToProps = (dispatch: any) => ({
  saveData: (data: any) => dispatch(saveData(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedList);
