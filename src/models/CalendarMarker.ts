export interface CalendarMarker {
  key: string;
  highlight?: {
    class: string;
    fillMode: string;
  };
  dot?: boolean;
  dates: Date;
  popover?: {
    label: string;
  };
}
