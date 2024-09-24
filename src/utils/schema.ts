import { float } from "drizzle-orm/mysql-core";
import {
  numeric,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const iot = pgTable("iot", {
  id: uuid("id").defaultRandom().primaryKey().notNull(), // id as uuid
  applianceType: text("type"),
  applianceDetail: text("detail"),
  applianceBrand: text("brand"),
  applianceModel: text("model"),
  owner: uuid("owner"),
  ownerEmail: text("ownerEmail"),
  createdAt: timestamp("createdAt", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
});

export const appTemp = pgTable("appTemp", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("createdAt", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  surroundingTemp: numeric("surroundingTemp"),
  coilTemp: numeric("coilTemp"),
  surroundingHumidity: numeric("surroundingHumidity"),
  outsideTemp: numeric("outsideTemp"),
  outsideHumidity: numeric("outsideHumidity"),
  outsideCoilTemp: numeric("outsideCoilTemp"),
  iotID: uuid("iotID").references(() => iot.id, {
    onDelete: "cascade",
  }), // iotID as uuid and references iot.id
});
export const efficiencyPoint = pgTable("efficiencyPoint", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  iotID: uuid("iotID").references(() => iot.id, {
    onDelete: "cascade",
  }),
  minVal: real("minVal"),
  q20: real("q20"),
  q40: real("q40"),
  q60: real("q60"),
  q80: real("q80"),
  maxVal: real("maxVal"),
});
