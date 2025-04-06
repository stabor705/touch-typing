import levels from '../../configuration/levels.json'
import {Level} from "@/app/lib/model";

export default function readLevels(): Level[] {
  let characterSet = levels.baseline.characterSet
  const clusterLength = levels.baseline.clusterLength
  let requiredTrials = levels.baseline.numberOfTrials
  const numberOfClusters = levels.baseline.numberOfClusters

  return levels.levels.map(level => {
    if (level.addedCharacters) {
      characterSet += level.addedCharacters
    }
    if (level.addedTrials) {
      requiredTrials += level.addedTrials
    }

    return {
      characterSet,
      clusterLength,
      requiredTrials,
      requiredAccuracy: levels.baseline.requiredAccuracy,
      numberOfClusters
    }
  })
}