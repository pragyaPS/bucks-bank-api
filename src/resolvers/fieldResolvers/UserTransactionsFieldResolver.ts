import { Resolver, FieldResolver, Root } from "type-graphql";
import { TransactionDetails } from "../../entities/TransactionDetails";
import { getTransactionsDetails } from "../../queries/UserTransactionQueries";
import {
  UserTransactions,
  IUserTransactionsFieldResolver,
} from "../../entities/UserTransactions";

@Resolver(() => UserTransactions)
export class UserTransactionsFieldResolver
  implements IUserTransactionsFieldResolver {
  @FieldResolver(() => [TransactionDetails], { nullable: "items" })
  async transactions(@Root() parent: UserTransactions) {
    return await getTransactionsDetails(parent.id, 0, 10);
  }
}
