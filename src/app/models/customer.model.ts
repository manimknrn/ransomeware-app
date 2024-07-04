export interface Customer {
  id?: number;
  name: string[],
  extensions: string,
  extensionPattern: string,
  ransomNoteFilenames: string,
  comment: string,
  encryptionAlgorithm: string,
  decryptor: string,
  resources: string[]
  screenshots: string,
  microsoftDetectionName: string,
  microsoftInfo: string,
  sandbox: string,
  iocs: string,
  snort: string
}
