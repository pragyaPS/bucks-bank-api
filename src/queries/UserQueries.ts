import { UserModel, User } from "../entities/User";
import { CategoryTypeModel, CategoryType } from "../entities/CategoryType";
import {
  UserTransactionsModel,
  UserTransactions,
} from "../entities/UserTransactions";

export const deleteUserFromDb = async (id: String) => {
  await UserModel.findOneAndRemove({ _id: id }).exec();
};

export const deleteAllUserFromDb = async () => {
  await UserModel.remove({});
  await CategoryTypeModel.remove({});
  await UserTransactionsModel.remove({});
};

export const getUserFromDb = async (id: "All" | String) => {
  return id === "All"
    ? await UserModel.find({}).exec()
    : await UserModel.findById({ _id: id }).exec();
};

export const changeNameInDb = async (id: String, name: String) => {
  return await UserModel.findOneAndUpdate(
    { _id: id },
    { name: name },
    { upsert: false, new: true }
  ).exec();
};

export const addNewUseIntoDb = async <T>(input: T | any) => {
  const newCategoryType = await CategoryTypeModel.create(
    CategoryType.createNewModel()
  );
  const newUserTransactions = await UserTransactionsModel.create(
    UserTransactions.createNewModel()
  );
  return await (
    await UserModel.create(
      User.createNewModel(input, newCategoryType, newUserTransactions)
    )
  ).save();
};
