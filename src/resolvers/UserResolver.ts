import { Resolver, Arg, Query, Mutation } from "type-graphql";
import { User } from "../entities/User";
import { UserInput, changeDisplayNameInputs } from "../inputTypes/UserInput";
import {
  deleteUserFromDb,
  deleteAllUserFromDb,
  getUserFromDb,
  changeNameInDb,
  addNewUseIntoDb,
} from "../queries/UserQueries";

@Resolver()
export class UserResolver {
  @Query((_returns) => User, { nullable: false })
  async returnUser(@Arg("id", { nullable: false }) id: String) {
    return await getUserFromDb(id);
  }

  @Query((_returns) => [User], { nullable: "items" })
  async returnAllUser() {
    return await getUserFromDb("All");
  }

  @Mutation((_returns) => User, { nullable: false })
  async createUser(@Arg("input", { nullable: false }) input: UserInput) {
    return await addNewUseIntoDb(input);
  }

  @Mutation((_returns) => String)
  async deleteUser(@Arg("id", { nullable: false }) id: String) {
    await deleteUserFromDb(id);
    return "Success";
  }

  @Mutation((_returns) => User, { nullable: false })
  async changeUserDisplayName(
    @Arg("input", { nullable: false })
    { id, name }: changeDisplayNameInputs
  ) {
    return await changeNameInDb(id, name);
  }

  @Mutation((_returns) => String, { nullable: false })
  async deleteAllData() {
    await deleteAllUserFromDb();
    return "Success";
  }
}
