import { Position, PositionIdx } from '@/src/entities/player/model/type';
import { Heart, Shield, Sparkles, Sword, Target } from 'lucide-react';

export class PlayerView {
  static positionNames: Record<PositionIdx, Position> = {
    1: '탑',
    2: '정글',
    3: '미드',
    4: '원딜',
    5: '서폿',
  };

  static positionIcons = {
    1: Shield,
    2: Sword,
    3: Sparkles,
    4: Target,
    5: Heart,
  };

  static positionClasses: Record<
    PositionIdx,
    {
      bg: string;
      text: string;
      border: string;
      bgLight: string;
    }
  > = {
    1: {
      bg: 'bg-position-top',
      text: 'text-position-top',
      border: 'border-position-top',
      bgLight: 'bg-position-top/20',
    },
    2: {
      bg: 'bg-position-jungle',
      text: 'text-position-jungle',
      border: 'border-position-jungle',
      bgLight: 'bg-position-jungle/20',
    },
    3: {
      bg: 'bg-position-mid',
      text: 'text-position-mid',
      border: 'border-position-mid',
      bgLight: 'bg-position-mid/20',
    },
    4: {
      bg: 'bg-position-adc',
      text: 'text-position-adc',
      border: 'border-position-adc',
      bgLight: 'bg-position-adc/20',
    },
    5: {
      bg: 'bg-position-support',
      text: 'text-position-support',
      border: 'border-position-support',
      bgLight: 'bg-position-support/20',
    },
  };

  static getPositionName(positionIdx: PositionIdx) {
    return PlayerView.positionNames[positionIdx];
  }

  static getPositionIcon(positionIdx: PositionIdx) {
    return PlayerView.positionIcons[positionIdx];
  }

  static getPositionClasses(positionIdx: PositionIdx) {
    return PlayerView.positionClasses[positionIdx];
  }
}
