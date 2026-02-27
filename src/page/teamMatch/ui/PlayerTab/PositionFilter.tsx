import { PositionIdx } from '@/src/entities/player/model/type';
import { FilterBar } from '@/src/shared/uiKit';

interface PositionFilterProps {
  positionIdx: string;
  updatePositionIdx: (idx: PositionIdx) => void;
}

export const PositionFilter = ({ positionIdx, updatePositionIdx }: PositionFilterProps) => {
  return (
    <FilterBar
      defaultValue={positionIdx}
      onChange={value => {
        updatePositionIdx(value as PositionIdx);
      }}
    >
      <FilterBar.Active />
      <FilterBar.Button value={'0'}>전체</FilterBar.Button>
      <FilterBar.Button value={'1'}>탑</FilterBar.Button>
      <FilterBar.Button value={'2'}>정글</FilterBar.Button>
      <FilterBar.Button value={'3'}>미드</FilterBar.Button>
      <FilterBar.Button value={'4'}>원딜</FilterBar.Button>
      <FilterBar.Button value={'5'}>서폿</FilterBar.Button>
    </FilterBar>
  );
};
