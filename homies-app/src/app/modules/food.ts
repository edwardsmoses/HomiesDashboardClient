export interface IFood {
  Id: string;
  Name: string;
  Description: string;
  PriceInCurrency: string;
  Price: number;
  Currency: string;
  CategoryName: string;
  CategoryId: string;
  PictureUrl: string;
  FullPictureUrl: string;
  Pictures: string[];
  CreatedOn: Date;
}

export interface IFoodFormValues extends Partial<IFood> {
  time?: Date;
}

export class FormFormValues implements IFoodFormValues {
  Id?: string = undefined;
  Name: string = "";
  CategoryName: string = "";
  Description: string = "";
  Price: number = 0;
  PriceInCurrency: string = "";
  PictureUrl: string = "";
  FullPictureUrl: string = "";
  Pictures: string[] = [];
  Currency: string = "";
  CreatedOn?: Date = undefined;
  time?: Date = undefined;
  CategoryId: string = "";

  constructor(init?: IFoodFormValues) {
    if (init && init.CreatedOn) {
      init.time = init.CreatedOn;
    }
    Object.assign(this, init);
  }
}
