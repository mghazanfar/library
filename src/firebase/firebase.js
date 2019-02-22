import * as firebase from "firebase";

export const pathCustomers = `/customers`;
export const pathUsers = `/users`;
export const pathLibraryApp = `/libraryApp`;
export const pathButler = `/butler`;
export const pathConfiguration = `/configuration`;

export const pathGlobalSettings = customerId =>
  `${pathCustomers}/${customerId}/globalSettings`;
export const pathBranches = customerId =>
  `${pathCustomers}/${customerId}/branches`;
export const pathProducts = customerId =>
  `${pathCustomers}/${customerId}/products`;

export const pathCountryAndLanguages = customerId =>
  `${pathGlobalSettings(customerId)}/countryAndLanguage`;
export const pathBranchInformationItem = customerId =>
  `${pathGlobalSettings(customerId)}/branchInformationItem`;
export const pathLibraryAndIdentity = customerId =>
  `${pathGlobalSettings(customerId)}/libraryAndIdentity`;
export const pathLibrarySystem = customerId =>
  `${pathGlobalSettings(customerId)}/librarySystem`;
export const pathSearchEngine = customerId =>
  `${pathGlobalSettings(customerId)}/searchEngine`;
export const pathNewsAndEvents = customerId =>
  `${pathGlobalSettings(customerId)}/newsAndEvents`;
export const pathInformationForRedia = customerId =>
  `${pathGlobalSettings(customerId)}/informationForRedia`;
export const pathCoverService = customerId =>
  `${pathGlobalSettings(customerId)}/coverService`;

export const pathLibraryAppGeneral = customerId =>
  `${pathProducts(
    customerId
  )}${pathLibraryApp}${pathConfiguration}/libraryAppGeneral`;
export const pathLibraryAppModules = customerId =>
  `${pathProducts(customerId)}${pathLibraryApp}${pathConfiguration}/modules`;
export const pathLibraryAppSearch = customerId =>
  `${pathProducts(customerId)}${pathLibraryApp}${pathConfiguration}/search`;
export const pathLibraryAppPayments = customerId =>
  `${pathProducts(customerId)}${pathLibraryApp}${pathConfiguration}/payments`;
export const pathLibraryAppUserCreation = customerId =>
  `${pathProducts(
    customerId
  )}${pathLibraryApp}${pathConfiguration}/userCreation`;

export const pathButlerSearch = customerId =>
  `${pathProducts(customerId)}${pathButler}${pathConfiguration}/search`;
export const pathButlerPayments = customerId =>
  `${pathProducts(customerId)}${pathButler}${pathConfiguration}/payments`;
export const pathButlerLoansAndReturns = customerId =>
  `${pathProducts(
    customerId
  )}${pathButler}${pathConfiguration}/loansAndReturns`;
export const pathButlerUnits = customerId =>
  `${pathProducts(customerId)}${pathButler}/units`;

export const signOut = () => firebase.auth().signOut();

export const readCollection = (path, callback = () => {}) => {
  return firebase
    .firestore()
    .collection(path)
    .onSnapshot(
      snapshot => {
        callback(snapshot);
      },
      error => {
        console.log(error);
      }
    );
};

export const readCollectionWhere = (path, where, callback = () => {}) => {
  return firebase
    .firestore()
    .collection(path)
    .where(where.field, where.operator, where.value)
    .onSnapshot(
      snapshot => {
        callback(snapshot);
      },
      error => {
        console.log(error);
      }
    );
};

export const readDocument = (path, callback = () => {}) => {
  return firebase
    .firestore()
    .doc(path)
    .onSnapshot(
      snapshot => {
        callback(snapshot);
      },
      error => {
        console.log(error);
      }
    );
};

export const setDocument = (path, data, callback = () => {}) => {
  firebase
    .firestore()
    .doc(path)
    .set(data)
    .then(callback())
    .catch(error => console.log(error));
};

export const addDocument = (path, data, callback = () => {}) => {
  firebase
    .firestore()
    .collection(path)
    .add(data)
    .then(ref => callback(ref))
    .catch(error => console.log(error));
};

export const updateDocument = (path, data, callback = () => {}) => {
  firebase
    .firestore()
    .doc(path)
    .update(data)
    .then(callback())
    .catch(error => console.log(error));
};

export const deleteDocument = (path, callback = () => {}) => {
  firebase
    .firestore()
    .doc(path)
    .delete()
    .then(callback())
    .catch(error => console.log(error));
};

export const createCustomerModel = customerId => {
  let batch = firebase.firestore().batch();
  batch.set(
    firebase.firestore().doc(pathCountryAndLanguages(customerId)),
    globalSettingsCountryAndLanguageModel
  );
  batch.set(
    firebase.firestore().doc(pathLibraryAndIdentity(customerId)),
    globalSettingsLibraryAndIdentityModel
  );
  batch.set(
    firebase.firestore().doc(pathInformationForRedia(customerId)),
    globalSettingsInformationForRediaModel
  );
  batch.set(
    firebase.firestore().doc(pathNewsAndEvents(customerId)),
    globalSettingsNewsAndEventsModel
  );
  batch.set(
    firebase.firestore().doc(pathLibrarySystem(customerId)),
    globalSettingsLibrarySystemModel
  );
  batch.set(
    firebase.firestore().doc(pathSearchEngine(customerId)),
    globalSettingsSearchEngineModel
  );
  batch.set(
    firebase.firestore().doc(pathCoverService(customerId)),
    globalSettingsCoverService
  );
  batch.commit().then(console.log("createCustomerModel"));
};

export const deleteCustomerModel = customerId => {
  let batch = firebase.firestore().batch();
  batch.delete(firebase.firestore().doc(pathCountryAndLanguages(customerId)));
  batch.delete(firebase.firestore().doc(pathLibraryAndIdentity(customerId)));
  batch.delete(firebase.firestore().doc(pathInformationForRedia(customerId)));
  batch.delete(firebase.firestore().doc(pathNewsAndEvents(customerId)));
  batch.delete(firebase.firestore().doc(pathLibrarySystem(customerId)));
  batch.delete(firebase.firestore().doc(pathSearchEngine(customerId)));
  batch.delete(firebase.firestore().doc(pathCoverService(customerId)));
  batch.commit().then(console.log("deleteCustomerModel"));
};

const globalSettingsCountryAndLanguageModel = {
  alternativeLanguage: "",
  country: "",
  defaultLanguage: ""
};

const globalSettingsLibraryAndIdentityModel = {
  identityColor: "",
  keyboardType: "",
  name: "",
  numberOfCharactersInPasswords: ""
};

const globalSettingsInformationForRediaModel = {
  name: "",
  phone: "",
  email: "",
  libraryCardNumber: "",
  libraryCardPin: ""
};

const globalSettingsNewsAndEventsModel = {
  newsUrl: "",
  eventsUrl: ""
};

const globalSettingsLibrarySystemModel = {
  searchEngine: "",
  username: "",
  url: "",
  password: "",
  libraryNumber: ""
};

const globalSettingsSearchEngineModel = {
  engine: "",
  version: "",
  agencyNumber: "",
  numberOfTypes: ""
};

const globalSettingsCoverService = {
  service: ""
};
