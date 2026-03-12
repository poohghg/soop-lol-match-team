import { PositionIdxWithAll } from '@/src/entities/player/model/type';
import { FilterBar } from '@/src/shared/uiKit';

interface PositionFilterProps {
  positionIdx: string;
  positionCountMap: Record<string, number>;
  updatePositionIdx: (idx: PositionIdxWithAll) => void;
}

const positionNames: Record<string, string> = {
  '0': '전체',
  '1': '탑',
  '2': '정글',
  '3': '미드',
  '4': '원딜',
  '5': '서폿',
};

export const PositionFilter = ({ positionIdx, updatePositionIdx, positionCountMap }: PositionFilterProps) => {
  return (
    <FilterBar
      className={`h-[44px]`}
      defaultValue={positionIdx}
      onChange={value => {
        updatePositionIdx(value as PositionIdxWithAll);
      }}
    >
      <FilterBar.Active />
      {Object.entries(positionNames).map(([idx, name]) => (
        <FilterBar.Button key={idx} className={`gap-1 p-1 max-[400px]:flex-col`} value={idx}>
          <span>{name}</span>
          <span>[{positionCountMap[idx]}]</span>
        </FilterBar.Button>
      ))}
    </FilterBar>
  );
};
