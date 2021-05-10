import { ReportRow } from './reports';

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
  objects: KnObjects;
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
  /** Get or set current query string */
  getQueryString: (newQueryString?: { [key: string]: string }) => string;
  router: KnRouter;
  scenes: KnSceneCollection;
  [key: string]: any;
}
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
  fetch: (options?: Backbone.ModelFetchOptions & { filters?: KnFilter | string; [key: string]: any }) => JQueryXHR;
  [key: string]: any;
}
// todo: finish documenting
export interface KnViewSourceBase {
  authenticated_user: boolean;
  connection_key: string;
  object: string;
  sort: KnViewSort[];
}
export interface KnViewSource extends KnViewSourceBase {
  parent_source: KnViewSourceBase;
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
export enum KnViewType {
  Form = 'form',
  Table = 'table',
  List = 'list',
  Search = 'search',
  Map = 'map',
  Calendar = 'calendar',
  Report = 'report',
  Details = 'details',
  Checkout = 'checkout',
  Menu = 'menu',
  Login = 'login',
}
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
  field?: Partial<KnFieldAttributes>;
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
  icon?: KnIcon;
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
  rows?: ReportRow[];
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
  /** Prevents showing things such as recurring event edit modal */
  local?: boolean;
  ignore_read_only?: boolean;
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

export enum FieldRuleActionType {
  HIDE = 'hide',
  HIDE_SHOW = 'hide-show',
  SHOW = 'show',
  SHOW_HIDE = 'show-hide',
  LABEL = 'label',
}
export interface FieldRuleAction {
  action: FieldRuleActionType;
  field: string;
  value: any;
}

export interface FieldRule {
  actions: FieldRuleAction[];
  criteria: KnFilterRule[];
}

export interface FieldRules {
  [fieldKey: string]: FieldRule[];
}

export interface KnView extends Backbone.Model {
  [key: string]: any;
  attributes: KnViewAttributes;
  record?: KnRecord;
  /** Available for all views, except checkout */
  model?: KnViewModel;
  /** Only for checkout views */
  view?: KnViewModelView;
  rules_by_field: FieldRules;
  /** Available on all views, except checkout */
  el?: HTMLDivElement;
  /** Available on all views, except checkout */
  $el?: JQuery;
  getInputs?: () => FormInputField[];
  getValues?(options?: GetValuesOptions): KnViewValues;
  getFilters?(): KnFilter | KnFilterRule[];
  renderRecordNav(): void;
  renderRecords(): void;

  // form view fns
  /** Trigger form submission */
  handleSubmitForm?(e: Event): void;
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
  object: string;
  key: string;
  name: string;
  field: KnFieldAttributes;
  has: string;
  belongs_to: string;
  relationship_type: string;
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

export interface Inflections {
  singular: string;
  plural: string;
}

export interface KnObjectSort {
  field: string;
  order: string;
}

export interface KnObjectAttributes {
  inflections: Inflections;
  connections: Record<'outbound' | 'inbound', KnFieldRelationship[]>;
  sort: KnObjectSort;
  user: boolean;
  status: string;
  tasks: any[];
  type: string;
  name: string;
  fields: KnFieldAttributes[];
  template: string;
  key: string;
  identifier: string;
  conns: KnConnection[];
}

export interface KnObject extends Backbone.Model {
  attributes: KnObjectAttributes;
}

export interface KnObjects extends Backbone.Collection<KnObject> {
  _byId: { [object_key: string]: KnObject };
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

export enum KnFieldRelationshipType {
  Local = 'local',
}
export interface KnFieldRelationship {
  key: string;
  name: string;
  relationship_type: KnFieldRelationshipType;
  object: string;
  has: string;
  belongs_to: string;
}

export enum KnFieldType {
  ADDRESS = 'address',
  AUTO_INCREMENT = 'auto_increment',
  AVERAGE = 'average',
  BOOLEAN = 'boolean',
  CONCATENATION = 'concatenation',
  CONNECTION = 'connection',
  COUNT = 'count',
  CURRENCY = 'currency',
  DATE_TIME = 'date_time',
  EMAIL = 'email',
  EQUATION = 'equation',
  FILE = 'file',
  IMAGE = 'image',
  LINK = 'link',
  MAX = 'max',
  MIN = 'min',
  MULTIPLE_CHOICE = 'multiple_choice',
  NAME = 'name',
  NUMBER = 'number',
  PARAGRAPH_TEXT = 'paragraph_text',
  PASSWORD = 'password',
  PHONE = 'phone',
  RATING = 'rating',
  RICH_TEXT = 'rich_text',
  SECTION_BREAK = 'section_break',
  SHORT_TEXT = 'short_text',
  SIGNATURE = 'signature',
  SUM = 'sum',
  TIMER = 'timer',
  USER = 'user',
  USER_ROLES = 'user_roles',
  VIDEO = 'video',
}

export interface KnFieldMultipleChoiceFormat {
  blank: string;
  default: string;
  options: string[];
  sorting: 'alphabetical' | 'custom';
  type: 'single' | 'multi' | 'checkboxes' | 'radios';
  /** TODO: support format for all field types */
  [key: string]: any;
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
  type: KnFieldType;
  format?: KnFieldMultipleChoiceFormat;
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
  value?: any;
  field_name?: string;
  header?: string;
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
  value: (Partial<KnConnection> | string)[];
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
