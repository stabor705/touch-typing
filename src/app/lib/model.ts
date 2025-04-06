export interface TypingScore {
  accuracy: number
}

export interface Level {
  characterSet: string,
  clusterLength: number,
  requiredTrials: number,
  requiredAccuracy: number,
  numberOfClusters: number
}