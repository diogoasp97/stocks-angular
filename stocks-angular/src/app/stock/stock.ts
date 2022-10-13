import { Opiniao } from "../opiniao/opiniao";

export interface Stock {
    stockId: number;
    name: string;
    ticker: string;
    marketCap: string;
    simMarketCap: string;
    website: string;
    logo: string;
    opinioes: Opiniao[];
}