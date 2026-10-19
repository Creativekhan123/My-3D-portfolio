import React from 'react';
import { GreeneryParkHub } from './GreeneryParkHub';
import { GameDevLevel } from './GameDevLevel';
import { RoboticsLevel } from './RoboticsLevel';
import { TwinDevLevel } from './TwinDevLevel';
import type { ExhibitStationInfo, DoorPortalInfo, RoomId } from '../../types/game';

interface PortfolioWorldProps {
  activeRoom?: RoomId;
  nearestExhibit: ExhibitStationInfo | null;
  nearestDoor: DoorPortalInfo | null;
  onInteractStation: (station: ExhibitStationInfo) => void;
  onEnterDoor: (targetRoomId: RoomId) => void;
}

export const PortfolioWorld: React.FC<PortfolioWorldProps> = ({
  activeRoom = 'park',
  nearestExhibit,
  nearestDoor,
  onInteractStation,
  onEnterDoor
}) => {
  switch (activeRoom) {
    case 'game-dev':
    case 'game-studio':
      return (
        <GameDevLevel
          nearestExhibit={nearestExhibit}
          nearestDoor={nearestDoor}
          onInteractStation={onInteractStation}
          onEnterDoor={onEnterDoor}
        />
      );

    case 'robotics':
    case 'robotics-lab':
      return (
        <RoboticsLevel
          nearestExhibit={nearestExhibit}
          nearestDoor={nearestDoor}
          onInteractStation={onInteractStation}
          onEnterDoor={onEnterDoor}
        />
      );

    case 'twin-dev':
    case 'twin-lab':
      return (
        <TwinDevLevel
          nearestExhibit={nearestExhibit}
          nearestDoor={nearestDoor}
          onInteractStation={onInteractStation}
          onEnterDoor={onEnterDoor}
        />
      );

    case 'park':
    case 'nexus':
    default:
      return (
        <GreeneryParkHub
          nearestDoor={nearestDoor}
          onEnterDoor={onEnterDoor}
        />
      );
  }
};
