import { KnFilter, KnFilterRule } from '.';

export interface ReportRow {
  reports: Report[];
  layout: string;
}

export interface Report {
  child_page: boolean;
  layout: Layout;
  options: ReportOptions;
  filters: KnFilterRule[];
  description: string;
  calculations: Calculation[];
  groups: Group[];
  source: Source;
  type: string;
  title: string;
  settings: Settings;
  preview: boolean;
  filter_groups: FilterGroup[];
  index: number;
  row_index: number;
  row_summaries?: any[];
  summaries?: Summary[];
}

export interface Calculation {
  filters?: any[];
  label: string;
  calculation: string;
  field: string;
}

export interface FilterGroup {
  header: string;
}

export interface Group {
  label: string;
  field: string;
  type: string;
  group?: string;
  pivot?: boolean;
}

export interface Layout {
  dimensions: string;
  chart_width: string;
  chart_height: string;
  legend_width: string;
  legend: string;
  stacking: string;
  tilt_labels: boolean;
  data_labels: boolean;
}

export interface ReportOptions {
  exclude_empties: boolean;
  hide_negatives: boolean;
  child_records: boolean;
  export_links: boolean;
}

export interface Settings {
  export_links: boolean;
}

export interface Source {
  criteria: KnFilter;
  limit: string;
  page: number;
  fields: any[];
  relationship_type: string;
  connection_key: string;
  authenticated_user: boolean;
  object: string;
}

export interface Rule {
  field: string;
  operator: Operator;
  value: boolean | string;
}

export interface Summary {
  label: string;
  calc: string;
}
