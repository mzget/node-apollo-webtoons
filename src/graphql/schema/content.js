"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = [`
type Content {
  _id: String!
  name: Lang
  epNo: Int
  epName: Lang
  src: String
  seasonId: String
  season: Season
  programId: String
}

input ContentInput {
  epNo: Int!
  epName: InputLang!
  src: String!
  seasonId: String!
  programId: String!
  name: InputLang
}
`];
