export type DomainStatus = 'active' | 'clientHold' | 'pendingTransfer'

export interface DomainRecord {
  domain: string
  registrar: string | null
  status: DomainStatus
  created_at: string | null
  expires_at: string | null
  nameservers: string[] | null
  updated_at: string | null
}

