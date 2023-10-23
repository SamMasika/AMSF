export const COMPUTER_TYPE = {
    Laptop: 'Laptop',
    Desktop: 'Desktop',
  };
  
 export const computerOptions = Object.keys(COMPUTER_TYPE).map(key => ({
    text: COMPUTER_TYPE[key],
    value: key
  }));

  export const PHONE_TYPE = {
    MobilePhone: 'MobilePhone',
    Landline: 'Landline',
  };
  
 export const phoneOptions = Object.keys(PHONE_TYPE).map(key => ({
    text: PHONE_TYPE[key],
    value: key
  }));


  export const CATEGORIES = {
    Electronic: 'Electronic',
    Furniture: 'Furniture',
   
  };
 export const categoryOptions = Object.keys(CATEGORIES).map(key => ({
    text: CATEGORIES[key],
    value: key
  }));
  export const CONDITION = {
    New: 'New',
    Used: 'Used',
    Repaired: 'Repaired',
   
  };
 export const conditionOptions = Object.keys(CONDITION).map(key => ({
    text: CONDITION[key],
    value: key
  }));
  export const STATUS = {
    Good: 'Good',
    Repaired: 'Repaired',
    Broken: 'Broken',
   
  };
 export const statusOptions = Object.keys(STATUS).map(key => ({
    text: STATUS[key],
    value: key
  }));
  export const Disk = {
    Flash: 'Flash',
    External: 'External',
  };
 export const diskOptions = Object.keys(Disk).map(key => ({
    text: Disk[key],
    value: key
  }));
  export const FURNITURE = {
    Table: 'Table',
    Chair: 'Chair',
    Locker: 'Locker',
  };
 export const furnitureOptions = Object.keys(FURNITURE).map(key => ({
    text: FURNITURE[key],
    value: key
  }));
  export const MATERIAL = {
    Wood: 'Wood',
    Iron: 'Iron',
    Plastic: 'Plastic',
    WoodIron: 'WoodIron',
    WoodSponge: 'WoodSponge',
    PlasticIronSponge: 'PlasticIronSponge',
    IronSponge: 'IronSponge',
  };
 export const materialOptions = Object.keys(MATERIAL).map(key => ({
    text: MATERIAL[key],
    value: key
  }));
  export const ELECTRONICS = {
    Computer: 'Computer',
    Phone: 'Phone',
    Disk: 'Disk',
    Television: 'Television',
    Printer: 'Printer',
    Dispenser: 'Dispenser',
  };
  
 export const electronicOptions = Object.keys(ELECTRONICS).map(key => ({
    text: ELECTRONICS[key],
    value: key
  }));