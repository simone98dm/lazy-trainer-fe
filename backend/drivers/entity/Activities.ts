import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import sessions from "./sessions";

@Index("activities_pkey", ["id"], { unique: true })
@Entity("activities")
export default class activities extends BaseEntity {
  @Column("character varying", { primary: true, name: "id", length: 36 })
  public id?: string;

  @Column("character varying", { name: "name", length: 255 })
  public name?: string;

  @Column("character varying", { name: "description", length: 255 })
  public description?: string;

  @Column("integer", { name: "order_index" })
  public orderIndex?: number;

  @Column("text", { name: "reps" })
  public reps?: string;

  @Column("boolean", { name: "requestchange" })
  public requestchange?: boolean;

  @Column("integer", { name: "time" })
  public time?: number;

  @Column("character varying", { name: "videourl", length: 255 })
  public videourl?: string;

  @Column("boolean", { name: "warmup" })
  public warmup?: boolean;

  @ManyToOne(() => sessions, (sessions) => sessions.activities, { lazy: true })
  @JoinColumn([{ name: "sessionid", referencedColumnName: "id" }])
  public session?: Promise<sessions>;

  public constructor(init?: Partial<activities>) {
    super();
    Object.assign(this, init);
  }
}
