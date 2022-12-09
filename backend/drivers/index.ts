import { AppDataSource } from "./data-source";

AppDataSource.initialize();

export default AppDataSource;
// .then(async () => {
//   console.log("Inserting a new user into the database...");
//   const user = new activities();
//   await AppDataSource.manager.save(user);
//   const users = await AppDataSource.manager.find(User);
// })
// .catch((error) => console.log(error));
