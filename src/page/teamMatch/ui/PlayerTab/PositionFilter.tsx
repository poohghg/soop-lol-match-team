import { PositionIdxWithAll } from '@/src/entities/player/model/type';
import { FilterBar } from '@/src/shared/uiKit';

interface PositionFilterProps {
  positionIdx: string;
  positionCountMap: Record<string, number>;
  updatePositionIdx: (idx: PositionIdxWithAll) => void;
}

export const PositionFilter = ({ positionIdx, updatePositionIdx, positionCountMap }: PositionFilterProps) => {
  return (
    <FilterBar
      defaultValue={positionIdx}
      onChange={value => {
        updatePositionIdx(value as PositionIdxWithAll);
      }}
    >
      <FilterBar.Active />
      <FilterBar.Button value={'0'}>전체 [{positionCountMap['0']}]</FilterBar.Button>
      <FilterBar.Button value={'1'}>탑 [{positionCountMap['1']}]</FilterBar.Button>
      <FilterBar.Button value={'2'}>정글 [{positionCountMap['2']}]</FilterBar.Button>
      <FilterBar.Button value={'3'}>미드 [{positionCountMap['3']}]</FilterBar.Button>
      <FilterBar.Button value={'4'}>원딜 [{positionCountMap['4']}]</FilterBar.Button>
      <FilterBar.Button value={'5'}>서폿 [{positionCountMap['5']}]</FilterBar.Button>
    </FilterBar>
  );
};
