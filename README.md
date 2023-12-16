# Birth Registry Management System

## Overview

This smart contract implements a birth register system using the typescript on azle for internet Computer. The system allows for the addition of new births, update of birth, vaeious search query function, and deletion of birth record.

## Prerequisites

- Node
- Typescript
- DFX
- IC CDK

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/johnoladeji/ICP-Azle.git
    cd ICP-Azle
    ```

## Project Structure

The project is organized into the following directories and files:

- **`src/`**: Contains the source code for the birth register system.
  - **`index.ts`**: App entry point Implementation of the birth register system.

- **`node_modules/`**: Directory for project dependencies.

- **`package.json`**: Configuration file for npm, including project dependencies and scripts.

- **`tsconfig.json`**: TypeScript configuration file, specifying compiler options.

- **`LICENSE`**: MIT License file, detailing the terms under which the project is licensed.

- **`README.md`**: Project documentation providing an overview, installation instructions, usage details, and license information.

## Functions

### `getAllBirthRegister()`

- Retrieves a list of all births.

### `createBirthRegister(payload: BirthRegisterPayload): string`

- Adds a new birth to the system. 

### `getBirthRegisterByName(name: string)`

- Gets first birth with the name.

### `getBirthRegisterById(id: string)`

- Gets a birth registered by ID

### `getAllBirthRegisterByName(name: string)`

- Gets all birth with a name.

### `getBirthRegisterByPlaceOfBirth(location: string)`

- Gets all birth with a place of birth.

### `updateBirthRegister(id: string, payload: BirthRegisterPayload)`

- Updates information for a birth, such as ID and name. 

### `deleteBirthRegister(id: string)`

- Deletes a birth registerd from the system.



## Try it out

`dfx` is the tool you will use to interact with the IC locally and on mainnet. If you don't already have it installed:

```bash
npm run dfx_install
```

Next you will want to start a replica, which is a local instance of the IC that you can deploy your canisters to:

```bash
npm run replica_start
```

If you ever want to stop the replica:

```bash
npm run replica_stop
```

Now you can deploy your canister locally:

```bash
npm install
npm run canister_deploy_local
```

To call the methods on your canister:

```bash
npm run name_of_function
npm run name_of_function
```

Assuming you have [created a cycles wallet](https://internetcomputer.org/docs/current/developer-docs/quickstart/network-quickstart) and funded it with cycles, you can deploy to mainnet like this:

```bash
npm run canister_deploy_mainnet
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.