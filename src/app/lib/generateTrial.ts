export default function generateTrials(clusterLength: number, numberOfClusters: number): string[] {
  const characterSet = "abcdefghijklmnopqrstuvwxyz"
  return Array.from({ length: numberOfClusters }, () => generateTrial(clusterLength, characterSet))
}

function generateTrial(clusterLength: number, characterSet: string): string {
  return Array.from({ length: clusterLength }, () => {
    return characterSet.charAt(Math.floor(Math.random() * characterSet.length))
  }).join('')
}