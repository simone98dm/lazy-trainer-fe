export enum ButtonSize {
  LARGE,
  MEDIUM,
  SMALL,
}

export enum LinkType {
  BUTTON,
}

export enum Theme {
  LIGHT,
  DARK,
}

export enum IconSize {
  LARGE = "icn__large",
  MEDIUM = "icn__medium",
  SMALL = "icn__small",
}

export enum ButtonColor {
  PRIMARY,
  LIGHT,
  DARK,
  DANGER,
  WARNING,
  SUCCESS,
  TRASPARENT,
}

export enum Role {
  NORMAL,
  TRAINER,
  SELFMADE,
}

export const RoleName: { [role in Role]: string } = {
  [Role.NORMAL]: "Normal",
  [Role.TRAINER]: "Trainer",
  [Role.SELFMADE]: "Self Made",
};
