import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import activities from "./activities";
import plans from "./plans";

@Index("sessions_pkey", ["id"], { unique: true })
@Entity("sessions")
export default class sessions extends BaseEntity {
  @Column("character varying", { primary: true, name: "id", length: 36 })
  public id?: string;

  @Column("integer", { name: "dayofweek" })
  public dayofweek?: number;

  @OneToMany(() => activities, (activities) => activities.session, {
    lazy: true,
  })
  public activities?: Promise<activities[]>;

  @ManyToOne(() => plans, (plans) => plans.sessions, { lazy: true })
  @JoinColumn([{ name: "planid", referencedColumnName: "id" }])
  public plan?: Promise<plans>;

  public constructor(init?: Partial<sessions>) {
    super();
    Object.assign(this, init);
  }
}
