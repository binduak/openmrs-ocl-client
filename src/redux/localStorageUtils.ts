export function createLocalStorageObject(name: string){
    try {
        let existing = localStorage.getItem(name);
        if (!existing) {
            setLocalStorageObject('notification', 'inProgressList', []);
            setLocalStorageObject('notification', 'loadingList', []);
            setLocalStorageObject('notification', 'erroredList', []);
            setLocalStorageObject('notification', 'successList', []);
            setLocalStorageObject('notification', 'isUpdate', "false");
        }
    }catch (error) {
        console.log(error);
    }
};

function setLocalStorageObject(name: string, key: string, value: any) {
    let existing = localStorage.getItem(name);
    let existingOne = existing ? JSON.parse(existing) : {};
    existingOne[key] = value;
    localStorage.setItem(name, JSON.stringify(existingOne));
};

export function addToLocalStorageObject(name: string, key: string, value: string) {
    try {
        let existing = localStorage.getItem(name);
        let existingOne = existing ? JSON.parse(existing) : {};
        if (existingOne[key]) {
            if (existingOne[key].length >= 3)
                existingOne[key].shift();
            existingOne[key].push(value);
        }
        localStorage.setItem(name, JSON.stringify(existingOne));
    } catch(error){
        console.log(error);
    }
};

export function updateLocalStorageArray({name,key, value, list}: { name: string, key: string, value: any, list: any }) {
    try {
        let retrievedData = localStorage.getItem(name);
        let jsonObject = retrievedData ? JSON.parse(retrievedData) : {};

        if (!jsonObject[key]) {
            return list;
        }

        if (getLocalStorageObject({name: 'notification', key: 'isUpdate', value: 'false'}) === "false") {
            return jsonObject[key];
        }
        jsonObject[key][jsonObject[key].length - 1] = value;
        localStorage.setItem(name, JSON.stringify(jsonObject));
        return jsonObject[key];
    } catch(error){
        console.log(error);
        return list;
    }

};

export function getLocalStorageObject({name,key, value}: { name: string, key: string, value: any }) {
   try {
       let retrievedData = localStorage.getItem(name);
       let jsonObject = retrievedData ? JSON.parse(retrievedData) : {};
       if (!jsonObject[key]) {
           return value;
       }
       return jsonObject[key];
   } catch(error){
       console.log(error);
       return value;
   }
};

export function setUpdate(name: string, key: string, value: any ) {
    try {
        let retrievedData = localStorage.getItem(name);
        let jsonObject = retrievedData ? JSON.parse(retrievedData) : {};
        if (!jsonObject[key]) {
            return "false";
        }
        jsonObject['isUpdate'] = value;
        localStorage.setItem(name, JSON.stringify(jsonObject));
    } catch(error){
        console.log(error);
    }
};


