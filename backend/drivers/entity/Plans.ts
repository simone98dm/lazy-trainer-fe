import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import users from "./users";
import sessions from "./sessions";

@Index("plans_pkey", ["id"], { unique: true })
@Entity("plans")
export default class plans extends BaseEntity {
  @Column("character varying", { primary: true, name: "id", length: 36 })
  public id?: string;

  @Column("character varying", { name: "name", length: 255 })
  public name?: string;

  @ManyToOne(() => users, (users) => users.plans, { lazy: true })
  @JoinColumn([{ name: "ownerid", referencedColumnName: "id" }])
  public owner?: Promise<users>;

  @ManyToOne(() => users, (users) => users.plans, { lazy: true })
  @JoinColumn([{ name: "trainerid", referencedColumnName: "id" }])
  public trainer?: Promise<users>;

  @OneToMany(() => sessions, (sessions) => sessions.plan, { lazy: true })
  public sessions?: Promise<sessions[]>;

  public constructor(init?: Partial<plans>) {
    super();
    Object.assign(this, init);
  }
}
