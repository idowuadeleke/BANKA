import fs from 'fs';

class Helper {
  // save a data to a file
  static saveDataToFile(filePath, dataFile, values) {
    const result = dataFile.unshift(values);

    if (result !== -1) {
      fs.writeFileSync(filePath, JSON.stringify(dataFile), 'utf8');
    }

    return values;
  }

  static updateData(filePath, dataFile) {
    fs.writeFileSync(filePath, JSON.stringify(dataFile));
  }

  // generate unique id
  static generateId(dataArray, index) {
    return dataArray.length > 0 ? dataArray[index].id + 1 : 0;
  }

  // find a user by email
  static findUserByEmail(objArr, userEmail) {
    return objArr.find(element => element.email === userEmail);
  }

  // find a user by ID
  static findUserByID(objArr, userID) {
    return objArr.find(element => element.id === userID);
  }

  // find a user by ID
  static findAccountByOwner(objArr, userID) {
    return objArr.find(element => element.owner === userID);
  }


  // find a user by ID
  static findByAccountNumber(objArr, accountNumber) {
    return objArr.find(element => element.accountNumber === accountNumber);
  }

  // // find a user by IDfoundAccount.id, status,accountData
  // static updateAccountStatus(objArr, accountNumber, status) {
  //   objArr.find(element => element.accountNumber === accountNumber).status = status;
  // }

  static generateAccountNumber(data) {
    const lastAcc = data[0].accountNumber;
    return lastAcc + 100;
  }
}

export default Helper;
