export interface CalendarMarker {
  key: string;
  highlight?: {
    class: string;
    fillMode: string;
  };
  dot?: string;
  dates: Date;
  popover?: {
    label: string;
  };
}
