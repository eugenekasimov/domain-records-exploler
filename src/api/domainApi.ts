import domainsData from "../mock/domains.json";
import type { DomainRecord, DomainStatus } from "../types/domain";

export interface DomainFilterParams {
  domain?: string;
  registrar?: string;
  status?: DomainStatus | "";
  page?: number;
  pageSize?: number;
}

export interface DomainPage {
  data: DomainRecord[];
  total: number;
}

const allDomains = domainsData as DomainRecord[];

export async function fetchDomains(
  filters: DomainFilterParams = {},
): Promise<DomainPage> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 250));

  // Simulate an occasional API failure (e.g. 15% of the time)
  if (Math.random() < 0.15) {
    throw new Error("Simulated API error");
  }

  const { page = 1, pageSize = 10, domain, registrar, status } = filters;

  let result = [...allDomains];

  if (domain) {
    const q = domain.toLowerCase();
    result = result.filter((d) => d.domain.toLowerCase().includes(q));
  }

  if (registrar) {
    const q = registrar.toLowerCase();
    result = result.filter((d) =>
      (d.registrar ?? "").toLowerCase().includes(q),
    );
  }

  if (status) {
    result = result.filter((d) => d.status === status);
  }

  const total = result.length;
  const start = (page - 1) * pageSize;
  const data = result.slice(start, start + pageSize);

  return { data, total };
}
