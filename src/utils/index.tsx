import { IStrikeRotate } from "../interfaces/index";
export function strikeRotate(
  batemenListForStrike: object,
  runs: string,
  counter: number
): IStrikeRotate {
  let batting: any = batemenListForStrike;
  let striker: any;
  let nonStriker: any;
  let out: any;

  const battingLineUp: any = batting && Object.values(batting.battingLineUp);

  const strikecheck = (element: any) => element.id === batting.striker;
  let strikerIndex: number =
    battingLineUp && battingLineUp.findIndex(strikecheck);

  const nonStrikercheck = (element: any) => element.id === batting.nonStriker;
  let nonStrikerIndex: number =
    battingLineUp && battingLineUp.findIndex(nonStrikercheck);

  if (strikerIndex === -1 || nonStrikerIndex === -1) {
    striker = battingLineUp && battingLineUp[0].id;
    nonStriker = battingLineUp && battingLineUp[1].id;

    if (runs === "Wk") {
      striker = battingLineUp && battingLineUp[2].id;
      nonStriker = battingLineUp && battingLineUp[1].id;
      out = battingLineUp && battingLineUp[0].id;
    }
  } else {
    if (runs === "1" || runs === "3" || runs === "5") {
      striker = battingLineUp && battingLineUp[nonStrikerIndex].id;
      nonStriker = battingLineUp && battingLineUp[strikerIndex].id;
    }
    if (
      runs === "0" ||
      runs === "2" ||
      runs === "4" ||
      runs === "6" ||
      runs === "Wd" ||
      runs === "NoBall"
    ) {
      striker = battingLineUp && battingLineUp[strikerIndex].id;
      nonStriker = battingLineUp && battingLineUp[nonStrikerIndex].id;
    }
    if (runs === "Wk") {
      striker = battingLineUp && battingLineUp[nonStrikerIndex + 1].id;
      nonStriker = battingLineUp && battingLineUp[nonStrikerIndex].id;
      out = battingLineUp && battingLineUp[strikerIndex].id;
    }
  }

  return { striker, nonStriker, out };
}

export function bowlerRatate(bowlerLineUp: object, counter: number) {
  let bowler = Object.values(bowlerLineUp);

  let bowlerSelected: any;

  let index: any = localStorage.getItem("bowlindex");
  let newIndex: any = +index + 1;
  let length: number = bowler.length - 1;

  if (counter === 6) {
    localStorage.setItem("bowlindex", newIndex);
    if (length === +index) {
      localStorage.setItem("bowlindex", "0");
    }
  }

  bowlerSelected = bowler && bowler[+index] && bowler[+index].id;
  return { id: bowlerSelected };
}

export function strikeRateCalculate(runs: number, balls: number): number {
  let _strike_rate: number = (runs / balls) * 100;
  let _strike_: number;
  if (isNaN(_strike_rate)) {
    _strike_ = 0;
  } else {
    _strike_ = _strike_rate;
  }
  return _strike_;
}

export function bowlerEconomyCalculate(runs: number, overs: number): number {
  let _economy_rate_: number = runs / overs;
  let _economy_: number;
  if (isNaN(_economy_rate_)) {
    _economy_ = 0;
  } else {
    _economy_ = _economy_rate_;
  }
  return _economy_;
}

export function inningEnd(
  currentOvers: number,
  totalOvers: number,
  currentWicket: number
): boolean {
  let _current_overs_: number = currentOvers;
  let _total_overs_: number = totalOvers;
  let _current_wicket_: number = currentWicket;
  const _total_wickets_: number = 10;
  let _result_: boolean = false;
  if (_current_overs_ === _total_overs_) {
    _result_ = true;
  }
  if (_current_wicket_ === _total_wickets_) {
    _result_ = true;
  }
  return _result_;
}

export function winningTeam(detail: any, intervel: any): string {
  let _result_: any;
  let _first_innings_detail_: any = detail.firstInning;
  let _second_innings_detail_: any = detail.secondInning;
  let _count_winning_difference_: number;

  if (_second_innings_detail_.witckets === 10) {
    if (_first_innings_detail_.score === _second_innings_detail_.score) {
      _result_ = "Match Tie";
      clearInterval(intervel);
    }
    if (_first_innings_detail_.score > _second_innings_detail_.score) {
      _count_winning_difference_ =
        _first_innings_detail_.score - _second_innings_detail_.score;
      _result_ = `TeamA win by ${_count_winning_difference_} run`;
      clearInterval(intervel);
    }
    if (_first_innings_detail_.score < _second_innings_detail_.score) {
      _result_ = `Team B is the winner`;
      clearInterval(intervel);
    }
  }
  if (_first_innings_detail_.overs === _first_innings_detail_.totalOver) {
    _result_ = `Second Inning`;
    clearInterval(intervel);
  }
  if (_first_innings_detail_.witckets === 10) {
    _result_ = `Second Inning`;
    clearInterval(intervel);
  }

  return _result_;
}

export function scoreBoardButton(inningData: any): string {
  let _result_: any;
  let _first_inning_total_over_: any = inningData.firstInning.totalOver;
  let _first_inning_running_over_: any = inningData.firstInning.overs;
  let _second_inning_total_over_: any = inningData.secondInning.totalOver;
  let _second_inning_running_over_: any = inningData.secondInning.overs;

  if (_first_inning_total_over_ === _first_inning_running_over_) {
    _result_ = "Start next inning";
  }

  if (
    _first_inning_total_over_ > _first_inning_running_over_ ||
    _second_inning_total_over_ > _second_inning_running_over_
  ) {
    _result_ = "Start over";
  }

  return _result_;
}
