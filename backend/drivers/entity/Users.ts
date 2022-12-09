import { BaseEntity, Column, Entity, Index, OneToMany } from "typeorm";
import plans from "./plans";

@Index("users_pkey", ["id"], { unique: true })
@Entity("users")
export default class users extends BaseEntity {
  @Column("character varying", { primary: true, name: "id", length: 36 })
  public id?: string;

  @Column("character varying", { name: "name", length: 255 })
  public name?: string;

  @Column("character varying", { name: "hashpassword", length: 255 })
  public hashpassword?: string;

  @Column("character varying", { name: "role", length: 255 })
  public role?: string;

  @Column("json", { name: "configurations", nullable: true })
  public configurations?: object | null;

  @OneToMany(() => plans, (plans) => plans.owner, { lazy: true })
  public plans?: Promise<plans[]>;

  public constructor(init?: Partial<users>) {
    super();
    Object.assign(this, init);
  }
}
