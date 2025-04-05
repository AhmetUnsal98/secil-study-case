export interface FilterItem {
  id: string;
  title: string;
  value: string;
  valueName: string;
  currency: string | null;
  comparisonType: number;
}

interface Filters {
  useOrLogic: boolean;
  filters: FilterItem[];
}

interface Info {
  id: number;
  name: string;
  description: string;
  url: string;
  langCode: string;
}

export interface Collection {
  id: number;
  filters: Filters;
  type: number;
  info: Info;
  salesChannelId: number;
  products: any;
}

export interface Meta {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ApiResponse {
  meta: Meta;
  data: Collection[];
}
