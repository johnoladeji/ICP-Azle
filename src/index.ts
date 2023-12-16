import {
  $update,
  $query,
  Record,
  StableBTreeMap,
  Vec,
  match,
  Result,
  nat64,
  ic,
  Opt,
  Principal,
} from "azle";
import { v4 as uuidv4 } from "uuid";

// Define the BirthRegister type for storing BirthRegister information
type BirthRegister = Record<{
  id: string;
  placeOfBirth: string;
  name: string;
  sex: string;
  surname: string;
  parentsAddress: string;
  mothersName: string;
  dateOfBirth: string;
  fathersName: string;
  parentsJob: string;
  owner: Principal;
  createdAt: nat64;
  updatedAt: Opt<nat64>;
}>;

// Define the BirthRegisterPayload type for creating a new BirthRegister entry
type BirthRegisterPayload = Record<{
  placeOfBirth: string;
  name: string;
  sex: string;
  surname: string;
  parentsAddress: string;
  mothersName: string;
  dateOfBirth: string;
  fathersName: string;
  parentsJob: string;
}>;

// Create StableBTreeMap to store BirthRegister entries
const BirthRegisterStorage = new StableBTreeMap<string, BirthRegister>(0, 44, 1024);

$update;
export function createBirthRegister(payload: BirthRegisterPayload): Result<BirthRegister, string> {
  // Payload Validation
  if (
    !payload.placeOfBirth ||
    !payload.name ||
    !payload.sex ||
    !payload.surname ||
    !payload.parentsAddress ||
    !payload.mothersName ||
    !payload.dateOfBirth ||
    !payload.fathersName ||
    !payload.parentsJob
  ) {
    return Result.Err<BirthRegister, string>("All required fields must be present in the payload.");
  }

  try {
    // Explicit Property Setting
    const BirthRegister: BirthRegister = {
      id: uuidv4(),
      createdAt: ic.time(),
      placeOfBirth: payload.placeOfBirth,
      name: payload.name,
      sex: payload.sex,
      surname: payload.surname,
      parentsAddress: payload.parentsAddress,
      mothersName: payload.mothersName,
      dateOfBirth: payload.dateOfBirth,
      fathersName: payload.fathersName,
      parentsJob: payload.parentsJob,
      owner: ic.caller(),
      updatedAt: Opt.None,
    };

    // Insert the new BirthRegister entry into the storage
    BirthRegisterStorage.insert(BirthRegister.id, BirthRegister);
    return Result.Ok<BirthRegister, string>(BirthRegister);
  } catch (error) {
    // Return an error if the insertion fails
    return Result.Err<BirthRegister, string>(`Failed to create BirthRegister entry. ${error}`);
  }
}

$query;
export function getBirthRegisterById(id: string): Result<BirthRegister, string> {
  // Parameter Validation
  if (!id || typeof id !== "string") {
    return Result.Err<BirthRegister, string>("Invalid ID parameter.");
  }

  // Error Handling
  try {
    // Retrieve the BirthRegister entry from storage
    return match(BirthRegisterStorage.get(id), {
      Some: (BirthRegister) => Result.Ok<BirthRegister, string>(BirthRegister),
      None: () => Result.Err<BirthRegister, string>(`BirthRegister with ID=${id} not found.`),
    });
  } catch (error) {
    // Return an error if the retrieval fails
    return Result.Err<BirthRegister, string>(`Failed to get BirthRegister entry. ${error}`);
  }
}

$query;
export function getBirthRegisterByName(name: string): Result<BirthRegister, string> {
  // Parameter Validation
  if (!name || typeof name !== "string") {
    return Result.Err<BirthRegister, string>("Invalid name parameter.");
  }

  // Find BirthRegister entries by name
  const BirthRegisterList = BirthRegisterStorage.values();
  const foundBirthRegister = BirthRegisterList.find((BirthRegister) => BirthRegister.name.toLowerCase() === name.toLowerCase());

  if (foundBirthRegister) {
    return Result.Ok<BirthRegister, string>(foundBirthRegister);
  }

  return Result.Err<BirthRegister, string>(`BirthRegister with name="${name}" not found.`);
}

$query;
export function getAllBirthRegister(): Result<Vec<BirthRegister>, string> {
  // Error Handling
  try {
    // Return all BirthRegister entries
    return Result.Ok(BirthRegisterStorage.values());
  } catch (error) {
    // Return an error if the operation fails
    return Result.Err<Vec<BirthRegister>, string>(`Failed to get all BirthRegister entries. ${error}`);
  }
}


$query;
export function getAllBirthRegisterByName(name: string): Result<Vec<BirthRegister>, string> {
  // Error Handling
  try {
    // Return all BirthRegister entries
    
    let filterByName = BirthRegisterStorage.values().filter((item) => item.name.toLocaleLowerCase() == name.toLocaleLowerCase())
    if (filterByName.length == 0) {
      return Result.Err("Name does not exist");
    }
    return Result.Ok(filterByName);
  } catch (error) {
    // Return an error if the operation fails
    return Result.Err<Vec<BirthRegister>, string>(`Failed to get all BirthRegister entries. ${error}`);
  }
}

$query;
export function getBirthRegisterByPlaceOfBirth(location: string): Result<Vec<BirthRegister>, string> {
  // Error Handling
  try {
    // Return all BirthRegister entries
    
    let filterByPlace = BirthRegisterStorage.values().filter((item) => item.placeOfBirth.toLocaleLowerCase() == location.toLocaleLowerCase())
    if (filterByPlace.length == 0) {
      return Result.Err("place does not exist");
    }
    return Result.Ok(filterByPlace);
  } catch (error) {
    // Return an error if the operation fails
    return Result.Err<Vec<BirthRegister>, string>(`Failed to get all BirthRegister entries. ${error}`);
  }
}

$update;
export function updateBirthRegister(id: string, payload: BirthRegisterPayload): Result<BirthRegister, string> {
  // Parameter Validation
  if (!id || typeof id !== "string") {
    return Result.Err<BirthRegister, string>("Invalid ID parameter.");
  }

  // Payload Validation
  if (
    !payload.placeOfBirth ||
    !payload.name ||
    !payload.sex ||
    !payload.surname ||
    !payload.parentsAddress ||
    !payload.mothersName ||
    !payload.dateOfBirth ||
    !payload.fathersName ||
    !payload.parentsJob
  ) {
    return Result.Err<BirthRegister, string>("All required fields must be present in the payload.");
  }

  try {
    // Retrieve the existing BirthRegister entry
    return match(BirthRegisterStorage.get(id), {
      Some: (existingBirthRegister) => {
        // Selective Update
        const updatedBirthRegister: BirthRegister = {
          ...existingBirthRegister,
          ...payload,
          updatedAt: Opt.Some(ic.time()),
        };

        // Insert the updated BirthRegister entry into storage
        BirthRegisterStorage.insert(updatedBirthRegister.id, updatedBirthRegister);
        return Result.Ok<BirthRegister, string>(updatedBirthRegister);
      },
      None: () => Result.Err<BirthRegister, string>(`BirthRegister with ID=${id} not found.`),
    });
  } catch (error) {
    // Return an error if the update fails
    return Result.Err<BirthRegister, string>(`Failed to update BirthRegister entry. ${error}`);
  }
}

$update;
export function deleteBirthRegister(id: string): Result<BirthRegister, string> {
  // Parameter Validation
  if (!id || typeof id !== "string") {
    return Result.Err<BirthRegister, string>("Invalid ID parameter.");
  }

  try {
    // Retrieve and remove the BirthRegister entry
    return match(BirthRegisterStorage.get(id), {
      Some: (existingBirthRegister) => {
        BirthRegisterStorage.remove(id);
        return Result.Ok<BirthRegister, string>(existingBirthRegister);
      },
      None: () => Result.Err<BirthRegister, string>(`BirthRegister with ID=${id} not found.`),
    });
  } catch (error) {
    // Return an error if the deletion fails
    return Result.Err<BirthRegister, string>(`Failed to delete BirthRegister entry. ${error}`);
  }
}

// Cryptographic utility for generating random values
globalThis.crypto = {
  //@ts-ignore
  getRandomValues: () => {
    let array = new Uint8Array(32);

    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }

    return array;
  },
};
