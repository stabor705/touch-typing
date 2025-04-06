export default function generateTrials(characterSet: string, clusterLength: number, numberOfClusters: number): string[] {
  return Array.from({ length: numberOfClusters }, () => generateTrial(clusterLength, characterSet))
}

function generateTrial(clusterLength: number, characterSet: string): string {
  return Array.from({ length: clusterLength }, () => {
    return characterSet.charAt(Math.floor(Math.random() * characterSet.length))
  }).join('')
}