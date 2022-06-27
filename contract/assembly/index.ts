import {
  Context,
  logging,
  PersistentMap,
  u128,
  ContractPromiseBatch,
} from "near-sdk-as";

// PersistentMap is creates kind of like Data Structure that having key value pair storage type which we store on blockchin
// u128 - represented integer type
// ContractPromiseBatch - help to transfer money

const memos = new PersistentMap<string, string[]>("memos");

// Change function
export function addTasks(
  assigne: string,
  Description: string,
  Task_heading: string
): void {
  logging.log("Adding Task");
  if (memos.contains(Context.sender)) {
    let senderMemos = memos.getSome(Context.sender);
    senderMemos.push(`Assigne-${assigne}, 
     Task Heading- ${Task_heading},
     Description- ${Description}`);
    memos.set(Context.sender, senderMemos);
  } else {
    memos.set(Context.sender, [
      `Assigne-${assigne}, 
     Task Heading-${Task_heading},
      Description-${Description}`,
    ]);
  }
}

//Send Task
export function Task_Allocated(account: string, Taskheading: u128, Description:string): void {
  ContractPromiseBatch.create(account).transfer(Taskheading);
  logging.log("Success! Task Send to" + account);
}

// View Method
export function getTasks(user: string): string[] {
  logging.log("get task for user " + user);
  if (memos.contains(user)) {
    return memos.getSome(user);
  } else {
    logging.log("No Task were found for this user");
    return [];
  }
}
