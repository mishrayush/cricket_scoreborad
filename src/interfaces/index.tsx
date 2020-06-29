export interface IStateProps {
  val: Object;
  history: {
    push(url: string): void;
  };
}

export interface IDispatchProps {
  saveData: (data: any) => void;
}

export interface IPropsConnectedMatchDetail {
  history: {
    push(url: string): void;
  };
  firstInningBat: object;
  firstInningBowl: any;
  secondInningBat: any;
  secondInningBowl: any;
  InningDetail: any;
  innData: any;
  battingLineUp: () => void;
  overStart: () => void;
  onInningDetail: (data: any) => void;
  onUpdateInning: (data: any) => void;
  onStrikeChange: (data: any) => void;
  onInningFinish: () => void;
  onsaveDataPerOver: (data: any) => void;
}

export interface IBattingSummary {
  firstInningDetail: any;
  TeamName: string;
}

export interface IButtonProps {
  text: string;
  clicked: () => void;
}

export interface IHomeProps {
  InningDetail: any;
  counter: number;
  runSingleBowl: string;
  currentOverRun: any;
  winner: string;
}

export interface IPropsText {
  id: string;
  placeholder: string;
  onHandleChange: (event: any) => void;
}

export interface IPlayerListProps {
  firstTeamName: string;
  secondTeamName: string;
  dataSave: (val: Object) => void;
}

export interface INameProps {
  showList: (isVal: boolean) => void;
  teamName: (val: Object) => void;
}

export interface IConnecteScoreSummaryProps {
  history: {
    push(url: string): void;
  };
  updatedFirstInningDetail: any;
  updatedSecondInningDetail: any;
}

export interface IScoreReducer {
  firstInning: {
    totalOver: number;
    extra: number;
    score: number;
    overs: number; //10 overs increase accordingly
    balls: number; //60 balls
    witckets: number;
    netRunrate: number;
    currentOver: any;
    battingLineUp: any;
    bowlingLineUp: object;
    isInningComplete: boolean;
    striker: number;
    nonStriker: number;
  };
  secondInning: {
    totalOver: number;
    extra: number;
    score: number;
    overs: number; //10 overs increase accordingly
    balls: number; //60 balls
    witckets: number;
    netRunrate: number;
    currentOver: any;
    battingLineUp: any;
    bowlingLineUp: object;
    isInningComplete: boolean;
    striker: number;
    nonStriker: number;
  };
}

export interface IStrikeRotate {
  striker: number;
  nonStriker: number;
  out: number | null;
}
