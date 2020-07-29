import React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { BarData, NoteValue } from '../../types/barTypes';
import Bar from '../Bar';
import { RootState } from '../../reducers';
import { songActions, handleRemoveBar, handleCopyBar } from '../../actions/songActions';

interface Props {
  bars: BarData[];
  curBarIdx: number;
  removeBar(idx: number): void;
  copyBar(idx: number): void;
  updateBarNoteValue(idx: number, newValue: NoteValue): void;
  addGrouping(barIdx: number): void;
  removeGrouping(barIdx: number, groupingIdx: number): void;
  updateGroupingBeats(barIdx: number, groupingIdx: number, newBeats: number): void;
  updateGroupingNoteValue(barIdx: number, groupingIdx: number, newValue: NoteValue): void;
  updateGroupingSubdivision(barIdx: number, groupingIdx: number, newValue?: number): void;
}

const Metronome: React.FC<Props> = (props: Props) => {

  const getBarsDisplay = (): JSX.Element[] => {
    const bars: JSX.Element[] = props.bars.map((bar, idx) => {
      return <Bar
        key={`bar${bar.id}`}
        bar={bar}
        isActive={idx === props.curBarIdx}
        remove={() => props.removeBar(idx)}
        copy={() => props.copyBar(idx)}
        updateNoteValue={(newVal: NoteValue) => props.updateBarNoteValue(idx, newVal)}
        addGrouping={() => props.addGrouping(idx)}
        removeGrouping={(groupingIdx: number) => props.removeGrouping(idx, groupingIdx)}
        updateGroupingBeats={(groupingIdx: number, newBeats: number) => props.updateGroupingBeats(idx, groupingIdx, newBeats)}
        updateGroupingNoteValue={(groupingIdx: number, newValue: NoteValue) => props.updateGroupingNoteValue(idx, groupingIdx, newValue)}
        updateSubdivision={(groupingIdx: number, newValue?: number) => props.updateGroupingSubdivision(idx, groupingIdx, newValue)}
      />;
    });
    return bars;
  };

  return (
    <div className={'flex-1 flex flex-row flex-wrap bg-gray-500 items-center justify-center'}>
      {getBarsDisplay()}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  bars: state.song.bars,
  curBarIdx: state.metronome.curBarIdx
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, undefined, Action>) => {
  return {
    removeBar: (idx: number) => dispatch(handleRemoveBar(idx)),
    copyBar: (idx: number) => dispatch(handleCopyBar(idx)),
    updateBarNoteValue: (idx: number, newValue: NoteValue) => dispatch(songActions.updateBarNoteValue(idx, newValue)),
    addGrouping: (barIdx: number) => dispatch(songActions.addGrouping(barIdx)),
    removeGrouping: (barIdx: number, groupingIdx: number) => dispatch(songActions.removeGrouping(barIdx, groupingIdx)),
    updateGroupingBeats: (barIdx: number, groupingIdx: number, newBeats: number) => dispatch(songActions.updateGroupingBeats(barIdx, groupingIdx, newBeats)),
    updateGroupingNoteValue: (barIdx: number, groupingIdx: number, newValue: NoteValue) => dispatch(songActions.updateGroupingNoteValue(barIdx, groupingIdx, newValue)),
    updateGroupingSubdivision: (barIdx: number, groupingIdx: number, newValue?: number) => dispatch(songActions.updateGroupingSubdivision(barIdx, groupingIdx, newValue))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Metronome);