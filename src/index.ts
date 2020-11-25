declare global {
  interface Window {
    Knack: any;
  }
}

export type connectionPickerFn = (this: JQuery, options: KnConnectionGenOptions) => JQuery;

interface KnJQuery extends JQueryStatic {
  utility_forms: {
    renderMessage(el: JQuery, msg: string, type?: string): undefined;
  };
  fn: JQuery & {
    connectionPicker: connectionPickerFn;
    redactor: any;
  };
}

export interface HashScene {
  slug: string;
  key?: string;
}
export interface KnRoot {
  $: KnJQuery;
  views: KnViews;
  fields: {
    [key: string]: KnField;
  };
  hash_vars: {
    [key: string]: string;
  };
  showSpinner: () => void;
  hideSpinner: () => void;
  checkRule: (rule: any, record: KnRecord) => boolean;
  getHashScenes(): HashScene[];
  getSceneHash: () => string;
  router: KnRouter;
  scenes: KnSceneCollection;
  [key: string]: any;
}
export const Knack: KnRoot = window.Knack || {};
export const { $ } = Knack;
export interface KnSceneAttributes {
  _id: string;
  authenticated: boolean;
  modal: boolean;
  print: boolean;
  parent: string;
  slug: string;
  key: string;
  scene_id?: string;
  object?: string;
  views: KnViewModelView[];
  [key: string]: any;
}

export interface KnSceneCollection extends Backbone.Collection<KnScene> {
  getByKey(sceneKey: string): KnScene;
}
export interface KnScene extends Backbone.Model {
  attributes: KnSceneAttributes;
  id: string;
  idAttribute: string;
  views: Backbone.Collection<KnSceneViewModel>;
  [key: string]: any;
}

export interface KnViewEvents {
  week_start: string;
  title: string;
  time_min: string;
  time_max: string;
  rss: boolean;
  ical: boolean;
  exclude_weekends: boolean;
  event_colors: KnViewEventColorRule[];
  event_color_default: string;
  display_type: string;
  description: string;
  view: string;
  allow_all_day: boolean;
  allow_multiple_per_slot: boolean;
  allow_edit: boolean;
  allow_add: boolean;
  show_details: boolean;
  label_field: { key: string };
  event_field: { key: string };
}

export interface KnViewEventColorRule {
  field: string;
  operator: string;
  color: string;
  value: string;
}

export interface KnSceneViewModel extends Backbone.Model {
  attributes: KnViewModelView;
}

export interface KnViewModel extends Backbone.Model {
  view: KnViewModelView;
  attributes: KnRecord;
  data: Backbone.Collection;
  fetch: (filters?: { filters?: KnFilter | string; [key: string]: any }) => undefined;
  [key: string]: any;
}
// todo: finish documenting
export interface KnViewSource {
  authenticated_user: boolean;
  connection_key: string;
  object: string;
  sort: KnViewSort[];
}
export interface KnConnectionSource {
  type: 'user' | 'record' | string;
  connection_key: string;
  remote_key: string;
  filters?: KnFilterRule[];
}
export interface KnConnectionFormat {
  conn_default: string;
  input: string;
}
export interface KnFormInput {
  key: string;
  type: 'connection' | string;
  label: string;
  field: KnFieldAttributes;
  id: string;
  allow_options_inserts?: boolean;
  source?: KnConnectionSource;
  format?: KnConnectionFormat | any;
  name: string;
  input_type: 'connection' | string;
  value: string;
}
export type KnViewType =
  | 'form'
  | 'table'
  | 'list'
  | 'search'
  | 'map'
  | 'calendar'
  | 'report'
  | 'details'
  | 'checkout'
  | 'menu'
  | 'login';
export type KnFormAction = 'insert' | 'update';

export interface KnViewSort {
  field: string;
  order: 'desc' | 'asc';
}

export interface ViewStructure {
  columns: ViewStructureColumn[];
  layout: string;
  title: string;
  description: string;
}

export interface ViewStructureColumn {
  groups: ViewGroup[];
  width: number;
}

export interface ViewGroup {
  label_format: string;
  columns: Array<ViewGroupColumn[]>;
}

export interface ViewGroupColumn {
  key: string;
  name: string;
  type?: string;
  thumb_key?: string;
  object?: Connection;
  connection?: Connection;
  format: FieldDisplayFormat;
  link_text?: string;
  link_field?: null;
  value?: string;
  label_format?: LabelFormat;
  conn_link?: string;
  img_gallery?: boolean;
  link_type?: string;
  conn_separator?: string;
  scene?: string;
  header?: string;
}

export interface Connection {
  key: string;
}

export interface FieldDisplayFormat {
  label_format?: LabelFormat;
  styles?: string[];
}

export enum LabelFormat {
  Default = 'default',
  None = 'none',
}

export interface ViewPaginationMeta {
  page: number;
  rows_per_page?: number;
  total_entries: number;
}

export interface FormRules {
  submits: SubmitFormRule[];
}

export interface SubmitFormRule {
  key: string;
  action: string;
  message: string;
  reload_show: boolean;
  is_default: boolean;
}

export interface KnViewModelView {
  key: string;
  mode: string;
  name: string;
  source?: KnViewSource;
  action?: KnFormAction;
  groups?: {
    columns: {
      inputs: KnFormInput[];
    }[];
  }[];
  scene: KnSceneAttributes;
  type: KnViewType;
  events?: KnViewEvents;
  links: KnLink[];
  filter: boolean;
  filters: KnFilter | KnFilterRule[];
  filter_type: 'fields' | 'menu';
  details?: ViewStructure;
  columns?: ViewStructureColumn[];
  ical?: boolean;
  rss?: boolean;
  pagination_meta?: ViewPaginationMeta;
  rules?: FormRules;
}

export type KnIconAlign = 'left' | 'right';

export interface KnIcon {
  align: KnIconAlign;
  icon: string;
}

export interface KnLink {
  icon: KnIcon;
  name: string;
  new_window: boolean;
  type: 'url' | string;
  url: string;
}

export interface KnViewAttributes {
  [key: string]: any;
}

export interface GetValuesOptions {
  local: boolean; // prevents showing stuff like recurring event edit modal
}

export interface FormInputField {
  instructions: string;
  field: KnFieldAttributes;
  label: string;
  type: string;
  format: FieldDisplayFormat;
  name: string;
  input_type: string;
  value: string;
  id: string;
}

export interface KnViewValues {
  values: KnRecord;
  old_values: KnRecord;
  proceed: boolean;
}

export interface KnView extends Backbone.Model {
  [key: string]: any;
  attributes: KnViewAttributes;
  record?: KnRecord;
  model: KnViewModel;
  el: HTMLDivElement;
  $el: JQuery;
  getInputs?: () => FormInputField[];
  getValues?(options?: GetValuesOptions): KnViewValues;
  renderRecordNav(): void;
  renderRecords(): void;
}

export interface KnViewCalendar extends KnView {
  date_field: KnFieldAttributes;
  calendar_events: any[];
  input_date: Date;
  start_date: Date;
  end_date: Date;
  event_key: string;
  label_key: string;
  convertDate: (
    date: KnDate
  ) => {
    start: Date;
    end?: Date;
  };
}

export interface KnViews {
  [key: string]: KnView;
}
export interface KnConnection {
  id: string;
  identifier: string;
}
export interface KnRecord {
  id?: string;
  [key: string]: any;
}
export type KnRecordFormat = 'raw' | 'html' | 'both';
export interface KnResponse {
  records: KnRecord[];
  total_pages: number;
  current_page: number;
  total_records: number;
}
export interface KnRecordResponse {
  record: KnRecord;
  submit_key: boolean;
}
export interface KnObject {
  [key: string]: any;
}
export interface KnDateBase {
  date: string;
  date_formatted: string;
  hours: string;
  minutes: string;
  am_pm: string;
  unix_timestamp: number;
  iso_timestamp: Date | string;
  timestamp: string;
  time: number;
  all_day: boolean;
}
export interface KnDate extends KnDateBase {
  to?: KnDateBase;
  repeat?: Repeat;
}
export interface KnDateParsedBase extends KnDateBase {
  jsDate: Date;
}
export interface KnDateParsed extends KnDateParsedBase {
  to?: KnDateParsedBase;
  repeat?: Repeat;
}
export interface Repeat {
  exclusions?: string[];
  undefined?: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: string;
  SU: boolean;
  MO: boolean;
  TU: boolean;
  WE: boolean;
  TH: boolean;
  FR: boolean;
  SA: boolean;
  repeatby: string;
  endson: string;
  end_count: string;
  end_date: string;
  start_date: string;
  end_timestamp: number;
}
export interface KnField {
  attributes: KnFieldAttributes;
  [key: string]: any;
}

export interface KnFieldRelationship {
  object: string;
  has: string;
  belongs_to: string;
}

export interface KnFieldAttributes {
  key: string;
  relationship: KnFieldRelationship;
  name: string;
  _id: string;
  object_key: string;
  validation: any[];
  rules: any[];
  conditional: boolean;
  user: boolean;
  unique: boolean;
  required: boolean;
  type: 'connection' | string;
  [key: string]: any;
}
export interface KnFormDate {
  date: string;
  hours: number;
  minutes: number;
  am_pm: string;
  to?: KnFormDate;
}
export interface KnRecordDate extends KnDate {}
export interface KnApiError {
  field: string;
  type: string;
  message: string;
}
export interface KnApiErrors {
  errors: KnApiError[];
}
export interface KnFilterRule {
  field: string;
  operator: string;
  value: any;
}
export interface KnFilter {
  match: string | 'and' | 'or';
  rules: KnFilterRule[];
  groups?: KnFilterRule[][];
}

export interface KnConnectionFieldFormat {
  input: 'chosen' | string;
}

export interface KnConnectionGenInput {
  format: KnConnectionFieldFormat;
  field: KnFieldAttributes;
  id: string;
  source?: KnConnectionSource;
}

export interface KnConnectionGenOptions {
  view_key: string;
  input: KnConnectionGenInput;
  value: KnConnection[];
  record_id?: string;
}

type DomMethodType = 'overwrite' | 'overwrite';

export interface KnRouterScene {
  $el: JQuery;
  auto_link: boolean;
  dom_method: DomMethodType;
  el: HTMLDivElement;
  hidden_view_count: number;
  ignore_next_scrolltop: boolean;
  messages: any[];
  model: KnScene;
  scene_count: number;
  scene_el: string;
  view_count: number;
  views_ignore: string[];
  views_loaded: number;
  postRenderViews(): void;
}

export interface KnRouter {
  scene_view: KnRouterScene;
  [key: string]: any;
}
